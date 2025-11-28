import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/api";
import { Task } from "@/lib/types";

interface TasksContextValue {
  tasks: Task[];
  isLoading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (data: Omit<Task, "id">) => Promise<Task>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
  removeTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTasks();
      setTasks(response);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = useCallback(async (data: Omit<Task, "id">) => {
    const created = await createTask(data);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateTaskInState = useCallback(async (id: string, data: Partial<Task>) => {
    const updated = await updateTask(id, data);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    return updated;
  }, []);

  const removeTask = useCallback(async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const value = useMemo(
    () => ({ tasks, isLoading, loadTasks, addTask, updateTask: updateTaskInState, removeTask }),
    [tasks, isLoading, loadTasks, addTask, updateTaskInState, removeTask],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de un TasksProvider");
  }

  return context;
}

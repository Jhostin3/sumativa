import { Task } from "./types";

// Cuando migremos a json-server, podemos configurar la base URL aquí.
// const BASE_URL = "http://localhost:3000";
// Ejemplo:
// const response = await fetch(`${BASE_URL}/tasks`);
// const tasksFromServer: Task[] = await response.json();

let tasks: Task[] = [
  {
    id: "1",
    title: "Revisar correos",
    description: "Responder los mensajes urgentes antes del mediodía",
  },
  {
    id: "2",
    title: "Planificar sprint",
    description: "Definir alcance y tareas para la próxima iteración",
  },
];

const simulateDelay = <T>(result: T, delay = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(result), delay));

export async function getTasks(): Promise<Task[]> {
  return simulateDelay([...tasks]);
}

export async function createTask(data: Omit<Task, "id">): Promise<Task> {
  const newTask: Task = {
    id: Date.now().toString(),
    ...data,
  };
  tasks = [newTask, ...tasks];
  return simulateDelay(newTask);
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error(`La tarea con id ${id} no existe.`);
  }

  const updatedTask: Task = { ...tasks[index], ...data, id: tasks[index].id };
  tasks[index] = updatedTask;

  return simulateDelay(updatedTask);
}

export async function deleteTask(id: string): Promise<void> {
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    throw new Error(`La tarea con id ${id} no existe.`);
  }

  tasks = tasks.filter((task) => task.id !== id);
  await simulateDelay(undefined);
}

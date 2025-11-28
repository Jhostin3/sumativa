import { Task } from "./types";

/**
 * API mock para desarrollo sin JSON-Server.
 * Para alternar, reemplaza los imports de "@/lib/api" por "@/lib/api.mock" temporalmente.
 */
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

const simulateDelay = <T>(result: T, delay = 250) =>
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

  const updated: Task = { ...tasks[index], ...data };
  tasks[index] = updated;
  return simulateDelay(updated);
}

export async function deleteTask(id: string): Promise<void> {
  tasks = tasks.filter((task) => task.id !== id);
  await simulateDelay(undefined);
}

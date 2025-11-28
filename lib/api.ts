import { Task } from "./types";

const BASE_URL = "http://localhost:3000";
// Si despliegas tu JSON-Server (por ejemplo, en Render o Vercel), actualiza BASE_URL con la nueva URL.
const TASKS_ENDPOINT = `${BASE_URL}/tasks`;
const CONNECTION_ERROR_MESSAGE =
  "No se pudo conectar al servidor. ¿Está corriendo JSON-Server?";

async function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch (error) {
    console.error(error);
    throw new Error(CONNECTION_ERROR_MESSAGE);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ocurrió un error al comunicarse con el servidor.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getTasks(): Promise<Task[]> {
  const response = await safeFetch(TASKS_ENDPOINT);
  return handleResponse<Task[]>(response);
}

export async function createTask(data: Omit<Task, "id">): Promise<Task> {
  const response = await safeFetch(TASKS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Task>(response);
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const response = await safeFetch(`${TASKS_ENDPOINT}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await safeFetch(`${TASKS_ENDPOINT}/${id}`, { method: "DELETE" });
  await handleResponse<void>(response);
}

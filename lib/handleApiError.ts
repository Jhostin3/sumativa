const DEFAULT_ERROR_MESSAGE =
  "Tuvimos un problema al comunicarnos con el servidor. Intenta de nuevo en unos segundos.";

export function handleApiError(error: Error): string {
  if (!error) {
    return DEFAULT_ERROR_MESSAGE;
  }

  const trimmedMessage = error.message?.trim();

  if (!trimmedMessage || trimmedMessage.length === 0) {
    return DEFAULT_ERROR_MESSAGE;
  }

  if (trimmedMessage.includes("Network request failed")) {
    return "No pudimos conectarnos con el servidor. Verifica tu conexión e inténtalo nuevamente.";
  }

  return trimmedMessage;
}

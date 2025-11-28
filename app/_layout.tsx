import { Slot } from "expo-router";
import { TasksProvider } from "@/contexts/TasksContext";
import "../global.css";

export default function RootLayout() {
  return (
    <TasksProvider>
      <Slot />
    </TasksProvider>
  );
}

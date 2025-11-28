import { router } from "expo-router";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/contexts/TasksContext";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";

export default function NewTaskScreen() {
  const { addTask } = useTasks();

  const handleSubmit = async ({ title, description }: { title: string; description: string }) => {
    await addTask({ title, description });
    router.replace("/");
  };

  return (
    <ScreenContainer
      title="Crear nueva tarea"
      subtitle="Completa la información para agendar un nuevo pendiente."
    >
      <Card>
        <TaskForm
          initialTitle=""
          initialDescription=""
          submitLabel="Guardar"
          onSubmit={handleSubmit}
        />
      </Card>
    </ScreenContainer>
  );
}

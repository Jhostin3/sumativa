import { useMemo } from "react";
import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/contexts/TasksContext";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks, updateTask, removeTask } = useTasks();

  const task = useMemo(() => tasks.find((item) => item.id === id), [tasks, id]);

  const handleSubmit = async ({ title, description }: { title: string; description: string }) => {
    if (!id) {
      return;
    }

    await updateTask(id, { title, description });
    router.replace("/");
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    await removeTask(id);
    router.replace("/");
  };

  if (!id || !task) {
    return (
      <ScreenContainer title="Editar tarea">
        <Card className="items-center gap-4">
          <Text className="text-base text-gray-600 text-center">
            No pudimos encontrar la tarea solicitada.
          </Text>
          <PrimaryButton label="Volver al inicio" onPress={() => router.replace("/")} />
        </Card>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title="Editar tarea" subtitle="Actualiza o elimina la información de esta tarea.">
      <Card className="mb-6">
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          submitLabel="Guardar cambios"
          onSubmit={handleSubmit}
        />
      </Card>

      <PrimaryButton label="Eliminar tarea" variant="danger" onPress={handleDelete} />
    </ScreenContainer>
  );
}

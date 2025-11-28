import "@/global.css";
import { useEffect, useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useTasks } from "@/contexts/TasksContext";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Card } from "@/components/ui/Card";

const MAX_DESCRIPTION_LENGTH = 80;

export default function Index() {
  const { tasks, isLoading, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const contentContainerStyle = useMemo(
    () => (tasks.length === 0 ? { flexGrow: 1, justifyContent: "center" } : undefined),
    [tasks.length],
  );

  const renderTask = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <TouchableOpacity className="mb-4" onPress={() => router.push(`/tasks/${item.id}`)} activeOpacity={0.9}>
      <Card className="gap-2">
        <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
        <Text className="text-sm text-gray-600">
          {item.description.length > MAX_DESCRIPTION_LENGTH
            ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH).trim()}...`
            : item.description}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer
      title="Mis tareas"
      subtitle="Administra y organiza tus pendientes diarios desde un solo lugar."
      action={<PrimaryButton label="Nueva tarea" onPress={() => router.push("/tasks/new")} />}
    >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        refreshing={isLoading}
        onRefresh={loadTasks}
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={
          <Card className="items-center py-10">
            <Text className="text-gray-500 text-base">
              {isLoading ? "Cargando tareas..." : "No hay tareas para mostrar."}
            </Text>
          </Card>
        }
      />
    </ScreenContainer>
  );
}

import "@/global.css";
import { useEffect, useMemo } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { useTasks } from "@/contexts/TasksContext";

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
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 active:bg-gray-50"
      onPress={() => router.push(`/tasks/${item.id}`)}
      activeOpacity={0.9}
    >
      <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
      <Text className="text-sm text-gray-600 mt-2">
        {item.description.length > MAX_DESCRIPTION_LENGTH
          ? `${item.description.slice(0, MAX_DESCRIPTION_LENGTH).trim()}...`
          : item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">Mis tareas</Text>
          <Link href="/tasks/new" asChild>
            <TouchableOpacity className="bg-blue-500 rounded-full px-4 py-2" activeOpacity={0.85}>
              <Text className="text-white font-semibold text-base">Nueva tarea</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          refreshing={isLoading}
          onRefresh={loadTasks}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={
            <View className="items-center">
              <Text className="text-gray-500 text-base">
                {isLoading ? "Cargando tareas..." : "No hay tareas para mostrar."}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

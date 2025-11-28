import { SafeAreaView, Text, View } from "react-native";
import { router } from "expo-router";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/contexts/TasksContext";

export default function NewTaskScreen() {
  const { addTask } = useTasks();

  const handleSubmit = async ({ title, description }: { title: string; description: string }) => {
    await addTask({ title, description });
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Crear nueva tarea</Text>
        <TaskForm
          initialTitle=""
          initialDescription=""
          submitLabel="Guardar"
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

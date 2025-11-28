import "@/global.css";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";


// Definimos los tipos para los errores del formulario
interface FormErrors {
  title?: string;
  description?: string;
}

export default function Index() {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Estado para almacenar los mensajes de error
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;

    // Validación del título
    if (!title.trim()) {
      newErrors.title = "El título no puede estar vacío.";
    } else if (!alphanumericRegex.test(title)) {
      newErrors.title = "El título solo puede contener letras, números y espacios.";
    }

    // Validación de la descripción
    if (!description.trim()) {
      newErrors.description = "La descripción no puede estar vacía.";
    } else if (!alphanumericRegex.test(description)) {
      newErrors.description = "La descripción solo puede contener letras, números y espacios.";
    }

    setErrors(newErrors);

    // Devuelve true si no hay errores, false en caso contrario
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTask = () => {
    if (validateForm()) {
      console.log("¡Validación exitosa! Datos de la tarea:", { title, description });
      // Limpiar los campos después de guardar
      setTitle("");
      setDescription("");
    } else {
      console.log("La validación falló. Por favor, corrige los errores.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-4">
        <View className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crear Nueva Tarea
          </Text>

          {/* Campo de Título */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Título</Text>
          <TextInput
            className={`border rounded-lg p-3 mb-1 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej: Estudiar para el examen"
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && <Text className="text-red-500 text-sm mb-4">{errors.title}</Text>}

          {/* Campo de Descripción */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Descripción</Text>
          <TextInput
            className={`border rounded-lg p-3 mb-1 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Detalles de la tarea..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
          {errors.description && <Text className="text-red-500 text-sm mb-4">{errors.description}</Text>}

          {/* Botón de Guardar */}
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-4 mt-4"
            onPress={handleSaveTask}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-bold text-lg">Guardar Tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

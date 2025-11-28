import { useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type TaskPayload = {
  title: string;
  description: string;
};

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  submitLabel: string;
  onSubmit: (payload: TaskPayload) => void;
}

type FieldName = "title" | "description";
type FieldErrors = Record<FieldName, string | undefined>;

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9 ]+$/;

export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  submitLabel,
  onSubmit,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    title: false,
    description: false,
  });

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setTouched({ title: false, description: false });
  }, [initialTitle, initialDescription]);

  const errors = useMemo<FieldErrors>(() => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const nextErrors: FieldErrors = { title: undefined, description: undefined };

    if (!trimmedTitle) {
      nextErrors.title = "El título no puede estar vacío.";
    } else if (!ALPHANUMERIC_REGEX.test(title)) {
      nextErrors.title = "El título solo puede contener letras, números y espacios.";
    }

    if (!trimmedDescription) {
      nextErrors.description = "La descripción no puede estar vacía.";
    } else if (!ALPHANUMERIC_REGEX.test(description)) {
      nextErrors.description = "La descripción solo puede contener letras, números y espacios.";
    }

    return nextErrors;
  }, [title, description]);

  const isFormValid = !errors.title && !errors.description;
  const showTitleError = touched.title && !!errors.title;
  const showDescriptionError = touched.description && !!errors.description;

  const markFieldTouched = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    setTouched({ title: true, description: true });

    if (!isFormValid) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <View className="w-full">
      <Text className="text-base font-semibold text-gray-600 mb-2">Título</Text>
      <TextInput
        className={`border rounded-lg p-3 mb-1 ${
          showTitleError ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Ej: Estudiar para el examen"
        value={title}
        onBlur={() => markFieldTouched("title")}
        onChangeText={setTitle}
      />
      {showTitleError && <Text className="text-red-500 text-sm mb-4">{errors.title}</Text>}

      <Text className="text-base font-semibold text-gray-600 mb-2">Descripción</Text>
      <TextInput
        className={`border rounded-lg p-3 mb-1 ${
          showDescriptionError ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Detalles de la tarea..."
        value={description}
        onBlur={() => markFieldTouched("description")}
        onChangeText={setDescription}
        multiline
      />
      {showDescriptionError && (
        <Text className="text-red-500 text-sm mb-4">{errors.description}</Text>
      )}

      <TouchableOpacity
        className={`rounded-lg p-4 mt-4 ${isFormValid ? "bg-blue-500" : "bg-blue-300"}`}
        onPress={handleSubmit}
        activeOpacity={0.8}
        disabled={!isFormValid}
      >
        <Text className="text-white text-center font-bold text-lg">{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Variant = "primary" | "danger";

interface PrimaryButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-blue-600",
  danger: "bg-red-600",
};

export function PrimaryButton({
  label,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...touchableProps
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isDisabled}
      className={`rounded-2xl px-5 py-3 flex-row items-center justify-center ${
        VARIANT_STYLES[variant]
      } ${isDisabled ? "opacity-60" : "shadow-sm shadow-black/20"} ${className}`}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-base font-semibold">{label}</Text>
      )}
    </TouchableOpacity>
  );
}

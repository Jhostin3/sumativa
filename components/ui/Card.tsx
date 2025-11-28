import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps, PropsWithChildren {
  className?: string;
}

export function Card({ children, className = "", ...viewProps }: CardProps) {
  return (
    <View
      className={`bg-white rounded-3xl p-5 border border-gray-100 shadow-sm shadow-black/5 ${className}`}
      {...viewProps}
    >
      {children}
    </View>
  );
}

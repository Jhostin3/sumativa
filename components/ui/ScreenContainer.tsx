import { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, Text, View } from "react-native";

interface ScreenContainerProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function ScreenContainer({ title, subtitle, action, children }: ScreenContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-4 py-6">
        <View className="w-full max-w-2xl mx-auto flex-1">
          {(title || subtitle || action) && (
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-1 pr-4">
                {title && <Text className="text-3xl font-bold text-gray-900">{title}</Text>}
                {subtitle && <Text className="text-base text-gray-500 mt-1">{subtitle}</Text>}
              </View>
              {action}
            </View>
          )}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}

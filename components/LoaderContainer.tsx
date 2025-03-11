import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  StyleSheetProperties,
  ViewStyle,
} from "react-native";

interface LoaderContainerProps extends PropsWithChildren {
  loading: boolean;
  style?: ViewStyle;
}

export const LoaderContainer = ({
  loading,
  children,
  style,
}: LoaderContainerProps) => {
  if (!loading) {
    return children;
  }
  return (
    <View style={[styles.container, style]}>
      {children}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Ensures overlay works correctly
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire parent container
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
});

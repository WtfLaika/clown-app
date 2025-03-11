import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { debounce } from "lodash";
import { Overlay } from "@/components/Overlay";
import { Link } from "expo-router";
import { SafeAreaView } from "@/components/Themed";

export default function ScanerScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const onReadQRCodeDebounce = debounce(async (codes: Code[]) => {
    if (!codes[0]?.value) {
      return;
    }

    const [ticket_id, verification_code] = codes[0].value
      .replaceAll("Ticket-", "")
      .split("-");
    if (!ticket_id || !verification_code) {
      throw new Error("there is no ticketsId");
    }

    // TODO add api
  }, 0);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: onReadQRCodeDebounce,
  });

  useEffect(() => {
    if (hasPermission) {
      return;
    }
    requestPermission();
  }, [hasPermission]);

  if (!hasPermission || !device) {
    return (
      // MOVE TO STYLES
      <SafeAreaView style={styles.errorContainer}>
        <Link href={"/"}>Go Home</Link>
        <View style={styles.errorContainer}>
          <Text style={[styles.title, styles.errorMessage]}>
            Camera is not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Link href={"/"}>Go Home</Link>
      <Camera
        isActive={true}
        device={device}
        codeScanner={codeScanner}
        style={styles.cameraStyle}
      />
      <Overlay />
    </>
  );
}

export const styles = StyleSheet.create({
  cameraStyle: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  errorContainer: { flex: 1, marginTop: 20, paddingHorizontal: 10 },
  container: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },

  title: {
    color: "white",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center",
  },
  errorMessage: {
    color: "black",
  },
});

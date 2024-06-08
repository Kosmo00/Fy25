import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal } from "react-native";
import { CameraView, Camera } from "expo-camera";

import { useSessionContext } from "@/context/SessionContext";
import { AuthModal } from "@/components/modals/AuthModal";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [musculation, setMusculation] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<boolean>(false);
  const { logState } = useSessionContext()
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
    if (logState.email.length === 0) {
      setAuthModal(true)
    }
    console.log(logState)
  }, [camera, musculation]);

  const handleBarCodeScanned = ({ type, data }: { type: any, data: any }) => {
    setScanned(true);
    alert(`${data} ${musculation}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleLeft = () => {
    setCamera(prev => !prev);
    setMusculation(true);
    setScanned(false);

  }
  const handleRight = () => {
    setCamera(prev => !prev);
    setMusculation(false);
    setScanned(false);
  }

  return (
    <View style={styles.container}>
      <AuthModal authModal={authModal} setAuthModal={setAuthModal}/>
      {camera &&
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={{ width: '100%', height: '60%' }}
        />
      }
      {scanned && camera && (
        <TouchableOpacity onPress={() => setScanned(false)} style={{ backgroundColor: '#b4c5e4', padding: 15, alignSelf: "center", marginTop: -60, borderRadius: 10 }}>
          <Text >
            ¿Escanear otro para {musculation ? "musculacion" : "Spinning"}?
          </Text>
        </TouchableOpacity>
      )}
      <View style={{ width: '100%', height: '100%', backgroundColor: '#011936', flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ width: '100%', height: '100%' }}>
          <Text style={{ color: "white", alignSelf: 'center', marginVertical: "auto", fontSize: 50 }}>
            {!camera ? "QR Scanner" : musculation ? "Musculación" : "Spinning"}
          </Text>
          {camera && <TouchableOpacity onPress={() => setCamera(false)}>
            <Text style={{ color: "white", alignSelf: 'center', marginBottom: 40, backgroundColor: '#ff101f', padding: 10, borderRadius: 20 }}>
              Apagar camara
            </Text>
          </TouchableOpacity>}
        </View>
        <View style={{ flexDirection: "row", width: '100%' }}>
          <MainButton handlePress={handleLeft} color="#70b77e" txt="Musculación" />
          <MainButton handlePress={handleRight} color="#036016" txt="Spinning" />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

function MainButton({
  handlePress,
  color,
  txt
}: {
  handlePress: () => void;
  color: string;
  txt: string;
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ backgroundColor: color, flex: 1, alignItems: 'center', borderRadius: 10, marginHorizontal: 5, marginBottom: 20 }}
    >
      <Text style={{ color: 'white', padding: 20 }}>
        {txt}
      </Text>
    </TouchableOpacity>)
}


import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal } from "react-native";
import { CameraView, Camera } from "expo-camera";

import { useSessionContext } from "@/context/SessionContext";
// import { AuthModal } from "@/components/modals/AuthModal";
import RestApiClient from "@/utils/rest_api_client";
import { AxiosError } from "axios";
import { regex } from '../utils/constants';
import { MainButton } from "@/components/buttons/MainButton";
import ScanDoneModal from "@/components/modals/ScanDoneModal";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [musculation, setMusculation] = useState<"Muscle" | "Spinning">("Muscle");
  // const [authModal, setAuthModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<string>("0.00");
  // const { logState } = useSessionContext();
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
    // if (logState.email.length === 0) {
    //   setAuthModal(true)
    // }
  }, []);

  const handleQrScanned = async ({ type, data }: { type: any, data: any }) => {
    setScanned(true);
    setCamera(false);
    if (regex.test(data)) {
      setLoading(true);
      setShowModal(true);
      try {
        const res = await RestApiClient.post(`${process.env.EXPO_PUBLIC_API_URL}/api/assistance/checkToken`, {
          assistance_token: data,
          authorization: "LTPv/UAhKU3pxbNPpeoESBX94rQPvIfcI0VdT1TE78g=",
          serviceName: musculation
        })
        if (res.status === 200) {
          setUserBalance(res.data.data.user_balance);
        } else {
          alert("Hubo un error, intentelo de nuevo");
          setShowModal(false);
        }
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.message);
        }
        setShowModal(false);
        setLoading(false);
        alert("Hubo un error, intentelo de nuevo");
      }
    } else {
      setShowModal(false);
      setLoading(false);
      alert(`QR no compatible con mensaje: \n\n${data}`);
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.txt}>Pidiendo permiso para usar la cámara del dispositivo</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.txt}>No se concedió acceso a la camara</Text>;
  }
  const handleLeft = () => {
    setCamera(prev => !prev);
    setMusculation("Muscle");
    setScanned(false);

  }
  const handleRight = () => {
    setCamera(prev => !prev);
    setMusculation("Spinning");
    setScanned(false);
  }

  {/* <AuthModal authModal={authModal} setAuthModal={setAuthModal}/> */ }
  return (
    <View style={styles.container}>
      <Text style={styles.waterMark}>
        F y 25
      </Text>
      {camera &&
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleQrScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={styles.cameraSpace}
        />
      }

      <ScanDoneModal
        loading={loading}
        setShowModal={setShowModal}
        showModal={showModal}
        userBalance={userBalance}
      />
      <View style={styles.innerContainer}>
        <View style={styles.full}>

          <Text style={[styles.txt, {
            backgroundColor: '#011936',
            paddingHorizontal: 20,
            borderRadius: 20
          }]}>
            {!camera ? "QR Scanner" : musculation === "Muscle" ? "Musculación" : "Spinning"}
          </Text>
        </View>
        {camera && <TouchableOpacity onPress={() => setCamera(false)}>
          <Text style={{ color: "white", alignSelf: 'center', marginBottom: 40, backgroundColor: '#ff101f', padding: 10, borderRadius: 20 }}>
            Apagar camara
          </Text>
        </TouchableOpacity>}

        <View style={styles.buttonPanel}>
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
  txt: {
    color: "white",
    alignSelf: 'center',
    marginVertical: "auto",
    fontSize: 50
  },
  cameraSpace: {
    width: '100%',
    height: '60%'
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#011936',
    flex: 1,
    justifyContent: 'flex-end'
  },
  full: {
    width: '100%',
    height: '100%'
  },
  buttonPanel: {
    flexDirection: "row",
    width: '100%'
  },
  waterMark: {
    position: 'absolute',
    color: 'rgba(200,40,0,0.1)',
    pointerEvents: 'none',
    zIndex: 1,
    top: "10%",
    left: '7%',
    fontSize: 120
  }
});


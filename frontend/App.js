import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { verifyURLWithModel } from "./src/api/mlservice";
import ScanResultModal from "./src/components/ScanResultModal";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(data);
    setScanned(true);
    setScanData(data);
    setScanResult(await verifyURLWithModel(data));
    setShowModal(true);
  };

  const rescanBarCode = () => {
    setShowModal(false);
    setScanned(false);
    setScanResult(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  };

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Please grant SecureQR access to your camera.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <ScanResultModal
        isVisible={showModal}
        isMalicious={scanResult}
        url={scanData}
        handleClose={rescanBarCode}
      />
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

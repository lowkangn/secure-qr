import { Button, Modal, StyleSheet, Text, View } from "react-native";

export default function ScanResultModal({
  isVisible,
  isMalicious,
  url,
  handleClose,
}) {
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {isMalicious ? "WARNING" : "SAFE"}
          </Text>
          {isMalicious ? (
            <Text style={styles.modalText}>
              Secure QR has detected that this QR code is malicious. Please do
              not access the contents of this QR code.
            </Text>
          ) : (
            <>
              <Text style={styles.modalText}>
                Secure QR did not find anything malicious about this QR code.
              </Text>
              <Text style={styles.modalText}>{url}</Text>
            </>
          )}
          <Button
            onPress={handleClose}
            title={isMalicious ? "CLOSE" : "OPEN LINK"}
          />
          {!isMalicious && <Button onPress={handleClose} title="CANCEL"></Button>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

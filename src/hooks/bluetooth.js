import useBtStore from "@/store/bluetooth";
export const useBluetooth = () => {
  function isBtEnabled() {
    window.bluetoothSerial.isEnabled(
      () => (useBtStore.bluetoothEnabled = true),
      () => (useBtStore.bluetoothEnabled = false)
    );
  }

  function getBtDevicesList() {
    window.bluetoothSerial.list(
      (devices) => (useBtStore.state.devicesList = devices),
      () => (useBtStore.state.devicesList = [])
    );
  }

  function isBtConnected() {
    window.bluetoothSerial.isConnected(
      () => (useBtStore.bluetoothConnected = true),
      () => (useBtStore.bluetoothConnected = false)
    );
  }

  function connectDevice(id) {
    window.bluetoothSerial.connect(
      id,
      () => true,
      () => false
    );
  }

  return {
    isBtEnabled,
    getBtDevicesList,
    isBtConnected,
    connectDevice,
  };
};

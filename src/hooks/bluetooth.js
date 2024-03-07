export const useBluetooth = () => {
  function isBtEnabled() {
    window.bluetoothSerial.isEnabled(
      () => true,
      () => false
    );
  }

  function getBtDevicesList() {
    window.bluetoothSerial.list(
      (devices) => devices,
      () => []
    );
  }

  function isBtConnected() {
    window.bluetoothSerial.isConnected(
      () => true,
      () => false
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

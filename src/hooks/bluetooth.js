import useBtStore from "@/store/bluetooth";
export const useBluetooth = () => {
  const store = useBtStore();
  const btSerial = window.bluetoothSerial;
  function isBtEnabled() {
    btSerial.isEnabled(
      () => (store.bluetoothEnabled = true),
      () => (store.bluetoothEnabled = false)
    );
  }

  function getBtDevicesList() {
    btSerial.list(
      (devices) => (store.devicesList = devices),
      () => (store.devicesList = [])
    );
  }

  function isBtConnected() {
    btSerial.isConnected(
      () => (store.bluetoothConnected = true),
      () => (store.bluetoothConnected = false)
    );
  }

  function connectDevice(id, cb) {
    console.log(cb, "callback");
    btSerial.connect(
      id,
      () => cb(),
      () => false
    );
  }

  // window.bluetoothSerial.subscribe(
  //   "\n",
  //   (data) => console.log(data),
  //     () => false
  // );

  return {
    isBtEnabled,
    getBtDevicesList,
    isBtConnected,
    connectDevice,
  };
};

import useBtStore from "@/store/bluetooth";
export const useBluetooth = () => {
  const store = useBtStore();
  const btSerial = window.bluetoothSerial;

  const isBtEnabled = () => {
    btSerial.isEnabled(
      () => (store.bluetoothEnabled = true),
      () => (store.bluetoothEnabled = false)
    );
  };

  const getBtDevicesList = (cb) => {
    btSerial.list(
      (devices) => {
        store.devicesList = devices;
        cb();
      },
      () => {
        store.devicesList = [];
        cb();
      }
    );
  };

  const isBtConnected = () => {
    btSerial.isConnected(
      () => (store.bluetoothConnected = true),
      () => (store.bluetoothConnected = false)
    );
  };

  const connectDevice = (id, cb) => {
    btSerial.connect(
      id,
      () => cb(true),
      () => cb(false)
    );
  };

  const getData = (cb) => {
    btSerial.subscribe(
      "\n",
      (data) => {
        const weight = Number(data.split(" ")[3]);
        if (weight > 0) {
          btSerial.unsubscribe();
          cb(data);
        }
      },
      () => cb("0.0")
    );
  };

  return {
    isBtEnabled,
    getBtDevicesList,
    isBtConnected,
    connectDevice,
    getData,
  };
};

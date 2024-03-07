export default {
  // check if mediaDevices is supported
  supported: () => {
    return (
      !!navigator.mediaDevices &&
      !!navigator.mediaDevices.getUserMedia &&
      !!navigator.mediaDevices.enumerateDevices
    );
  },
  // this function counts the amount of video inputs
  count: () => {
    const supportedTypes = ["video", "videoinput"];
    return new Promise(function (resolve) {
      var cams = 0;
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
          devices.forEach(function (device) {
            if (supportedTypes.includes(device.kind)) {
              cams++;
            }
          });
          resolve(cams);
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
          resolve(0);
        });
    });
  },
  // camera constraints
  constraints: (facingMode) => {
    return {
      audio: false,
      video: {
        facingMode,
      },
    };
  },
};

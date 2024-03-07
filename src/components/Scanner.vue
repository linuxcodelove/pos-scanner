<template>
  <div>
    <div v-if="alertMsg">
      <v-alert
        :text="alertMsg"
        title="No cameras Found!"
        type="error"
      ></v-alert>
    </div>
    <div v-else class="scanner-container">
      <video poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="overlay-element"></div>
      <div class="laser"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import _camera from "@/hooks/camInitialSetup.js";
import { useScanner } from "@/hooks/scanner.js";

export default {
  name: "Scanner",
  emits: ["decode", "close", "error"],
  setup(_, context) {
    const alertMsg = ref(null);

    onMounted(() => {
      if (!alertMsg.value) {
        init();
        start();
      }
    });

    onBeforeUnmount(() => {
      codeReader.reset();
    });

    function start() {
      codeReader.decodeFromVideoDevice(
        undefined,
        scanner.value,
        (result, err) => {
          if (result) {
            close(true, result.text);
          } else {
            context.emit("error", err);
          }
        }
      );
    }

    function close(hasResult, result = null) {
      alertMsg.value = null;
      const stream = scanner.value.srcObject;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      if (hasResult) context.emit("decode", result);
      else context.emit("close");
    }

    function init() {
      supported.value = _camera.supported();
      if (!supported.value) {
        alertMsg.value =
          "camera is not supported, or there is no camera detected/connected";
        return;
      }
      _camera
        .count()
        .then((cams) => {
          camCount.value = cams;
          navigator.mediaDevices
            .getUserMedia(_camera.constraints(facingMode.value))
            .then((stream) => {
              scanner.value.srcObject = stream;
            });
        })
        .catch((err) => {
          alertMsg.value = "unable to get cam access";
          console.error("getUserMedia() error: ", err);
        });
    }

    const {
      supported,
      camCount,
      facingMode,
      codeReader,
      isMediaStreamAPISupported,
      frontCam,
      scanner,
      switchCamera,
    } = useScanner();

    return {
      supported,
      camCount,
      facingMode,
      alertMsg,
      codeReader,
      isMediaStreamAPISupported,
      frontCam,
      scanner,
      start,
      switchCamera,
      init,
    };
  },
};
</script>

<style scoped>
video {
  max-width: 100%;
  max-height: 100%;
}
.scanner-container {
  position: relative;
}
.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}
.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);

  -webkit-clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
  clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
}
@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>

import { ref, reactive, computed } from "vue";
import { BrowserMultiFormatReader } from "@zxing/library";

export const useScanner = () => {
  const supported = ref(false);
  const camCount = ref(0);
  const facingMode = ref("environment");
  const codeReader = reactive(new BrowserMultiFormatReader());
  const isMediaStreamAPISupported =
    navigator &&
    navigator.mediaDevices &&
    "enumerateDevices" in navigator.mediaDevices;
  const scanner = ref(null);

  const frontCam = computed(() => facingMode.value === "environment");

  function switchCamera() {
    if (facingMode.value === "environment") {
      facingMode.value = "user";
    } else {
      facingMode.value = "environment";
    }
  }

  return {
    supported,
    camCount,
    facingMode,
    codeReader,
    isMediaStreamAPISupported,
    scanner,
    frontCam,
    switchCamera,
  };
};

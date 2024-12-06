import anime from "animejs";

export function useChatAnimations({
  chatWindow,
  isContentHidden,
  emit,
  isMobile
}) {
  const animateOpen = () => {
    const windowElement = chatWindow.value;
    windowElement.style.position = "fixed";

    anime({
      targets: windowElement,
      width: isMobile.value ? ["60px", "100%"] : ["60px", "360px"],
      height: isMobile.value ? ["60px", "100%"] : ["60px", "480px"],
      bottom: isMobile.value ? ["20px", "0"] : "20px",
      right: isMobile.value ? ["20px", "0"] : "20px",
      borderRadius: ["100%", "10px"],
      duration: 300,
      easing: "easeInOutQuad",
      begin: () => {
        isContentHidden.value = true;
      },
      complete: () => {
        isContentHidden.value = false;
        emit("animationComplete");
      }
    });
  };

  const animateClose = () => {
    const windowElement = chatWindow.value;

    anime({
      targets: windowElement,
      width: isMobile.value ? ["100%", "60px"] : "60px",
      height: isMobile.value ? ["100%", "60px"] : "60px",
      bottom: "20px",
      right: "20px",
      borderRadius: ["10px", "100%"],
      duration: 300,
      easing: "easeInOutQuad",
      begin: () => {
        isContentHidden.value = true;
      },
      complete: () => {
        emit("closeChat");
      }
    });
  };

  return { animateOpen, animateClose };
}

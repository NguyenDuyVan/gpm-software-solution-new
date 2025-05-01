export const debounce = <T extends () => void>(func: T, delay: number = 200): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
};

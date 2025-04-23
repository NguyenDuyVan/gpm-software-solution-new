import { computed, ref } from 'vue';

export const useCountdownTimer = (durationInHours: number) => {
  const time = ref('');
  const endTime = Date.now() + durationInHours * 60 * 60 * 1000;

  const updateTimer = () => {
    const timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    time.value = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const interval = setInterval(updateTimer, 1000);
  updateTimer();

  return {
    timeLeft: computed(() => time.value),
  };
};

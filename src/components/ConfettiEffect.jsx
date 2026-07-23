import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiEffect = ({ duration = 5000 }) => {
  useEffect(() => {
    const end = Date.now() + duration;
    const colors = ['#FF69B4', '#FF1493', '#FFD700', '#E6E6FA', '#FFB6C1', '#9b59b6'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst at start
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });

    return () => {};
  }, [duration]);

  return null;
};

export default ConfettiEffect;

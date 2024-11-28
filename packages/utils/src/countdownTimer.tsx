import { useState, useEffect } from 'react';

const useCountdownTimer = (initialSeconds:number, onEnd?:() => void) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) {
            if (onEnd) {
                onEnd();
            }
            return;
        }

        const timerId = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [seconds, onEnd]);

    const resetTimer = () => {
        setSeconds(initialSeconds);
    };

    return { seconds, resetTimer };
};

export default useCountdownTimer;
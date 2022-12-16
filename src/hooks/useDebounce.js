import { useEffect, useRef } from 'react';

export const useDebounce = (callback, deps, timeout = 1000) => {
    const timeoutId = useRef();

    useEffect(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(callback, timeout);

        return () => clearTimeout(timeoutId.current);
    }, deps);
};

import { useCallback, useState } from 'react';

const useToggle = ({ initial }) => {
    const [state, setState] = useState(initial);

    const handleToggle = useCallback(() => {
        setState(prevState => !prevState);
    }, []);

    const handleSetValue = useCallback(({ value }) => {
        setState(value);
    }, []);

    return {
        state,
        onToggle: handleToggle,
        onSetValue: handleSetValue,
    };
};

export { useToggle };

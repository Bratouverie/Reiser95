import React, { useCallback, forwardRef } from 'react';

const Form = forwardRef((props, ref) => {
    const { children, className, onSubmit, autoComplete, id } = props;

    const handleSubmit = useCallback(
        (ev) => {
            ev.preventDefault();
            onSubmit(ev);
        },
        [onSubmit],
    );

    return (
        <form
            id={id}
            className={className}
            onSubmit={handleSubmit}
            ref={ref}
            autoComplete={autoComplete}
        >
            {children}
        </form>
    );
});

Form.defaultProps = {
    className: '',
    autoComplete: 'off',
};

Form.displayName = 'Form';

export default React.memo(Form);

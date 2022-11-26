import { useCallback } from 'react';

export const useValidationResolver = schema => {
    const validationResolver = useCallback(
        data => {
            const { error, value: values } = schema.validate(data, {
                abortEarly: false,
            });
            return {
                values: error ? {} : values,
                errors: error
                    ? error.details.reduce(
                          (previous, currentError) => ({
                              ...previous,
                              [currentError.path[0]]: currentError,
                          }),
                          {},
                      )
                    : {},
            };
        },
        [schema],
    );

    return { validationResolver };
};

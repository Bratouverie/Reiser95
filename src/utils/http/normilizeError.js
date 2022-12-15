export const normilizeError = response => {
    const { data } = response;

    const errorKeys = Object.keys(data);

    let error = `${data}`.slice(0, 100);

    if (typeof data === 'object') {
        error = `${errorKeys.map(k => `${k} - ${data[k]}`).join(', ')}\n`;
    }

    return error;
};

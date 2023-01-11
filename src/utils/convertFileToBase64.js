export const convertFileToBase64 = async file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            if (!!reader.result) {
                resolve(reader.result);
            } else {
                reject(Error('Failed converting to base64'));
            }
        };
    })
        .then(res => res)
        .catch(e => console.log({ e }));

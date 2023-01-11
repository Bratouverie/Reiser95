export const arrayBufferToBinary = (buffer, type) => {
    try {
        let binary = atob(buffer.split(',')[1]);
        let array = [];

        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }

        let blobData = new Blob([new Uint8Array(array)], { type });

        return blobData;
    } catch (e) {
        console.log({ e });
    }
};

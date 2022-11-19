export const getFileNameAndExt = fileName => {
    const arr = fileName.split('.');

    const ext = arr.pop();
    const fileNameWithoutExt = `${arr.join('.')}`;

    return {
        ext: ext || '',
        fileName: fileNameWithoutExt,
    };
};

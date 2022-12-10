import { getFileNameAndExt } from './getFilenameAndExt';

export const isVideo = filename => {
    const { ext } = getFileNameAndExt(filename);

    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            return true;
    }

    return false;
};

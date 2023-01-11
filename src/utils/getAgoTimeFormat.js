export const getAgoTimeFormat = (ms) => {
    const diffDays = Math.floor(ms / 86400000);
    const diffHrs = Math.floor((ms % 86400000) / 3600000);
    const diffMins = Math.round(((ms % 86400000) % 3600000) / 60000);

    if (diffDays > 0) {
        return `${diffDays} days ago`;
    }

    if (diffHrs > 0) {
        return `${diffHrs} hours ago`;
    }

    if (diffMins > 0) {
        return `${diffMins} minutes ago`;
    }

    return 'just now';
};

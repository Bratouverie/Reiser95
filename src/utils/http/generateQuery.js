export const generateQuery = query =>
    query && Object.values(query).length ? `?${new URLSearchParams(query).toString()}` : '';

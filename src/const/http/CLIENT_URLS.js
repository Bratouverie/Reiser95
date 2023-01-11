export const STATISTICS_ACCOUNT_COLLECTIONS_LIST = ({ accountId }) =>
    `/admin/statistics/${accountId}`;

export const STATISTICS_COLLECTION_PACKS_LIST = ({ accountId, collectionId }) =>
    `${STATISTICS_ACCOUNT_COLLECTIONS_LIST({ accountId })}/${collectionId}`;

export const STATISTICS_PACK_TOKENS_LIST = ({ accountId, collectionId, packId }) =>
    `${STATISTICS_COLLECTION_PACKS_LIST({
        accountId,
        collectionId,
    })}/${packId}`;

export const EDIT_PAGE = '/admin/edit';

export const EDIT_PAGE_PAGE = ({ url }) => `${EDIT_PAGE}/page/${url}`;
export const EDIT_ACCOUNT_PAGE = ({ id }) => `${EDIT_PAGE}/account/${id}`;
export const EDIT_COLLECTION_PAGE = ({ id }) => `${EDIT_PAGE}/collection/${id}`;
export const EDIT_PACK_PAGE = ({ id }) => `${EDIT_PAGE}/pack/${id}`;
export const EDIT_TOKEN_PAGE = ({ id }) => `${EDIT_PAGE}/token/${id}`;

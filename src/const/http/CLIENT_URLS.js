export const STATISTICS_ACCOUNT_COLLECTIONS_LIST = ({ accountId }) =>
    `/admin/statistics/${accountId}`;

export const STATISTICS_COLLECTION_PACKS_LIST = ({ accountId, collectionId }) =>
    `${STATISTICS_ACCOUNT_COLLECTIONS_LIST({ accountId })}/${collectionId}`;

export const STATISTICS_PACK_TOKENS_LIST = ({ accountId, collectionId, packId }) =>
    `${STATISTICS_COLLECTION_PACKS_LIST({
        accountId,
        collectionId,
    })}/${packId}`;

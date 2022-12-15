const BASE_API_URL = 'https://checkbrandcom.site/admin_service/api/v1/';
const BASE_AUTH_API_URL = 'https://checkbrandcom.site/auth_service/auth/api/v1/';

const TOKEN_BY_PACK = `${BASE_API_URL}token_by_pack/`;
const CONFIRME_UPLOAD_TOKEN = tokenId => `${TOKEN_BY_PACK}confirm_upload/${tokenId}/`;

const PAGES_ROUTE = `${BASE_API_URL}page/`;
const BLOCKCHAINS_ROUTE = `${BASE_API_URL}blockchain/`;

export {
    BASE_API_URL,
    BASE_AUTH_API_URL,
    PAGES_ROUTE,
    BLOCKCHAINS_ROUTE,
    TOKEN_BY_PACK,
    CONFIRME_UPLOAD_TOKEN,
};

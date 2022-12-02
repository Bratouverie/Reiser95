const BASE_API_URL = 'https://checkbrandcom.site/admin_service/api/v1/';

const TOKEN_BY_PACK = `${BASE_API_URL}token_by_pack/`;
const CONFIRME_UPLOAD_TOKEN = tokenId => `${TOKEN_BY_PACK}confirm_upload/${tokenId}/`;

export { BASE_API_URL, TOKEN_BY_PACK, CONFIRME_UPLOAD_TOKEN };

export const DEBUG = process.env.NODE_ENV !== 'production';

export const TOKEN_HAS_EXPIRED = 4011; // Token has expired
export const NO_AUTHENTICATE = 4012; // Failed to authenticate because of bad credentials or an invalid authorization header.
export const TOKEN_BLACKLIST = 4013; // The token has been blacklisted
export const UNLOGIN = 5000; // Unlogin

import { env } from '$env/dynamic/private';

export const IS_PRODUCTION = env.NODE === 'production';

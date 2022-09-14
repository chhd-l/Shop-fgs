import { TopNavigationApiResponse } from './types';
export declare const fetchNavigationContentDelivery: (site: string, locale: string, apiHost?: string | undefined) => Promise<TopNavigationApiResponse>;
export declare const fetchNavigationRenderingHost: (site: string, locale: string, apiHost?: string | undefined) => Promise<TopNavigationApiResponse>;

import { FooterApiResponse } from './types';
export declare const fetchFooterContentDelivery: (site: string, locale: string, apiHost?: string | undefined) => Promise<FooterApiResponse>;
export declare const fetchFooterRenderingHost: (site: string, locale: string, apiHost?: string | undefined) => Promise<FooterApiResponse>;

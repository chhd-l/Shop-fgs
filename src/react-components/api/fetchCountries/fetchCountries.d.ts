export declare type CountrySelectorItem = {
    name: string;
    fields: {
        CountryName: {
            value: string;
        };
        RelatedLanguage: {
            name: string | null;
        };
    };
};
export declare type CountriesApiResponse = {
    countrySelector: {
        tenantSettings: {
            fields: {
                Button: {
                    href: string;
                    text: string;
                };
                CloseText: {
                    value: string;
                };
                Title: {
                    value: string;
                };
                Language: {
                    value: string;
                };
                Location: {
                    value: string;
                };
            };
            items: CountrySelectorItem[];
        };
    };
};
export declare const fetchCountriesContentDelivery: (site: string, locale: string, apiHost?: string | undefined) => Promise<CountriesApiResponse>;
export declare const fetchCountriesRenderingHost: (site: string, locale: string, apiHost?: string | undefined) => Promise<CountriesApiResponse>;

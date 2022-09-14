export declare type LinkFieldValue = {
    [attributeName: string]: unknown;
    href?: string;
    className?: string;
    class?: string;
    title?: string;
    target?: string;
    text?: string;
    querystring?: string;
};
export declare type LinkField = {
    value: LinkFieldValue;
};
export declare type GenericFieldValue = string | boolean | number | {
    [key: string]: unknown;
} | Array<{
    [key: string]: unknown;
}>;
export declare type Field<T = GenericFieldValue> = {
    value: T;
};
export declare type ImageFieldValue = {
    [attributeName: string]: unknown;
    src?: string;
};
export declare type ImageField = {
    value?: ImageFieldValue;
};
export declare type SitecoreItem<T> = {
    id: string;
    name: string;
    displayName: string;
    fields: T;
};
export declare type SitecoreItems<T> = {
    items: T[];
};
export declare type IconItem = SitecoreItem<{
    SvgIcon: Field<string>;
    AltText: Field<string>;
}>;
export declare type SiteSettings<T> = {
    siteSettings: T;
};
export declare type WeShareAspectRatio = '1:1' | '4:3' | '16:9' | '13:5';
export declare type WeShareImageParameters = {
    formatjpg?: 'true' | 'false';
    autocompress?: 'true' | 'false';
    useoptimalimageformat?: 'true' | 'false';
    fpx?: number;
    fpy?: number;
    ar?: WeShareAspectRatio;
};
export declare type WeShareImageField = ImageField & {
    value: WeShareImageParameters;
};

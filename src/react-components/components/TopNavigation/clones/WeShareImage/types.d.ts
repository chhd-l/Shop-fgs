export declare type WeShareAspectRatio = string;
export declare type DefaultImageWidths = 320 | 360 | 480 | 640 | 720 | 960 | 1280 | 1440;
export declare type WeShareImageParameters = {
    formatjpg?: 'true' | 'false';
    autocompress?: 'true' | 'false';
    useoptimalimageformat?: 'true' | 'false';
    fpx?: number;
    fpy?: number;
    ar?: WeShareAspectRatio;
};
export declare type WeShareImageExtendedParameters = WeShareImageParameters & {
    [attr: string]: string | number | undefined | unknown;
    /** Fixed width of the image */
    w?: number;
    /** Fixed height of the image */
    h?: number;
    /** Max width of the image */
    mw?: number;
    /** Max height of the image */
    mh?: number;
    /** Ignore aspect ratio */
    iar?: 1 | 0;
    /** Allow stretch */
    as?: 1 | 0;
    /** Image scale. Defaults to 1.0 */
    sc?: number;
};
export interface ImageFieldValue {
    [attributeName: string]: unknown;
    src?: string;
}
export interface ImageField {
    value?: ImageFieldValue;
}
export declare type WeShareImageField = ImageField & {
    value: WeShareImageParameters;
};
export declare type WeShareImageProps = {
    image: WeShareImageField;
    alt?: string;
    ratio?: WeShareAspectRatio;
    widths?: number[];
    sizesSet?: string;
};

import { RenderLink } from '../../../providers';
import { SitecoreItem, SitecoreItems, IconItem, WeShareImageField, Field, LinkField } from '../../../types';
export declare type TopNavigationProps = {
    navigationData: TopNavigationPrimaryItem[];
    renderLink?: RenderLink;
};
export declare type TopNavigationPrimaryItem = TopNavPrimaryItemWithoutSubmenuItem | TopNavPrimaryItemWithSubmenuItem;
export declare type TopNavPrimaryItemWithSubmenuItem = TopNavPrimaryItem1Column1PromoBlockItem | TopNavPrimaryItem2Columns1SmallImageItem | TopNavPrimaryItem1Columns1LargeImageItem | TopNavPrimaryItem2ProductBlocks1ImageItem | TopNavPrimaryItemContactUsItem;
export declare type TopNavPrimaryItemWithoutSubmenuItem = TopNavSitecoreItem<TopNavigationPrimaryItemFields>;
export declare type TopNavPrimaryItemWithoutSubmenuProps = {
    item: TopNavPrimaryItemWithoutSubmenuItem;
};
export declare type TopNavPrimaryItem2Columns1SmallImageItem = TopNavSitecoreItem<TopNavPrimaryItem2Columns1SmallImageFields> & SitecoreItems<TopNavSubmenuItemLink>;
export declare type TopNavPrimaryItem1Columns1LargeImageItem = TopNavSitecoreItem<TopNavPrimaryItem1Columns1LargeImageFields> & SitecoreItems<TopNavSubmenuItemLink>;
export declare type TopNavPrimaryItem2ProductBlocks1ImageItem = TopNavSitecoreItem<TopNavPrimaryItem2ProductBlocks1ImageFields> & SitecoreItems<TopNavSubmenuColumn>;
export declare type TopNavPrimaryItem1Column1PromoBlockItem = TopNavSitecoreItem<TopNavPrimaryItem1Column1PromoBlockFields> & SitecoreItems<TopNavSubmenuItemLink>;
export declare type TopNavPrimaryItemContactUsItem = TopNavSitecoreItem<TopNavPrimaryItemContactUsFields> & SitecoreItems<TopNavSubmenuItemButton>;
export declare type TopNavPrimaryItemWithSubmenuProps = TopNavSubmenuProps;
export declare type TopNavSubmenuProps = {
    item: TopNavPrimaryItemWithSubmenuItem;
    isOpen: boolean;
};
export declare type TopNavSubmenuTemplateProps = {
    item: TopNavPrimaryItemWithSubmenuItem;
};
export declare type TopNavPrimaryItem1Column1PromoBlockProps = {
    item: TopNavPrimaryItem1Column1PromoBlockItem;
    isOpen: boolean;
    setOpen: () => void;
};
export declare type TopNavPrimaryItemProps = {
    item: TopNavigationPrimaryItem;
};
export declare type TopNavSubmenuColumn = TopNavSitecoreItem<TopNavSubmenuColumnFields> & SitecoreItems<TopNavSubmenuItemLink>;
export declare type TopNavSubmenuItemLink = TopNavSitecoreItem<TopNavSubmenuItemLinkFields>;
export declare type TopNavSubmenuItemButton = TopNavSitecoreItem<TopNavSubmenuItemButtonFields>;
export declare type TopNavSubmenuTwoColumnsOneImageProps = {
    item: TopNavPrimaryItem2Columns1SmallImageItem;
};
export declare type TopNavPrimaryItem2ProductBlocks1ImageProps = {
    item: TopNavPrimaryItem2ProductBlocks1ImageItem;
};
export declare type TopNavSubmenuOneColumnOneImageProps = {
    item: TopNavPrimaryItem1Columns1LargeImageItem;
};
export declare type TopNavSubmenuOneColumnOnePromoBlockProps = {
    item: TopNavPrimaryItem1Column1PromoBlockItem;
};
export declare type TopNavSubmenuContactUsProps = {
    item: TopNavPrimaryItemContactUsItem;
};
export declare type SubmenuVariant = '1col1img' | '1col1promo' | '2col1img';
export declare type TopNavSubmenuItemsProps = SitecoreItems<TopNavSubmenuItemLink> & {
    variant: SubmenuVariant;
    title?: string;
};
export declare type TopNavSubmenuItemProps = {
    link: LinkField;
    title: string;
    className?: string;
};
declare type TopNavPrimaryItem2Columns1SmallImageFields = {
    ImageRight: WeShareImageField;
    ImageAlt: Field<string>;
} & TopNavigationPrimaryItemFields;
declare type TopNavPrimaryItem2ProductBlocks1ImageFields = {
    ImageRight: WeShareImageField;
    ImageAlt: Field<string>;
} & TopNavigationPrimaryItemFields;
declare type TopNavPrimaryItem1Columns1LargeImageFields = {
    ImageRight: WeShareImageField;
    ImageAlt: Field<string>;
} & TopNavigationPrimaryItemFields;
declare type TopNavPrimaryItemContactUsFields = {
    Title: Field<string>;
    DisclaimerText: Field<string>;
    Text: Field<string>;
} & TopNavigationPrimaryItemFields;
declare type TopNavPrimaryItem1Column1PromoBlockFields = {
    PromoTitle: Field<string>;
    PromoText: Field<string>;
    PromoButtonLabel: Field<string>;
    PromoButtonLink: LinkField;
    PromoImage: WeShareImageField;
    ImageAlt: Field<string>;
} & TopNavigationPrimaryItemFields;
declare type TopNavigationPrimaryItemFields = {
    Enabled: Field<boolean>;
    Link: LinkField;
    PrimaryTitle: Field<string>;
    SubmenuTitle: Field<string>;
};
declare type TopNavSubmenuItemLinkFields = {
    Enabled: Field<boolean>;
    Link: LinkField;
    Title: Field<string>;
};
declare type TopNavSubmenuColumnFields = {
    ColumnTitle: Field<string>;
};
declare type TopNavSubmenuItemButtonFields = {
    ButtonText: Field<string>;
    ButtonLink: LinkField;
    ButtonLabel: Field<string>;
    ButtonIcon: IconItem;
};
declare type TopNavSitecoreItem<T> = SitecoreItem<T> & {
    templateId: string;
};
export {};

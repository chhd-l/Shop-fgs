import { RenderLink } from '../../../providers/LinkContextProvider/types';
import { SitecoreItem, SitecoreItems, IconItem, SiteSettings, Field, LinkField } from '../../../types';
export declare type ExportedFooterProps = FooterComponentProps & {
    renderLink?: RenderLink;
};
export declare type FooterComponentProps = FooterWithSocialShareProps & {
    site: string;
    locale: string;
    apiHost?: string;
};
export declare type FooterWithSocialShareProps = {
    footer?: FooterProps;
    socialShare?: SocialShareProps;
};
export declare type FooterProps = SiteSettings<FooterSiteSettingsFields & FooterSiteSettingsItems>;
declare type FooterSiteSettingsFields = {
    fields: {
        BackToTop: Field<string>;
    } & FooterContactProps;
};
declare type FooterSiteSettingsItems = SitecoreItems<FooterTopLinkItem | FooterColumnItem>;
declare type FooterSitecoreItem<T> = SitecoreItem<T> & {
    templateId: string;
};
export declare type FooterContactProps = {
    Title: Field<string>;
    Text: Field<string>;
    ContactUsLink: LinkField;
    PhoneNumber: Field<string>;
};
export declare type FooterTopLinkItem = FooterSitecoreItem<{
    TopLinkIcon: IconItem;
    TopLink: LinkField;
    Enabled: Field<boolean>;
}>;
export declare type FooterColumnItem = FooterSitecoreItem<{
    ColumnLink: LinkField;
}> & SitecoreItems<FooterColumnChildItem>;
declare type FooterColumnChildItem = SitecoreItem<{
    ChildLink: LinkField;
    Enabled: Field<boolean>;
}>;
export declare type SocialShareProps = SiteSettings<SocialShareSettings>;
declare type SocialShareSettings = {
    LargeSocialSharingLabel?: Field<string>;
    Channels: SitecoreItem<ChannelsType>[];
    CopyLabel: Field<string>;
    CopyEnabled: Field<boolean>;
    CopyIcon: SitecoreItem<IconFields>;
};
declare type ChannelsType = {
    Label: Field<string>;
    Icon: SitecoreItem<IconFields>;
    Link: Field<string>;
};
declare type IconFields = {
    SvgXml: Field<string>;
};
export declare type FooterTopLinksProps = {
    items: FooterTopLinkItem[];
};
export declare type FooterTopLinkProps = {
    item: FooterTopLinkItem;
};
export declare type FooterScrollToTopButtonProps = {
    text: string;
};
export declare type FooterColumnsProps = {
    items: FooterColumnItem[];
};
export declare type FooterColumnProps = {
    item: FooterColumnItem;
    isOpen: boolean;
};
export declare type FooterColumnChildProps = {
    item: FooterColumnChildItem;
    parentLinkText?: string;
};
export {};

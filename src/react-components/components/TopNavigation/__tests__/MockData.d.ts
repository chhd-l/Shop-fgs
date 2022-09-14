import { TopNavTemplateIds } from '../TopNavTemplateIds';
import { TopNavigationPrimaryItem } from './../types';
import { HeaderWrapperProps } from './../clones/Header/types';
export declare const getTopNavigationProps: (count: number, subcount: number, getItems: (i: number, j: number) => TopNavigationPrimaryItem[]) => HeaderWrapperProps;
export declare const getSubItems: (count: number) => {
    id: string;
    name: string;
    displayName: string;
    fields: {
        Link: {
            value: {
                href: string;
            };
        };
        Title: {
            value: string;
        };
        Enabled: {
            value: boolean;
        };
    };
}[];
export declare const getProductItems: (count: number) => {
    id: string;
    name: string;
    displayName: string;
    templateId: string;
    fields: {
        ColumnTitle: {
            value: string;
        };
    };
    items: {
        id: string;
        name: string;
        displayName: string;
        fields: {
            Link: {
                value: {
                    href: string;
                };
            };
            Title: {
                value: string;
            };
            Enabled: {
                value: boolean;
            };
        };
    }[];
}[];
export declare const getNavigationItemsWithoutSubmenu: (count: number) => TopNavigationPrimaryItem[];
export declare const getItem: (index: number, href: string, primaryTitle: string, submenuTitle: string, itemTemplateId: string) => {
    id: string;
    name: string;
    displayName: string;
    templateId: string;
    fields: {
        Enabled: {
            value: boolean;
        };
        Link: {
            value: {
                href: string;
            };
        };
        PrimaryTitle: {
            value: string;
        };
        SubmenuTitle: {
            value: string;
        };
        ImageRight: {
            value: {
                src: string;
                formatjpg: string;
                autocompress: string;
            };
        };
        PromoButtonLink: {
            value: {
                href: string;
            };
        };
        ImageAlt: {
            value: string;
        };
        PromoImageAlternateText: {
            value: string;
        };
        TopNav2ColumnAlternateText: {
            value: string;
        };
        TopNav2ProductAlternateText: {
            value: string;
        };
        PromoImage: {
            value: {
                src: string;
                formatjpg: string;
                autocompress: string;
            };
        };
        PromoText: {
            value: string;
        };
        PromoTitle: {
            value: string;
        };
        PromoButtonLabel: {
            value: string;
        };
        DisclaimerText: {
            value: string;
        };
        Text: {
            value: string;
        };
        Title: {
            value: string;
        };
    };
    items: {
        id: string;
        name: string;
        displayName: string;
        fields: {
            Link: {
                value: {
                    href: string;
                };
            };
            Enabled: {
                value: boolean;
            };
            Title: {
                value: string;
            };
        };
        templateId: string;
    }[] | {
        id: string;
        name: string;
        displayName: string;
        fields: {
            ColumnTitle: {
                value: string;
            };
        };
        items: {
            id: string;
            name: string;
            displayName: string;
            fields: {
                Link: {
                    value: {
                        href: string;
                    };
                };
                Enabled: {
                    value: boolean;
                };
                Title: {
                    value: string;
                };
            };
            templateId: string;
        }[];
        templateId: string;
    }[] | {
        id: string;
        name: string;
        displayName: string;
        fields: {
            ButtonLabel: {
                value: string;
            };
            ButtonLink: {
                value: {
                    href: string;
                };
            };
            ButtonText: {
                value: string;
            };
            ButtonIcon: {
                displayName: string;
                fields: {
                    AltText: {
                        value: string;
                    };
                    SvgIcon: {
                        value: string;
                    };
                };
                id: string;
                name: string;
                url: string;
            };
        };
        templateId: TopNavTemplateIds;
    }[];
};
export declare const storyItems: {
    id: string;
    name: string;
    displayName: string;
    templateId: string;
    fields: {
        Enabled: {
            value: boolean;
        };
        Link: {
            value: {
                href: string;
            };
        };
        PrimaryTitle: {
            value: string;
        };
        SubmenuTitle: {
            value: string;
        };
        ImageRight: {
            value: {
                src: string;
                formatjpg: string;
                autocompress: string;
            };
        };
        PromoButtonLink: {
            value: {
                href: string;
            };
        };
        ImageAlt: {
            value: string;
        };
        PromoImageAlternateText: {
            value: string;
        };
        TopNav2ColumnAlternateText: {
            value: string;
        };
        TopNav2ProductAlternateText: {
            value: string;
        };
        PromoImage: {
            value: {
                src: string;
                formatjpg: string;
                autocompress: string;
            };
        };
        PromoText: {
            value: string;
        };
        PromoTitle: {
            value: string;
        };
        PromoButtonLabel: {
            value: string;
        };
        DisclaimerText: {
            value: string;
        };
        Text: {
            value: string;
        };
        Title: {
            value: string;
        };
    };
    items: {
        id: string;
        name: string;
        displayName: string;
        fields: {
            Link: {
                value: {
                    href: string;
                };
            };
            Enabled: {
                value: boolean;
            };
            Title: {
                value: string;
            };
        };
        templateId: string;
    }[] | {
        id: string;
        name: string;
        displayName: string;
        fields: {
            ColumnTitle: {
                value: string;
            };
        };
        items: {
            id: string;
            name: string;
            displayName: string;
            fields: {
                Link: {
                    value: {
                        href: string;
                    };
                };
                Enabled: {
                    value: boolean;
                };
                Title: {
                    value: string;
                };
            };
            templateId: string;
        }[];
        templateId: string;
    }[] | {
        id: string;
        name: string;
        displayName: string;
        fields: {
            ButtonLabel: {
                value: string;
            };
            ButtonLink: {
                value: {
                    href: string;
                };
            };
            ButtonText: {
                value: string;
            };
            ButtonIcon: {
                displayName: string;
                fields: {
                    AltText: {
                        value: string;
                    };
                    SvgIcon: {
                        value: string;
                    };
                };
                id: string;
                name: string;
                url: string;
            };
        };
        templateId: TopNavTemplateIds;
    }[];
}[];

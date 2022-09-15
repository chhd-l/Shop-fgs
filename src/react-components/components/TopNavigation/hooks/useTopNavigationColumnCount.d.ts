import { Field, LinkField } from '../../../types';
import { TopNavSubmenuItemLink } from '../types';
export declare const useTopNavigationColumnCount: (itemsPerColumn: number, items: TopNavSubmenuItemLink[], SubmenuTitle: Field<string>, PrimaryTitle: Field<string>, Link: LinkField, isMultiColumn: boolean) => {
    visibleItems: TopNavSubmenuItemLink[];
    firstColumnItems: TopNavSubmenuItemLink[];
    isFirstColumnVisible: boolean;
    isFirstColumnPrimaryLinkVisible: boolean;
    submenuLinkTitle: string;
};

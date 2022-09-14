import { SubmenuVariant } from './../types';
declare type StyledTopNavigationProps = {
    isMenuOpen: boolean;
};
declare type StyledSubmenuWithLinksProps = {
    variant: SubmenuVariant;
};
declare const StyledTopNavigation: import("styled-components").StyledComponent<"ul", any, StyledTopNavigationProps, never>;
declare const StyledTopNavigationItem: import("styled-components").StyledComponent<"li", any, {}, never>;
declare const StyledTopNavigationSubListItem: import("styled-components").StyledComponent<"li", any, {}, never>;
declare const StyledTopNavItemsWrapper: import("styled-components").StyledComponent<"div", any, {
    isOpen: boolean;
}, never>;
declare const StyledSubmenuWithLinks: import("styled-components").StyledComponent<"ul", any, StyledSubmenuWithLinksProps, never>;
declare const StyledNavButton: import("styled-components").StyledComponent<"button", any, {
    isOpen: boolean;
}, never>;
declare const StyledTopNavColumnTitle: import("styled-components").StyledComponent<"p", any, {}, never>;
export { StyledTopNavigation, StyledTopNavigationItem, StyledTopNavigationSubListItem, StyledTopNavItemsWrapper, StyledSubmenuWithLinks, StyledNavButton, StyledTopNavColumnTitle, };

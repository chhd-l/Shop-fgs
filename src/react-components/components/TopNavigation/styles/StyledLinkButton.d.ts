import { ButtonHTMLAttributes } from 'react';
declare type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon';
declare type StyledButtonProps = {
    disabled?: boolean;
    fullwidth?: boolean;
    variant: ButtonVariant;
};
declare type StyleProps = {
    fullWidth?: boolean;
    variant?: ButtonVariant;
    hasIcon?: boolean;
    pageEditing?: boolean;
};
export declare type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & {
    disabled?: boolean;
};
declare const StyledButton: import("styled-components").StyledComponent<"button", any, StyledButtonProps, never>;
declare const StyledLinkButton: import("styled-components").StyledComponent<"a", any, StyledButtonProps, never>;
declare const StyledIconWrapper: import("styled-components").StyledComponent<"span", any, {}, never>;
export { StyledButton, StyledLinkButton, StyledIconWrapper };

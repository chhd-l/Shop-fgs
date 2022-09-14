import { SVGAttributes } from 'react';
export declare type IconProps = SVGAttributes<SVGElement> & {
    title?: string;
    isDecorative?: boolean;
    display?: string;
    size?: string;
    width?: string;
    height?: string;
    color?: string;
    fill?: string;
};
declare type StyledBaseIconProps = {
    styles: Pick<IconProps, 'display' | 'fill' | 'width' | 'height'>;
};
declare const StyledBaseIcon: import("styled-components").StyledComponent<"svg", any, StyledBaseIconProps, never>;
export { StyledBaseIcon };

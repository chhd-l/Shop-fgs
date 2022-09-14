import { ReactNode } from 'react';
import { LinkFieldValue } from '../../../types';
export declare type RenderLink = (link: LinkFieldValue, children?: ReactNode, onClick?: () => void) => JSX.Element;
export declare type LinkContextProviderType = {
    renderLink: RenderLink;
};

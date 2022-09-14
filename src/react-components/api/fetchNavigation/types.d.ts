import { TopNavigationPrimaryItem } from '../../components/TopNavigation/types';
export interface TopNavigationApiResponse {
    siteSettings: {
        items: TopNavigationPrimaryItem[];
    };
}

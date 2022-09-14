import { State, ActionPayload } from './types';
declare const reducer: (state: State, action: ActionPayload) => {
    panelIsOpen: boolean;
    selectedCountry: string;
    countrySelectorData: import("../..").CountriesApiResponse;
    setPanel: (status: boolean) => void;
    setSelectedCountry: (country: string) => void;
    setCountrySelectorData: (data: import("../..").CountriesApiResponse) => void;
};
export default reducer;

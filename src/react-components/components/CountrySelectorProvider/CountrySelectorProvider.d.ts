import { FunctionComponent } from 'react';
import { CountriesApiResponse } from '../../api/fetchCountries';
import { CountrySelectorContextType, DispatchAction } from './types';
export declare const initialState: {
    panelIsOpen: boolean;
    selectedCountry: string;
    countrySelectorData: CountriesApiResponse;
    setPanel: () => undefined;
    setSelectedCountry: () => undefined;
    setCountrySelectorData: () => undefined;
};
export declare const CountrySelectorContext: import("react").Context<CountrySelectorContextType>;
export declare const setPanelStatus: (dispatch: DispatchAction, status: boolean) => void;
export declare const setSelectedCountryText: (dispatch: DispatchAction, selectedCountry: string) => void;
export declare const setCountrySelectorTextData: (dispatch: DispatchAction, countrySelectorData: CountriesApiResponse) => void;
declare const CountrySelectorProvider: FunctionComponent;
export default CountrySelectorProvider;

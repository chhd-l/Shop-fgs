import { Dispatch } from 'react';
import { CountriesApiResponse } from '../../../api/fetchCountries';
import { actions } from '../action';
export declare type State = {
    panelIsOpen: boolean;
    selectedCountry: string;
    countrySelectorData: CountriesApiResponse;
    setPanel: (status: boolean) => void;
    setSelectedCountry: (country: string) => void;
    setCountrySelectorData: (data: CountriesApiResponse) => void;
};
declare type SetPanelPayload = {
    type: actions.SET_PANEL;
    payload: {
        panelIsOpen: boolean;
    };
};
declare type SelectedCountryPayload = {
    type: actions.SELECTED_COUNTRY;
    payload: {
        selectedCountry: string;
    };
};
declare type SetCountrySelectorData = {
    type: actions.SET_COUNTRY_SELECTOR_DATA;
    payload: {
        countrySelectorData: CountriesApiResponse;
    };
};
export declare type ActionPayload = SetPanelPayload | SelectedCountryPayload | SetCountrySelectorData;
export declare type DispatchAction = Dispatch<ActionPayload>;
export declare type CountrySelectorContextType = {
    state: State;
    dispatch: DispatchAction;
};
export {};

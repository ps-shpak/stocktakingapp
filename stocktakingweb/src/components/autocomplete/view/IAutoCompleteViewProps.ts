import { styles } from "./styles";
import { WithStyles } from "@material-ui/core";
import { ReactNode } from "react";
import { IGetUserData } from "../../../services";
import { SuggestionsFetchRequestedParams } from "react-autosuggest";

export interface IAutoCompleteViewProps extends WithStyles<typeof styles> {
    list: IGetUserData[];
    value: string;

    renderInput(): ReactNode;

    renderSuggestion(suggestion: IGetUserData, params: {query: string; isHighlighted: boolean}): ReactNode;

    getSuggestionValue(suggestion: IGetUserData): string;

    onSuggestionsFetchRequested(params: SuggestionsFetchRequestedParams): void;

    onSuggestionsClearRequested(): void;
}

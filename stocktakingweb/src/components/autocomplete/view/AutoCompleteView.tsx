import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { IAutoCompleteViewProps } from "./IAutoCompleteViewProps";
import Autosuggest from "react-autosuggest";

export const AutoCompleteView = withStyles(styles)(
    class extends Component<IAutoCompleteViewProps> {

        render(): ReactNode {
            return (
                <div className={this.props.classes.autoComplete}>
                    <Autosuggest
                        renderInputComponent={this.props.renderInput}
                        renderSuggestion={this.props.renderSuggestion}
                        suggestions={this.props.list}
                        onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                        getSuggestionValue={this.props.getSuggestionValue}
                        inputProps={{
                            value: this.props.value,
                            onChange: () => {return; }
                        }}
                        theme={{
                            container: this.props.classes.container,
                            suggestionsContainerOpen: this.props.classes.suggestionsContainerOpen,
                            suggestionsList: this.props.classes.suggestionsList,
                            suggestion: this.props.classes.suggestion
                        }}
                    />
                </div>
            );
        }
    }
);

import * as React from "react";
import { ChangeEvent, Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IAutoCompleteProps } from "./IAutoCompleteProps";
import { EInputFieldVariants } from "../input-field";
import { AutoCompleteStore } from "./AutoCompleteStore";
import { IGetUserData } from "../../services";
import * as Autocomplete from "react-autocomplete";
import { ListItem, Paper, TextField } from "@material-ui/core";
import * as uuid from "uuid";
import { Scrollbar } from "../scrollbar";

@observer
@autobind
export class AutoComplete extends Component<IAutoCompleteProps> {
    private readonly store = new AutoCompleteStore();

    componentDidMount(): void {
        this.store.list = this.props.list;
    }

    componentWillReceiveProps(nextProps: Readonly<IAutoCompleteProps>): void {
        this.store.list = nextProps.list;
    }

    render(): ReactNode {
        return (
            <Autocomplete
                value={this.store.value}
                items={this.store.list}
                // renderInput={this.renderInputField}
                onChange={this.onChangeAutoComplete}
                renderItem={this.renderItem}
                getItemValue={this.getItemValue}
                onSelect={this.onSelect}
                renderMenu={this.renderMenu}
                sortItems={this.sortStates}
                shouldItemRender={this.matchStateToTerm}
            />
        );
    }

    renderInputField(): ReactNode {
        return (
            <TextField
                label={this.props.placeholder}
                fullWidth={true}
                variant={EInputFieldVariants.OUTLINED}
                onChange={this.onChange}
                defaultValue={this.store.value}
            />
        );
    }

    renderMenu(items: ReactNode[], value: string): ReactNode {
        return (
                <Paper>
                    <Scrollbar>
                        {items}
                    </Scrollbar>
                </Paper>

        );
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        this.store.value = event.target.value;
    }

    private onChangeAutoComplete(event: ChangeEvent<HTMLInputElement>, value: string): void {
        this.onChange(event);
    }

    private renderItem(item: IGetUserData, isHighlighted: boolean): ReactNode {
        return (
            <ListItem button={true} selected={isHighlighted} key={uuid.v4()}>
                {item.name}
            </ListItem>
        );
    }

    private getItemValue(item: IGetUserData): string {
        return item.name;
    }

    private onSelect(value: string, item: IGetUserData): void {
        this.store.value = value;
        this.props.onSelect(item);
    }

    private matchStateToTerm(item: IGetUserData, value: string): boolean {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }

    private sortStates(a: IGetUserData, b: IGetUserData, value: string): number {
        const aLower = a.name.toLowerCase();
        const bLower = b.name.toLowerCase();
        const valueLower = value.toLowerCase();
        const queryPosA = aLower.indexOf(valueLower);
        const queryPosB = bLower.indexOf(valueLower);
        if (queryPosA !== queryPosB) {
            return queryPosA - queryPosB;
        }
        return aLower < bLower ? -1 : 1;
    }
}

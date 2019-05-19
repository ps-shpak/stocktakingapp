import * as React from "react";
import { ChangeEvent, Component, ReactNode, HTMLProps } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IAutoCompleteProps } from "./IAutoCompleteProps";
import { AutoCompleteStore } from "./AutoCompleteStore";
import { IGetUserData } from "../../services";
import * as Autocomplete from "react-autocomplete";
import { ListItem, Paper } from "@material-ui/core";
import * as uuid from "uuid";
import { Scrollbar } from "../scrollbar";
import { AutoCompleteInput } from "./input";
import { Field, IInputField } from "../field";
import { EFormTypes } from "../../config";

@observer
@autobind
export class AutoComplete extends Component<IAutoCompleteProps> {
    protected readonly initField: IInputField = {
        id: uuid.v4(),
        type: this.props.type || EFormTypes.TEXT,
        value: this.props.value || "",
        placeholder: this.props.placeholder,
        isValid: false,
        isError: false
    };
    private readonly field = new Field(this.initField);
    private readonly store = new AutoCompleteStore();

    componentDidMount(): void {
        this.props.addField(this.field);
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
                renderInput={this.renderInput}
                onChange={this.onChangeAutoComplete}
                renderItem={this.renderItem}
                getItemValue={this.getItemValue}
                onSelect={this.onSelect}
                renderMenu={this.renderMenu}
                sortItems={this.sortStates}
                shouldItemRender={this.matchStateToTerm}
                wrapperStyle={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 20,
                    position: "relative"
                }}
                inputProps={{
                    style: {
                        width: "fillAvailable",
                        padding: "18.5px 14px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: 4,
                    },
                    placeholder: "Ответственный",
                    value: this.field.getValue()
                }}
            />
        );
    }

    renderInput(props: HTMLProps<HTMLInputElement>): ReactNode {
        return (
            <AutoCompleteInput props={props}  placeholder={"Ответственный"}/>
        );
    }

    renderMenu(items: ReactNode[], value: string): ReactNode {
        return (
                <Paper style={{position: "absolute", top: 54, background: "#fff", zIndex: 5, width: "100%"}}>
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
                {item.name} ({item.email})
            </ListItem>
        );
    }

    private getItemValue(item: IGetUserData): string {
        return `${item.name} (${item.email})`;
    }

    private onSelect(value: string, item: IGetUserData): void {
        this.store.value = value;
        this.props.onSelect(item);
        this.props.onChange(this.field.getId(), item.id);
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

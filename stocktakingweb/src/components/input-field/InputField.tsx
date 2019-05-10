import * as React from "react";
import { ChangeEvent, Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IInputFieldProps } from "./IInputFieldProps";
import { Field, IInputField } from "../field";
import * as uuid from "uuid";
import { EFormTypes } from "../../config";
import { InputFieldView } from "./view";

@observer
@autobind
export class InputField extends Component<IInputFieldProps> {
    protected readonly initField: IInputField = {
        id: uuid.v4(),
        type: this.props.type || EFormTypes.TEXT,
        value: this.props.value || "",
        placeholder: this.props.placeholder,
        isValid: false,
        isError: false
    };
    private readonly field = new Field(this.initField);

    componentDidMount(): void {
        this.props.addField(this.field);
    }

    render(): ReactNode {
        return (
            <InputFieldView
                type={this.field.getType()}
                placeholder={this.field.getPlaceholder()}
                isReadonly={this.props.isReadonly || false}
                isRequired={this.props.isRequired || false}
                value={this.field.getValue()}
                onChange={this.onChange}
                maxLength={this.props.maxLength || 255}
            />
        );
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        this.field.setValue(event.target.value);
        this.props.onChange(this.field.getId(), this.field.getValue());
    }
}

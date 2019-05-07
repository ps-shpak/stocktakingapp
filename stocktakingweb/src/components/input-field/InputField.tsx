import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IInputFieldProps } from "./IInputFieldProps";
import { Field, IInputField } from "../field";
import * as uuid from "uuid";
import { EFormTypes } from "../../config";

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
    protected readonly field = new Field(this.initField);

    componentDidMount(): void {
        this.props.addField(this.field);
    }

    render(): ReactNode {
        return (
            <div>1</div>
        );
    }
}

import { autobind } from "core-decorators";
import { IInputField } from "./IInputField";
import { observable } from "mobx";
import { EFormTypes } from "../../config";

@autobind
export class Field {
    @observable private readonly field: IInputField;

    constructor(field: IInputField) {
        this.field = field;
    }

    setValue(value: string): void {
        this.field.value = value;
    }

    getValue(): string {
        return this.field.value;
    }

    getType(): EFormTypes {
        return this.field.type;
    }

    getId(): string {
        return this.field.id;
    }

    setErrorState(value: boolean): void {
        this.field.isError = value;
    }

    getErrorState(): boolean {
        return this.field.isError;
    }

    getPlaceholder(): string {
        return this.field.placeholder;
    }

    setValidState(value: boolean): void {
        this.field.isValid = value;
    }

    getValidState(): boolean {
        return this.field.isValid;
    }

    reset(): void {
        this.setValue("");
        this.setErrorState(false);
        this.setValidState(false);
    }
}

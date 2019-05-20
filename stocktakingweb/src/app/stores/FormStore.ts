import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Field } from "../../components/field";
import { EFormTypes, RegexpConfig } from "../../config";
import { head } from "lodash";
import { Store } from "./Store";
import { FieldErrors, IServerError } from "../../errors";
import { AxiosError, AxiosResponse } from "axios";

interface IFieldsArray {
    field: Field;
    index: number;
}

@autobind
export class FormStore extends Store {
    @observable isDataChanged = false;
    @observable private readonly fields: IFieldsArray[] = [];

    addField(field: Field): void {
        this.fields.push({field, index: this.fields.length});
    }

    getFieldValues(): string[] {
        const values: string[] = [];
        this.fields.map((fieldArray: IFieldsArray) => {
            values.push(fieldArray.field.getValue());
        });
        return values;
    }

    onChange(id: string, value: string): void {
        const field = this.getFieldById(id);
        field.setValue(value);
        const type = field.getType();
        field.setValidState(this.getValidationFunction(value, type));
        this.isDataChanged = true;
    }

    onFocus(): void {
        this.fields.map((item: IFieldsArray) => {
            item.field.setValidState(this.getValidationFunction(item.field.getValue(), item.field.getType()));
        });
    }

    getFieldById(id: string): Field {
        const fields = this.fields.filter((data: IFieldsArray) => {
            return data.field.getId() === id;
        });
        return head(fields)!.field;
    }

    getFieldByType(type: EFormTypes): Field {
        const fields = this.fields.filter((data: IFieldsArray) => {
            return data.field.getType() === type;
        });
        return head(fields)!.field;
    }

    isFormValid(): boolean {
        return this.fields.every((data) => {
            return data.field.getValidState();
        });
    }

    resetFields(): void {
        this.fields.length = 0;
    }

    onOpenForm(): void {
        this.isFormVisible = true;
    }

    onCloseForm(): void {
        this.isFormVisible = false;
        this.resetFields();
    }

    protected setServerError(error: IServerError): void {
        const typeField = FieldErrors.getTypeByCode(error.code);
        const field = this.getFieldByType(typeField);
        if (!field) {
            return;
        }
        field.setErrorState(true);
        field.setValidState(false);
        field.setPlaceholder(error.error);
    }

    protected getServerError(error: AxiosError): IServerError | undefined {
        const response = error.response as AxiosResponse<IServerError>;
        if (!response) {
            return undefined;
        }
        return response.data;
    }

    private isTextValid(value: string): boolean {
        return value !== "";
    }

    private isEmailValid(value: string): boolean {
        const re = RegexpConfig.EMAIL;
        return re.test(value);
    }

    private getValidationFunction(value: string, type: EFormTypes): boolean {
        const validators = {
            text: this.isTextValid(value),
            email: this.isEmailValid(value),
            owner: this.isTextValid(value)
        };
        return validators[type];
    }
}

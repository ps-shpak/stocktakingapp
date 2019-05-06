import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Field } from "../../components/field";
import { EFormTypes, RegexpConfig } from "../../config";
import { head } from "lodash";

interface IFieldsArray {
    field: Field;
    index: number;
}

@autobind
export class FormStore {
    @observable private fields: IFieldsArray[] = [];

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
    }

    getFieldById(id: string): Field {
        const fields = this.fields.filter((data: IFieldsArray) => {
            return data.field.getId() === id;
        });
        return head(fields)!.field;
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
        };
        return validators[type];
    }
}

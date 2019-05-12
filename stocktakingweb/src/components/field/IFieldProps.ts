import { Field } from "./Field";

export interface IFieldProps {
    addField(field: Field): void;

    onChange(id: string, value: string): void;
}

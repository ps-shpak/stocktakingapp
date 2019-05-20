import { IFieldError } from "./IFieldError";
import { EFormTypes } from "../config";

// tslint:disable-next-line:no-unnecessary-class
export class FieldErrors {
    private static readonly errors: IFieldError[] = [
        {type: EFormTypes.EMAIL, codes: [6]}
    ];

    static getTypeByCode(code: number): EFormTypes {
        let type: EFormTypes = EFormTypes.TEXT;
        FieldErrors.errors.map((data: IFieldError) => {
            if (data.codes.indexOf(code) >= 0) {
                type = data.type;
            }
        });
        return type;
    }
}

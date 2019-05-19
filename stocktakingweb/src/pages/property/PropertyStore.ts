import { autobind } from "core-decorators";
import { FormStore } from "../../app/stores";
import { observable } from "mobx";
import { ICreateProductData, IGetUserData } from "../../services";
import { get } from "lodash";

@autobind
export class PropertyStore extends FormStore {
    @observable userList: IGetUserData[] = [];
    @observable activeUser: IGetUserData = {
        id: "",
        email: "",
        name: ""
    };

    onMount(): void {
        this.getUsers();
        this.getItems();
    }

    onSelectUser(user: IGetUserData): void {
        this.activeUser = user;
    }

    onSubmit(): void {
        if (this.isFormValid()) {
            const formData = this.getFieldValues();
            const data: ICreateProductData = {
                id: "",
                spec: {
                    category: formData[0],
                    owner_id: formData[1],
                    price: parseInt(formData[2], 10),
                    place: formData[3],
                    description: formData[4],
                    kind: "equipment"
                }
            };
            this.transport.createProduct(data).then(() => {
                this.onCloseForm();
                this.setVisibilityInfoPopup(true);
                this.getItems();
            });
        }
    }

    onCloseForm(): void {
        super.onCloseForm();
        this.clearUser();
    }

    private clearUser(): void {
        this.activeUser = {
            id: "",
            email: "",
            name: ""
        };
    }

    private getItems(): void {
        this.transport.getItems("ByCategory", "equipment")
            .then((response) => {
                console.log(response.data);
            });
    }

    private getUsers(): void {
        this.transport.getUserList().then((response) => {
            this.userList = get(response.data, "results");
        });
    }

}

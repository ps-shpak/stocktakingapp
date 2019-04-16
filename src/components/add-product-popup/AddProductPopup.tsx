import * as React from "react";
import { Component, ReactNode } from "react";
import { IAddProductPopupProps } from "./IAddProductPopupProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Popup } from "../popup";
import { AddProductPopupView } from "./view";

@observer
@autobind
export class AddProductPopup extends Component<IAddProductPopupProps> {
    render(): ReactNode {
        return (
            <Popup
                isVisible={this.props.isVisible}
                title={"Новый предмет"}
                onClose={this.props.onClose}
            >
                <AddProductPopupView />
            </Popup>
        );
    }
}

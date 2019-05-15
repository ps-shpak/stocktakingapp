import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { attempt } from "lodash";
import { autobind } from "core-decorators";
import { ConfirmPopupView } from "./view";
import { IConfirmPopupProps } from "./IConfirmPopupProps";
import { ConfirmPopupStore } from "./ConfirmPopupStore";

@observer
@autobind
export class ConfirmPopup extends Component<IConfirmPopupProps> {
    private readonly store = new ConfirmPopupStore();

    componentDidMount(): void {
        if (!this.props.isVisible) {
            return;
        }
        this.store.isVisible = this.props.isVisible;
    }

    componentWillReceiveProps(nextProps: Readonly<IConfirmPopupProps>): void {
        if (!nextProps.isVisible) {
            return;
        }
        this.store.isVisible = nextProps.isVisible;
    }

    setVisibility(value: boolean): void {
        this.store.isVisible = value;
    }

    render(): ReactNode {
        return (
            <ConfirmPopupView
                isVisible={this.store.isVisible}
                title={this.props.title}
                description={this.props.description}
                onClose={this.onClosePopup}
                onSubmit={this.props.onSubmit}
            />
        );
    }

    private onClosePopup(): void {
        attempt(this.props.onClose!);
    }
}

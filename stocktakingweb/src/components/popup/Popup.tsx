import * as React from "react";
import { IPopupProps } from "./IPopupProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { PopupStore } from "./PopupStore";
import { PopupView } from "./view";
import { attempt, isNil } from "lodash";

@observer
@autobind
export class Popup extends React.Component<IPopupProps> {
    protected readonly store = new PopupStore();

    componentDidMount(): void {
        if (isNil(this.props.isVisible)) {
            return;
        }
        this.store.isVisible = this.props.isVisible;
    }

    componentWillReceiveProps(nextProps: Readonly<IPopupProps>): void {
        if (isNil(nextProps.isVisible)) {
            return;
        }
        this.store.isVisible = nextProps.isVisible;
    }

    render(): React.ReactNode {
        return (
            <PopupView
                title={this.props.title}
                isVisible={this.store.isVisible}
                className={this.props.className}
                onClose={this.onClose}
                description={this.props.description}
            >
                {this.props.children}
            </PopupView>
        );
    }

    private onClose(): void {
        this.store.hide();
        attempt(this.props.onClose!);
    }
}

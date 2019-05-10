import * as React from "react";
import { IPopupProps } from "./IPopupProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { PopupStore } from "./PopupStore";
import { PopupView } from "./view";

@observer
@autobind
export class Popup extends React.Component<IPopupProps> {
    private readonly store = new PopupStore();

    componentDidMount(): void {
        this.store.isVisible = this.props.isVisible;
    }

    componentWillReceiveProps(nextProps: Readonly<IPopupProps>): void {
        this.store.isVisible = nextProps.isVisible;
    }

    render(): React.ReactNode {
        return (
            <PopupView
                title={this.props.title}
                isVisible={this.props.isVisible}
                className={this.props.className}
                onClose={this.props.onClose}
                description={this.props.description}
            >
                {this.props.children}
            </PopupView>
        );
    }
}

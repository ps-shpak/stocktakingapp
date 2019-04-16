import * as React from "react";
import { IPopupProps } from "./IPopupProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { PopupView } from "./view";
import { PopupStore } from "./PopupStore";

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
        return this.renderPopup();
    }

    private renderPopup(): React.ReactNode {
        if (this.store.isVisible) {
            return (
                <PopupView
                    title={this.props.title}
                    description={this.props.description}
                    onClose={this.props.onClose}
                >
                    {this.props.children}
                </PopupView>
            );
        } else {
            return <></>;
        }
    }
}

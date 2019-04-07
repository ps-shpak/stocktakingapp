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

    setVisibility(value: boolean): void {
        this.store.isVisible = value;
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
                />
            );
        } else {
            return <></>;
        }
    }
}

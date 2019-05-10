import * as React from "react";
import { IPopupProps } from "./IPopupProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { PopupStore } from "./PopupStore";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
            <Dialog open={this.store.isVisible} onClose={this.props.onClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.props.description &&
                        <DialogContentText>
                            {this.props.description}
                        </DialogContentText>
                    }
                    {this.props.children}
                </DialogContent>
            </Dialog>
        );
    }
}

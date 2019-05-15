import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { IConfirmPopupViewProps } from "./IConfirmPopupViewProps";
import { Button, EButtonColors, EButtonSize, EButtonVariant } from "../../button";
import { Popup } from "../../popup";

export const ConfirmPopupView = withStyles(styles)(
    class extends Component<IConfirmPopupViewProps> {
        render(): ReactNode {
            return (
                <Popup
                    isVisible={this.props.isVisible}
                    title={this.props.title}
                    description={this.props.description}
                    onClose={this.props.onClose}
                >
                    <div className={this.props.classes.content}>
                        <Button
                            title={"Отмена"}
                            onClick={this.props.onClose}
                            isDisable={false}
                            variant={EButtonVariant.OUTLINED}
                            size={EButtonSize.LARGE}
                            isFullWidth={false}
                            color={EButtonColors.PRIMARY}
                            className={this.props.classes.button}
                        />
                        <Button
                            title={"ОК"}
                            onClick={this.props.onSubmit}
                            isDisable={false}
                            variant={EButtonVariant.CONTAINED}
                            size={EButtonSize.LARGE}
                            isFullWidth={false}
                            color={EButtonColors.PRIMARY}
                            className={this.props.classes.button}
                        />
                    </div>
                </Popup>
            );
        }
    }
);

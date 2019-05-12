import * as React from "react";
import { ReactNode, Component } from "react";
import { IConfirmPopupProps } from "./IConfirmPopupProps";
import { Popup } from "../popup";
import { Button, EButtonColors, EButtonSize, EButtonVariant } from "../button";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";

export const ConfirmPopup = withStyles(styles)(
    class extends Component<IConfirmPopupProps> {
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

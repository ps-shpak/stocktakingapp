import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { IInfoPopupProps } from "./IInfoPopupProps";
import { Popup } from "../popup";
import { Button, EButtonColors, EButtonSize, EButtonVariant } from "../button";
import { attempt } from "lodash";

export const InfoPopup = withStyles(styles)(
    class extends Component<IInfoPopupProps> {
        render(): ReactNode {
            return (
                <Popup
                    isVisible={this.props.isVisible}
                    onClose={this.props.onClose}
                    title={this.props.title}
                    description={this.props.description}
                >
                    <div className={this.props.classes.content}>
                        <Button
                            title={"OK"}
                            isDisable={false}
                            onClick={this.onClose}
                            isFullWidth={false}
                            size={EButtonSize.LARGE}
                            variant={EButtonVariant.OUTLINED}
                            color={EButtonColors.PRIMARY}
                        />
                    </div>
                </Popup>
            );
        }

        private readonly onClose = (): void => {
            attempt(this.props.onClose!);
        }
    }
);

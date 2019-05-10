import * as React from "react";
import { Component, ReactNode } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { IDrawerWrapperProps } from "./IDrawerWrapperProps";
import { SwipeableDrawer } from "@material-ui/core";
import { Button, EButtonVariant } from "../button";

export const DrawerWrapper = withStyles(styles)(
    class extends Component<IDrawerWrapperProps> {
        render(): ReactNode {
            return (
                <SwipeableDrawer
                    open={this.props.isVisible}
                    onOpen={this.props.onOpen}
                    onClose={this.props.onClose}
                    anchor={"right"}
                >
                    <div className={this.props.classes.drawer}>
                        <div className={this.props.classes.title}>{this.props.title}</div>
                        {this.props.children}
                        <Button
                            title={this.props.buttonTitle}
                            onClick={this.props.onSubmit}
                            isDisable={this.props.isButtonDisable}
                            variant={EButtonVariant.TEXT}
                            isFullWidth={true}
                        />
                    </div>
                </SwipeableDrawer>
            );
        }
    }
);

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ILayoutProps } from "./ILayoutProps";
import { Button } from "../../components/button";
import { Preloader } from "../../components/preloader";

export const Layout = withStyles(styles)(
    class extends Component<ILayoutProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.userLayout}>
                    <div className={this.props.classes.header}>
                        <Button
                            title={this.props.buttonTitle}
                            onClick={this.props.onClick}
                            isDisable={false}
                        />
                    </div>
                    <div className={this.props.classes.content}>
                        {this.props.children}
                    </div>
                    {this.props.isPreloaderVisible &&
                    <Preloader />
                    }
                </div>
            );
        }
    }
);

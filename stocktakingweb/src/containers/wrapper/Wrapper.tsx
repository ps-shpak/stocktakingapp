import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IWrapperProps } from "./IWrapperProps";
import Helmet from "react-helmet";
import { AppBar, Typography } from "@material-ui/core";
import { Scrollbar } from "../../components/scrollbar";

export const Wrapper = withStyles(styles)(
    class extends Component<IWrapperProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper}>
                    <Helmet>
                        <title>{this.props.title}</title>
                    </Helmet>
                    <AppBar
                        position={"fixed"}
                        className={this.props.classes.appBar}
                    >
                        <Typography variant="h6" color="inherit" noWrap={true}>
                            {this.props.title}
                        </Typography>
                    </AppBar>
                    <div className={this.props.classes.content}>
                        <Scrollbar maxHeight={"100%"}>
                            {this.props.children}
                        </Scrollbar>
                    </div>
                </div>
            );
        }
    }
);

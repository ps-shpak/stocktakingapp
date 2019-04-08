import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ILogoProps } from "./ILogoProps";
import { Link } from "react-router-dom";
import { EPaths } from "../../config";
import { isNil } from "lodash";
import * as cn from "classnames";

export const Logo = withStyles(styles)(
    class extends Component<ILogoProps> {
        private readonly defaultTitle = "ООО Циркон-Медиа";

        render(): ReactNode {
            const className = cn(this.props.classes.logo, this.props.className);
            return (
                <Link to={EPaths.MAIN} className={className}>{this.getTitle()}</Link>
            );
        }

        private getTitle(): string {
            return isNil(this.props.title) ? this.defaultTitle : this.props.title;
        }
    }
);

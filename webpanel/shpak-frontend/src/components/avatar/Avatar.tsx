import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IAvatarProps } from "./IAvatarProps";
import { onImageLoadErrorFun } from "../../utils";
import { isNil } from "lodash";
import { Nullable } from "../../config";
import * as cn from "classnames";

const defaultAvatar = require("./img/default-avatar.jpeg");
const onAvatarError = onImageLoadErrorFun(defaultAvatar);

export const Avatar = withStyles(styles)(
    class extends Component<IAvatarProps> {
        render(): ReactNode {
            return (
                <div className={cn(this.props.classes.avatar, this.props.className)}>
                    <img
                        src={this.getAvatarLink(this.props.src)}
                        alt={this.props.name}
                        className={this.props.classes.avatarImage}
                        onError={onAvatarError}
                    />
                    <span className={this.props.classes.name}>{this.props.name}</span>
                </div>
            );
        }

        private getAvatarLink(src: Nullable<string>): string {
            return isNil(src) ? defaultAvatar : src;
        }
    }
);

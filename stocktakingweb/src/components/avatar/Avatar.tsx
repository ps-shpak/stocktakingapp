import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IAvatarProps } from "./IAvatarProps";
import { onImageLoadErrorFun } from "../../utils";
import { isNil } from "lodash";
import { Nullable } from "../../config";
import { Avatar as MaterialAvatar, Typography } from "@material-ui/core";

const defaultAvatar = require("./img/default-avatar.jpeg");
const onAvatarError = onImageLoadErrorFun(defaultAvatar);

export const Avatar = withStyles(styles)(
    class extends Component<IAvatarProps> {
        render(): ReactNode {
            return (
                <div>
                    <MaterialAvatar
                        onError={onAvatarError}
                        src={this.getAvatarLink(this.props.src)}
                        className={this.props.className}
                    />
                    <Typography>{this.props.name}</Typography>
                </div>

            );
        }

        private getAvatarLink(src: Nullable<string>): string {
            return isNil(src) ? defaultAvatar : src;
        }
    }
);

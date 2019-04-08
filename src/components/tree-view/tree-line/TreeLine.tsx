import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ITreeLineProps } from "./ITreeLineProps";
import cn from "classnames";
import { ITreeItem } from "../../tree";

export const TreeLine = withStyles(styles)(
    class extends Component<ITreeLineProps> {
        render(): ReactNode {
            const data = this.props.data;
            const arrowClassName = cn(this.props.classes.arrow, data.isActive && this.props.classes.opened);
            return (
                <div className={this.props.classes.line}>
                    {data.options && <div className={arrowClassName} />}
                    <input
                        type="checkbox"
                        className={this.props.classes.checkbox}
                        onChange={this.onChangeCheckbox}
                        checked={data.isActive}
                    />
                    <div className={this.props.classes.title}>{data.title}</div>
                    {data.isActive &&
                        <div className={this.props.classes.children}>
                            {this.getChildren()}
                        </div>
                    }
                </div>
            );
        }

        private readonly onChangeCheckbox = (): void => {
            this.props.onChangeActive(this.props.data);
        }

        private getChildren(): ReactNode {
            if (!this.props.data.options) {
                return <></>;
            }
            return this.props.data.options.map((option: ITreeItem) => {
               return <TreeLine data={option} onChangeActive={this.props.onChangeActive} key={option.id} />;
            });
        }
    }
);

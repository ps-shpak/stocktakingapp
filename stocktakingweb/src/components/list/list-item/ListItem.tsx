import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IListItemProps } from "./IListItemProps";

export const ListItem = withStyles(styles)(
    class extends Component<IListItemProps> {
        render(): ReactNode {
            const props = this.props;
            return (
                <div className={this.props.classes.listItem}>
                    <div className={this.props.classes.index}>{props.index + 1}.</div>
                    <div className={this.props.classes.title}>{props.data.name} {props.data.email && ` (${props.data.email})`}</div>
                    <div className={this.props.classes.right}>
                        <div className={this.props.classes.button} onClick={this.onEdit}>Редактировать</div>
                        <div className={this.props.classes.button} onClick={this.onDelete}>Удалить</div>
                    </div>
                </div>
            );
        }

        private readonly onEdit = (): void => {
            const id = this.props.data.id;
            this.props.onEditItem(id);
        }

        private readonly onDelete = (): void => {
            const id = this.props.data.id;
            this.props.onDeleteItem(id);
        }
    }
);

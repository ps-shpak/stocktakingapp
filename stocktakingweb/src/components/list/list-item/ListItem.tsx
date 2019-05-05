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
                    <div className={this.props.classes.title}>{props.data.title}</div>
                    <div className={this.props.classes.right}>
                        <div className={this.props.classes.button} onClick={this.onView}>Просмотр</div>
                        <div className={this.props.classes.button} onClick={this.onEdit}>Редактировать</div>
                        <div className={this.props.classes.button} onClick={this.onDelete}>Удалить</div>
                    </div>
                </div>
            );
        }

        private readonly onEdit = (): void => {
            const index = this.props.index;
            this.props.onEditItem(index);
        }

        private readonly onDelete = (): void => {
            const index = this.props.index;
            this.props.onDeleteItem(index);
        }

        private readonly onView = (): void => {
            console.log("view");
        }
    }
);

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IListProps } from "./IListProps";
import { IListItem } from "./IListItem";
import { ListItem } from "./list-item";
import { isEmpty } from "lodash";

export const List = withStyles(styles)(
    class extends Component<IListProps> {
        render(): ReactNode {
            const props = this.props;
            return (
                <div className={this.props.classes.list}>
                    {props.list.map((item: IListItem, index: number) => {
                        return (
                            <ListItem
                                key={item.id}
                                data={item}
                                index={index}
                                onEditItem={props.onEditItem}
                                onDeleteItem={props.onDeleteItem}
                            />
                        );
                    })}
                    {isEmpty(props.list) && <div className={this.props.classes.empty}>{props.emptyListMessage}</div>}
                </div>
            );
        }
    }
);

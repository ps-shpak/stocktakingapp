import * as React from "react";
import { Component, ReactNode, createElement } from "react";
import { IMenuLineProps } from "./IMenuLineProps";
import { autobind } from "core-decorators";
import { Collapse, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { isEmpty, attempt } from "lodash";
import { observer } from "mobx-react";
import { IMenuItem } from "../../containers/menu";

@observer
@autobind
export class MenuLine extends Component<IMenuLineProps> {
    private static getArrowIcon(predicate: boolean): ReactNode {
        return predicate ? <ExpandLess /> : <ExpandMore />;
    }

    render(): ReactNode {
        const data = this.props.line;
        return (
            <>
                <ListItem
                    button={true}
                    onClick={() => this.onClick(data.onClick)}
                    selected={data.isActive}
                >
                    {data.icon &&
                        <ListItemIcon>
                            {createElement(data.icon, {})}
                        </ListItemIcon>}
                    <ListItemText primary={data.title} />
                    {!isEmpty(data.options) && MenuLine.getArrowIcon(data.isActive)}
                </ListItem>
                {data.options &&
                    <Collapse in={!!(data.isActive && data.options)} timeout={"auto"}>
                        <List>
                            {data.options.map((subItem: IMenuItem, subIndex: number) => {
                                return (
                                    <ListItem button={true} key={subIndex} style={{paddingLeft: 40}}>
                                        {subItem.icon &&
                                            <ListItemIcon>
                                                {createElement(subItem.icon, {})}
                                            </ListItemIcon>}
                                        <ListItemText inset={true} primary={subItem.title} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                }
            </>
        );
    }

    private onClick(callback?: () => void): void {
        attempt(callback!);
        const index = this.props.index;
        this.props.onOpen(index);
    }
}

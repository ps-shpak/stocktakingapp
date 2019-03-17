import * as React from "react";
import { Component, ReactNode } from "react";
import { MenuView } from "./view";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { MenuStore } from "./MenuStore";
import { toJS } from "mobx";

@observer
@autobind
export class Menu extends Component {
    private readonly store = new MenuStore();

    render(): ReactNode {
        return (
            <MenuView
                menuList={toJS(this.store.menuList)}
                openOptions={this.store.openOptions}
                changeActive={this.store.changeActiveMenuItem}
            />
        );
    }
}

import * as React from "react";
import { Component, ReactNode } from "react";
import { Wrapper } from "../../containers/wrapper";
import { Sidebar } from "../../containers/sidebar";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Dashboard } from "../../containers/dashboard";
import { MainStore } from "./MainStore";

@observer
@autobind
export class Main extends Component {
    private readonly store = new MainStore();

    render(): ReactNode {
        return (
            <Wrapper title={"Инвентаризация"}>
                <Sidebar
                    data={this.store.getMenuData()}
                    onOpenOptions={this.store.onOpenOptions}
                    onChangeActive={this.store.onChangeActiveMenuItem}
                />
                <Dashboard
                    tree={this.store.getTreeData()}
                    isTreeVisible={this.store.isTreeVisible}
                    onCloseTree={this.store.onCloseTree}
                />
            </Wrapper>
        );
    }
}

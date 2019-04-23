import * as React from "react";
import { Component, ReactNode } from "react";
import { Wrapper } from "../../containers/wrapper";
import { Sidebar } from "../../containers/sidebar";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Dashboard } from "../../containers/dashboard";
import { MainStore } from "./MainStore";
import { MainController } from "./MainController";

@observer
@autobind
export class Main extends Component {
    private readonly store = new MainStore();
    private readonly controller = new MainController(this.store);

    render(): ReactNode {
        return (
            <Wrapper title={"Инвентаризация"}>
                <Sidebar
                    data={this.controller.getMenuData()}
                    onOpenOptions={this.controller.onOpenOptions}
                    onChangeActive={this.controller.onChangeActiveMenuItem}
                />
                <Dashboard
                    tree={this.controller.getTreeData()}
                    isTreeVisible={this.store.isTreeVisible}
                    onCloseTree={this.controller.onCloseTree}
                />
            </Wrapper>
        );
    }
}

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

    componentDidMount(): void {
        this.controller.onMount();
    }

    render(): ReactNode {
        return (
                <Wrapper title={"Инвенторизация"}>
                    <Sidebar
                        data={this.controller.getMenuData()}
                        onOpenOptions={this.controller.onOpenOptions}
                        onChangeActive={this.controller.onChangeActiveMenuItem}
                        onChangePosition={this.controller.onChangePosition}
                    />
                    <Dashboard
                        tree={this.controller.getTreeData()}
                        position={this.controller.getPosition()}
                        isTreeVisible={this.store.isTreeVisible}
                    />
                </Wrapper>
        );
    }
}

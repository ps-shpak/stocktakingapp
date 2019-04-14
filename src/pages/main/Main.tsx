import * as React from "react";
import { Component } from "react";
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

    render(): React.ReactNode {
        return (
                <Wrapper title={"Инвенторизация"}>
                    <Sidebar
                        data={this.store.menuData}
                        onOpenOptions={this.controller.onOpenOptions}
                        onChangeActive={this.controller.onChangeActiveMenuItem}
                    />
                    <Dashboard />
                </Wrapper>
        );
    }
}

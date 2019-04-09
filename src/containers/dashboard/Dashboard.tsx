import * as React from "react";
import { Popup } from "../../components/popup";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import { DashboardController } from "./DashboardController";
import { Tree } from "../../components/tree";
import { toJS } from "mobx";

@observer
@autobind
export class Dashboard extends React.Component {
    private readonly store = new DashboardStore();
    private readonly controller = new DashboardController(this.store);

    componentDidMount(): void {
        this.controller.onMount();
    }

    render(): React.ReactNode {
        return (
            <>
                <Popup title={"123"} />
                <Tree
                    data={toJS(this.store.treeData)}
                    onChangeActive={this.controller.onChangeActive}
                    onOpen={this.controller.onOpenTree}
                />
            </>
        );
    }
}

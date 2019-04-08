import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import * as uuid from "uuid";
import { ITreeItem } from "../../components/tree";
import { findIndex } from "lodash";

@autobind
export class DashboardController {
    private readonly store: DashboardStore;

    constructor(store: DashboardStore) {
        this.store = store;
    }

    onMount(): void {
        this.generateDemoData();
    }

    onChangeActive(item: ITreeItem): void {
        const activeIndex = findIndex(this.store.treeData, (line) => line.id === item.id);
        this.store.treeData[activeIndex].isActive = !this.store.treeData[activeIndex].isActive;
    }

    private generateDemoData(): void {
        this.store.treeData = [
            {
                id: uuid.v4(),
                isActive: false,
                title: "maks",
                options: [
                    {
                        id: uuid.v4(),
                        isActive: false,
                        title: "maks",
                    },
                    {
                        id: uuid.v4(),
                        isActive: false,
                        title: "maks",
                    }
                ]
            },
            {
                id: uuid.v4(),
                isActive: false,
                title: "maks",
                options: [
                    {
                        id: uuid.v4(),
                        isActive: false,
                        title: "maks",
                    },
                    {
                        id: uuid.v4(),
                        isActive: false,
                        title: "maks",
                    }
                ]
            },
        ];
    }
}

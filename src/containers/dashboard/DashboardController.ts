import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import * as uuid from "uuid";
import { findIndex, range } from "lodash";
import { ITreeItem } from "../../components/tree";

@autobind
export class DashboardController {
    private readonly store: DashboardStore;

    constructor(store: DashboardStore) {
        this.store = store;
    }

    onMount(): void {
        this.generateDemoData();
    }

    onChangeActive(id: string): void {
        const activeIndex = this.getCurrentIndex(id);
        if (activeIndex === -1) {
            return;
        }
        const active = this.store.treeData[activeIndex];
        if (!active.children) {
            this.store.treeData[activeIndex].isActive = !this.store.treeData[activeIndex].isActive;
            return;
        }
        this.store.treeData[activeIndex].isActive = !this.store.treeData[activeIndex].isActive;
        active.children.map((childId: string) => {
            const currentIndex = this.getCurrentIndex(childId);
            this.store.treeData[currentIndex].isActive = this.store.treeData[activeIndex].isActive;
        });
    }

    private generateDemoData(): void {
        const tableId = uuid.v4();
        const chairId = uuid.v4();
        const tableChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        const chairChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        this.store.treeData = [
            {
                id: tableId,
                isActive: false,
                title: "Стол",
                children: tableChildren
            },
            {
                id: chairId,
                isActive: false,
                title: "Стул",
                children: chairChildren
            },
        ];
        range(tableChildren.length).map((_, index: number) => {
            const table: ITreeItem = {
               id: tableChildren[index],
               isActive: false,
               title: `Стол #${index + 1}`,
               parent: tableId
            };
            const chair: ITreeItem = {
                id: chairChildren[index],
                isActive: false,
                title: `Стул #${index + 1}`,
                parent: chairId,
            };
            this.store.treeData.push(table);
            this.store.treeData.push(chair);
        });
    }

    private getCurrentIndex(id: string): number {
        return findIndex(this.store.treeData, (line) => line.id === id);
    }
}

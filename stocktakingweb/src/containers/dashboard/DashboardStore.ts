import { autobind } from "core-decorators";
import { observable } from "mobx";
import { ITreeItem } from "../../components/tree";
import { AddProductStore } from "../../components/add-product-popup";
import { findIndex, range } from "lodash";
import * as uuid from "uuid";

@autobind
export class DashboardStore {
    @observable treeData: ITreeItem[] = [];
    @observable isTreeVisible = false;

    addProductStore: AddProductStore = new AddProductStore();

    onMount(): void {
        this.generateDemoData();
    }

    onChangeActive(id: string): void {
        const activeIndex = this.getCurrentIndex(id);
        if (activeIndex === -1) {
            return;
        }
        const active = this.treeData[activeIndex];
        if (!active.children) {
            this.treeData[activeIndex].isActive = !this.treeData[activeIndex].isActive;
            return;
        }
        this.treeData[activeIndex].isActive = !this.treeData[activeIndex].isActive;
        active.children.map((childId: string) => {
            const currentIndex = this.getCurrentIndex(childId);
            this.treeData[currentIndex].isActive = this.treeData[activeIndex].isActive;
        });
    }

    showAddProductPopup(): void {
        this.addProductStore.isPopupVisible = true;
    }

    private generateDemoData(): void {
        const tableId = uuid.v4();
        const chairId = uuid.v4();
        const tableChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        const chairChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        this.treeData = [
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
            this.treeData.push(table);
            this.treeData.push(chair);
        });
    }

    private getCurrentIndex(id: string): number {
        return findIndex(this.treeData, (line) => line.id === id);
    }
}

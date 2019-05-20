import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import { ITreeItem } from "../../components/tree";
import { AddProductStore } from "../../components/add-product-popup";
import { findIndex } from "lodash";
import { BackendClient, ItemKind, ItemGroupingMethod } from "src/api";

@autobind
export class DashboardStore {
    @observable treeData: ITreeItem[] = [];
    @observable isTreeVisible = false;

    addProductStore: AddProductStore = new AddProductStore();

    @action async reloadItems(kind: ItemKind, groupingMethod: ItemGroupingMethod): Promise<void> {
        const treeData = await this.loadItemTreeData(kind, groupingMethod);

        // NOTE: copy items instead of assignment to avoid clearing observables. {
        this.treeData.length = 0;
        for (const item of treeData) {
            this.treeData.push(item);
        }
        console.log("this.treeData", JSON.stringify(this.treeData, undefined, 2));
    }

    @action onChangeActive(id: string): void {
        const activeIndex = this.getItemIndexById(id);
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
            const currentIndex = this.getItemIndexById(childId);
            this.treeData[currentIndex].isActive = this.treeData[activeIndex].isActive;
        });
    }

    @action showAddProductPopup(): void {
        this.addProductStore.isPopupVisible = true;
    }

    private async loadItemTreeData(kind: ItemKind, groupingMethod: ItemGroupingMethod): Promise<ITreeItem[]> {
        const resGroups = await BackendClient.getInstance().listItems(kind, groupingMethod);
        const treeData: ITreeItem[] = [];
        for (const resGroup of resGroups) {
            const childrenIds: string[] = [];
            for (const resItem of resGroup.items) {
                childrenIds.push(resItem.id);
            }
            treeData.push({
                id: resGroup.name,
                title: resGroup.name,
                isActive: false,
                children: childrenIds,
            });
            for (const resItem of resGroup.items) {
                const itemTitle = `${resItem.displayName} (${resItem.ownerName})`;
                treeData.push({
                    id: resItem.id,
                    title: itemTitle,
                    isActive: false,
                    parent: resGroup.name,
                });
            }
        }
        return treeData;
    }

    private getItemIndexById(id: string): number {
        return findIndex(this.treeData, (item: ITreeItem) => item.id === id);
    }
}

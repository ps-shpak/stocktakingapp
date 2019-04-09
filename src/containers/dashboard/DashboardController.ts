import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import * as uuid from "uuid";
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

    onChangeActive(id: string): void {
        const activeIndex = findIndex(this.store.treeData, (line) => line.id === id);
        this.store.treeData[activeIndex].isActive = !this.store.treeData[activeIndex].isActive;
    }

    onOpenTree(id: string): void {
        return;
    }

    private generateDemoData(): void {
        const tableId = uuid.v4();
        const chairId = uuid.v4();
        const tableChildren = [uuid.v4(), uuid.v4()];
        const chairChildren = [uuid.v4(), uuid.v4()];
        this.store.treeData = [
            {
                id: tableId,
                isActive: false,
                title: "Стол",
                children: tableChildren
            },
            {
                id: uuid.v4(),
                isActive: false,
                title: `Стол ${uuid.v4()} Иванов И.`,
                parent: tableId,
            },
            {
                id: uuid.v4(),
                isActive: false,
                title: `Стол ${uuid.v4()} Иванов А.`,
                parent: tableId
            },
            {
                id: chairId,
                isActive: false,
                title: "Стул",
                children: chairChildren
            },
            {
                id: uuid.v4(),
                isActive: false,
                title: `Стул ${uuid.v4()} Иванов И.`,
                parent: chairId
            },
            {
                id: uuid.v4(),
                isActive: false,
                title: `Стул ${uuid.v4()} Иванов А.`,
                parent: chairId
            }
        ];
    }
}

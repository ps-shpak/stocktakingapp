import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IMenuProps } from "./IMenuProps";
import { SyntheticEvent } from "react";

@observer
@autobind
export class Menu extends Component<IMenuProps> {
    render(): ReactNode {
        return (
            <div>123</div>
        );
    }

    onClick(event: SyntheticEvent<HTMLDivElement>, rowIndex: number, subrowIndex: number): void {
        return;
    }
}

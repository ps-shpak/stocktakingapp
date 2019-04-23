import * as React from "react";
import { Component, ReactNode } from "react";
import { MenuView } from "./view";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IMenuProps } from "./IMenuProps";
import { SyntheticEvent } from "react";

@observer
@autobind
export class Menu extends Component<IMenuProps> {
    render(): ReactNode {
        return (
            <MenuView
                menuList={this.props.data}
                openOptions={this.props.onOpenOptions}
                onClickMenuItem={this.onClick}
            />
        );
    }

    private onClick(event: SyntheticEvent<HTMLDivElement>, rowIndex: number, subrowIndex: number): void {
        this.props.onChangeActive(rowIndex, subrowIndex);
    }
}

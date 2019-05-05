import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { WrapperWithSidebar } from "../../containers/wrapper-with-sidebar";

@autobind
export class Users extends Component {
    render(): ReactNode {
        return (
            <WrapperWithSidebar title={"Пользователи"}>
                users
            </WrapperWithSidebar>
        );
    }
}

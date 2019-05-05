import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { Wrapper } from "../../containers/wrapper";

@autobind
export class Users extends Component {
    render(): ReactNode {
        return (
            <Wrapper title={"Пользователи"}>
                users
            </Wrapper>
        );
    }
}

import * as React from "react";
import { Component, ReactNode } from "react";
import { IPageProps } from "./IPageProps";
import Helmet from "react-helmet";

export class Page extends Component<IPageProps> {
    render(): ReactNode {
        return (
            <>
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
                {this.props.children}
            </>
        );
    }
}

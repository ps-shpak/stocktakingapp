import * as React from "react";
import { Component, ReactNode } from "react";
import { default as Scrollbars } from "react-custom-scrollbars";
import { IScrollbarProps } from "./IScrollbarProps";

export class Scrollbar extends Component<IScrollbarProps> {
    static readonly defaultProps: Readonly<IScrollbarProps> = {
        minHeight: 30,
        maxHeight: 380
    };

    render(): ReactNode {
        return (
            <Scrollbars
                autoHeight={true}
                hideTracksWhenNotNeeded={true}
                autoHeightMin={this.props.minHeight}
                autoHeightMax={this.props.maxHeight}
            >
                {this.props.children}
            </Scrollbars>
        );
    }
}

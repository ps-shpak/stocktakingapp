import * as React from "react";
import { Component, ReactNode } from "react";
import { default as Scrollbars } from "react-custom-scrollbars";

export class Scrollbar extends Component {
    render(): ReactNode {
        return (
            <Scrollbars
                autoHeight={true}
                hideTracksWhenNotNeeded={true}
                autoHeightMin={30}
                autoHeightMax={380}
            >
                {this.props.children}
            </Scrollbars>
        );
    }
}

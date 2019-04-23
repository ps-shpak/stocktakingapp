import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IDashboardViewProps } from "./IDashboardViewProps";
import { AddProductPopup } from "../../../components/add-product-popup";
import { Tree } from "../../../components/tree";
import { Button } from "../../../components/button";

export const DashboardView = withStyles(styles)(
    class extends Component<IDashboardViewProps> {
        render(): ReactNode {
            return (
                <>
                    <div className={this.props.classes.dashboard}>
                        <div className={this.props.classes.header}>
                            <Button
                                title={"Назначить"}
                                isDisable={false}
                                onClick={this.props.onOpenPopup}
                                className={this.props.classes.addButton}
                            />
                        </div>
                    </div>
                    <AddProductPopup
                        isVisible={this.props.isPopupVisible}
                        onClose={this.props.onClosePopup}
                    />
                    <Tree
                        data={this.props.treeData}
                        onChangeActive={this.props.onChangeActiveTree}
                        isVisible={this.props.isTreeVisible}
                        onCloseTree={this.props.onCloseTree}
                    />
                </>
            );
        }
    }
);

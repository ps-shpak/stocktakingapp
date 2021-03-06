import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IDashboardViewProps } from "./IDashboardViewProps";
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
                                title={"Добавить"}
                                isDisable={false}
                                onClick={this.props.showAddProductPopup}
                                className={this.props.classes.addButton}
                            />
                        </div>
                    </div>
                    {this.props.createAddProductPopup()}
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

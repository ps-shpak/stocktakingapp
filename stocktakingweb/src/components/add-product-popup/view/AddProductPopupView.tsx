import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import { IAddProductPopupViewProps } from "./IAddProductPopupViewProps";
import { Link } from "react-router-dom";
import { Button } from "../../button";

export const AddProductPopupView = withStyles(styles)(
    class extends Component<IAddProductPopupViewProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper}>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Категория</div>
                        <div className={this.props.classes.right}>
                            <input type="text" className={this.props.classes.input}/>
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Ответственный</div>
                        <div className={this.props.classes.right}>
                            <Link to={"/ivanov"}>Иван Иванов</Link>
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Цена в рублях</div>
                        <div className={this.props.classes.right}>
                            <input type="text" className={this.props.classes.input}/>
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Расположение</div>
                        <div className={this.props.classes.right}>
                            <input type="text" className={this.props.classes.input}/>
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Описание</div>
                    </div>
                    <div className={this.props.classes.line}>
                        <textarea className={this.props.classes.input} rows={4}  />
                    </div>
                    <div className={this.props.classes.footer}>
                        <Button
                            title={"Добавить"}
                            isDisable={false}
                            onClick={this.props.onSubmit}
                            className={this.props.classes.button}
                        />
                    </div>
                </div>
            );
        }
    }
);

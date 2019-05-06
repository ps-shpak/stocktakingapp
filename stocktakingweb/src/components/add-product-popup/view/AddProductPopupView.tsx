import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ReactNode, ChangeEvent } from "react";
import { styles } from "./styles";
import { IAddProductPopupViewProps } from "./IAddProductPopupViewProps";
import { Button } from "../../button";
import * as Autocomplete from "react-autocomplete";
import { AddProductPopupState } from "./AddProductPopupState";

export const AddProductPopupView = withStyles(styles)(
    class extends Component<IAddProductPopupViewProps, AddProductPopupState> {
        constructor(props: IAddProductPopupViewProps) {
            super(props);
            this.state = {
                category: "",
                ownerName: "",
                ownerId: "",
                place: "",
                price: "",
                description: "",
            };
        }

        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper}>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Категория</div>
                        <div className={this.props.classes.right}>
                            <input
                                autoFocus={true}
                                required={true}
                                type="text"
                                className={this.props.classes.input}
                                onChange={this.onChangeString.bind(this, "category")}
                            />
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Ответственный</div>
                        <div className={this.props.classes.right}>
                            <Autocomplete
                                getItemValue={(owner) => owner.name}
                                items={this.props.getAvailableOwners()}
                                renderItem={(owner, isHighlighted) =>
                                    <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
                                        {owner.name}
                                    </div>
                                }
                                value={this.state.ownerName}
                                onChange={(_, value) => this.setState({ownerName: value})}
                                onSelect={(value, owner) => this.setState({ownerName: value, ownerId: owner.id})}
                                sortItems={(a, b, _) => a.name.localeCompare(b.name)}
                            />
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Цена в рублях</div>
                        <div className={this.props.classes.right}>
                            <input
                                type="text"
                                className={this.props.classes.input}
                                placeholder="0.00"
                                pattern="\d+(\.\d{2}?)"
                                onChange={this.onChangeString.bind(this, "price")}
                            />
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Расположение</div>
                        <div className={this.props.classes.right}>
                            <input
                                type="text"
                                className={this.props.classes.input}
                                onChange={this.onChangeString.bind(this, "place")}
                            />
                        </div>
                    </div>
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.left}>Описание</div>
                    </div>
                    <div className={this.props.classes.line}>
                        <textarea
                            className={this.props.classes.input}
                            rows={4}
                            onChange={this.onChangeString.bind(this, "description")}
                        />
                    </div>
                    <div className={this.props.classes.footer}>
                        <Button
                            title={"Добавить"}
                            isDisable={false}
                            onClick={this.props.onSubmit.bind(this.props, this.state)}
                            className={this.props.classes.button}
                        />
                    </div>
                </div>
            );
        }

        onChangeString(name: string, event: ChangeEvent<HTMLInputElement>) {
            const data = {};
            data[name] = event.target.value;
            this.setState(data);
        }
    }
);

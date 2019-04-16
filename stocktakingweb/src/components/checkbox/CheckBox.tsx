import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { ICheckBoxProps } from "./ICheckBoxProps";
import cn from "classnames";

export const CheckBox = withStyles(styles)(
    class extends React.Component<ICheckBoxProps> {
        render() {
            const checkBoxClassName = cn(this.props.classes.checkbox, this.props.className);
            return (
                    <label className={checkBoxClassName}>
                        <input
                            type="checkbox"
                            onChange={this.props.onCheckboxChanged}
                            checked={this.props.isChecked}
                            className={this.props.classes.input}
                        />
                        <span className={this.props.classes.checkmark}/>
                    </label>
            );
        }
    }
);

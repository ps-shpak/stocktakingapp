import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    line: {
        minWidth: 150,
        marginBottom: 20
    },
    inner: {
        display: "flex"
    },
    arrow: {
        width: 20,
        height: 20,
        background: "url(/img/arrow.svg)",
        transition: "transform 0.3s ease"
    },
    opened: {
        transform: "rotate(90deg)",
        transition: "transform 0.3s ease"
    },
    checkbox: {

    },
    title: {

    },
    children: {
        "marginLeft": 30,
        "& $line": {
            marginBottom: 10
        }
    }
});

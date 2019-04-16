import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    line: {
        minWidth: 150,
        marginBottom: 20
    },
    inner: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10
    },
    arrow: {
        width: 15,
        height: 15,
        background: "url(/img/arrow.svg)",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        backgroundSize: "cover"
    },
    opened: {
        transform: "rotate(90deg)",
        transition: "transform 0.3s ease"
    },
    checkbox: {
        margin: "0 10px"
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

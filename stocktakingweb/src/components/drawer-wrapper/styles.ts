import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    drawer: {
        width: 700,
        padding: "40px 30px",
        position: "relative",
        height: "100%",
        boxSizing: "border-box"
    },
    title: {
        fontSize: 30,
    },
    button: {
        position: "absolute",
        bottom: 30,
        right: 30,
    },
    header: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        marginBottom: 20
    }
});

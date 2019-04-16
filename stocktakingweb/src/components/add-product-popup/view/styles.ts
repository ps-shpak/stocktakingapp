import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    wrapper: {
        position: "relative",
        width: 600
    },
    line: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20
    },
    left: {
        width: 200
    },
    right: {
        width: "100%",
        display: "flex"
    },
    input: {
        width: "100%",
        background: "#ccc",
        border: "1px solid #676767",
        padding: "5px 10px"
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        width: 200,
        background: "#27CA46",
        display: "flex",
        justifyContent: "center"
    }
});

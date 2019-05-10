import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    popup: {
        width: 600,
        maxHeight: 600,
    },
    content: {
        paddingTop: 10
    },
    title: {
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    close: {
        position: "absolute",
        right: 24,
        top: 12
    }
});

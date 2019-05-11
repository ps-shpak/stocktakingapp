import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    popup: {
        width: 600,
        maxHeight: 600,
    },
    content: {
        paddingTop: 10,
    },
    contentText: {
        marginBottom: 20
    },
    title: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        paddingBottom: 0,
    },
    titleInner: {
        position: "relative",
        display: "flex",
        width: "100%"
    },
    close: {
        position: "absolute",
        right: 24,
        top: 12
    },
    children: {
        display: "flex"
    },
});

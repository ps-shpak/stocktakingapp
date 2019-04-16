import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    overlay: {
        position: "fixed",
        left: 0,
        top: 0,
        background: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
        width: "100%",
        height: "100%"
    },
    popup: {
        padding: 20,
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        zIndex: 2,
        minWidth: 300
    },
    header: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        marginBottom: 20
    },
    title: {
        fontSize: 20
    },
    icon: {
        padding: "1px 3px",
        border: "1px solid #000",
        fontSize: 30,
        cursor: "pointer",
        lineHeight: "30px",
        fontWeight: 400,
        position: "absolute",
        right: 0
    },
    content: {

    }
});

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
    containerTable: {
        position: "fixed",
        zIndex: 2,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
    },
    containerCell: {
        "width": "100%",
        "text-align": "center",
    },
    popup: {
        display: "block",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: 20,
        zIndex: 2,
        width: 600,
        maxHeight: 600,
        background: "#fff",
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

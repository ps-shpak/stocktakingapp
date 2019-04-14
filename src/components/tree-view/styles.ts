import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    tree: {
        padding: 10,
        background: "#fff",
        border: "1px solid #ccc",
        width: 400,
        boxSizing: "border-box",
        maxHeight: 400,
        minHeight: 100,
        height: "fit-content",
        position: "absolute",
        zIndex: 5
    },
    overlay: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        background: "rgba(0, 0, 0, 0.3)"
    }
});

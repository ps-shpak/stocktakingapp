import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    wrapper: {
        width: "100%",
        height: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    preloader: {
        position: "fixed",
        left: "50%",
        top: "50%"
    }
});

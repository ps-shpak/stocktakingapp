import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    wrapper: {
       width: "calc(100% - 300px)",
       display: "flex",
       position: "relative",
        left: 300
    },
    appBar: {
        marginLeft: 300,
        width: "calc(100% - 300px)",
        padding: "10px 30px",
        background: "#2196f3"
    },
    content: {
        paddingTop: 52,
        width: "100%"
    }
});

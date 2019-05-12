import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    wrapper: {
       width: "calc(100% - 300px)",
       display: "flex",
       position: "relative"
    },
    appBar: {
        marginLeft: 300,
        width: "calc(100% - 300px)",
        padding: "10px 30px"
    },
    content: {
        paddingTop: 52
    }
});

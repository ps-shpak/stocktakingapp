import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
   sidebar: {
       width: 300,
       height: "100vh",
       padding: "20px 0",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       boxSizing: "border-box",
       borderRight: "1px solid rgba(0, 0, 0, 0.12)"
   },
    sidebarItem: {
       marginBottom: 10
    },
    divider: {
       width: "100%"
    }
});

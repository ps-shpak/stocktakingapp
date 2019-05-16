import createStyles from "@material-ui/core/styles/createStyles";

export const styles = createStyles({
    autoComplete: {
        height: 250
    },
    container: {
        position: "relative",
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: "block",
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
});

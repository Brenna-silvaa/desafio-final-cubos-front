import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "Nunito",
    fontSize: 18,
    backgroundColor: "#da0175",
    borderRadius: 10,
    minWidth: 160,
    color: "#f8f8f9",
    "&:hover": {
      backgroundColor: "#b60162",
    },
    whiteSpace: "nowrap",
  },
});

import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "Nunito",
    fontSize: 18,
    backgroundColor: "#F8F8F9",
    borderRadius: 10,
    minWidth: 230,
    color: "#0E8750",
    "&:hover": {
      backgroundColor: "#ededf2",
    },
    whiteSpace: "nowrap",
  },
});

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#b20a64",
      },
    },
  },
  input: {
    borderRadius: "8px",
    backgroundColor: "white",
    fontFamily: "Nunito",
    fontSize: 16,
  },
});

import { Button } from "@material-ui/core";
import useStyles from "./style";

function BotaoRosa({ children, onClick, disabled, comprido }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      style={comprido ? { width: 230 } : {}}
      variant="contained"
      onClick={onClick}
      size="small"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default BotaoRosa;

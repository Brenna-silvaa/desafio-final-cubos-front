import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { formatCurrencyInput } from "../../utils/formatCurrency";
import onlyNumbers from "../../utils/onlyNumbers";
import useStyles from "./style";

export default function InputGeral({
  name,
  value,
  placeholder,
  type,
  onChange,
  required,
  localErro,
  isStatic,
}) {
  const classes = useStyles();
  const [erro, setErro] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (localErro) {
      setErro(true);
      setHelperText(localErro);
      return;
    }
  }, [localErro]);

  function handleChange(e) {
    if (name === "currency") {
      let value = e.target.value;
      value = onlyNumbers(value);
      value = formatCurrencyInput(value);
      e.target.value = value;
    }
    onChange(e);

    setErro(false);
    setHelperText("");

    if (required && !e.target.value) {
      setErro(true);
      setHelperText("Este campo é obrigatório");
    }
  }

  /* function handleOnBlur(e) {
    if (required && !e.target.value) {
      setErro(true);
      setHelperText("Este campo é obrigatório");
    }
  } */

  return (
    <TextField
      className={classes.root}
      value={value}
      placeholder={placeholder}
      InputProps={{ className: classes.input }}
      size="small"
      variant="outlined"
      type={type ? type : "text"}
      onChange={!isStatic ? handleChange : null}
      error={erro}
      helperText={erro && helperText}
    />
  );
}

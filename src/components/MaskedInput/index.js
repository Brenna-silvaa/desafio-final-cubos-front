import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import onlyNumbers from "../../utils/onlyNumbers";
import useStyles from "./style";

export default function MaskedInput({
  currency,
  onChange,
  value,
  mask,
  erro,
  placeholder,
  required,
}) {
  const classes = useStyles();

  const [localErro, setLocalErro] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (erro) {
      setLocalErro(true);
      setHelperText(erro);
    }
  }, [erro]);

  function handleChange(e) {
    const eventFormatado = {
      ...e,
      target: { ...e.target, value: onlyNumbers(e.target.value) },
    };

    onChange(eventFormatado);

    setLocalErro(false);
    setHelperText("");

    if (required && !eventFormatado.target.value) {
      setLocalErro(true);
      setHelperText("Este campo é obrigatório");
    }
  }

  return (
    <InputMask onChange={handleChange} value={value} mask={mask}>
      {() => (
        <TextField
          className={classes.root}
          placeholder={placeholder}
          InputProps={{ className: classes.input }}
          size="small"
          variant="outlined"
          error={localErro}
          helperText={localErro && helperText}
        />
      )}
    </InputMask>
  );
}

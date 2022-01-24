import "./style.css";
import previstasImg from "../../assets/resumo-previstas-img.svg";
import pagasImg from "../../assets/resumo-pagas-img.svg";
import vencidasImg from "../../assets/resumo-vencidas-img.svg";
import { useGlobal } from "../../hooks/useGlobal";
import { useEffect, useState } from "react";
import filtrarCobrancas from "../../utils/filtrarCobrancas";
import { formatCurrency } from "../../utils/formatCurrency";

function ResumoCobrancas({ previstas, pagas, vencidas, titulo }) {
  const { listaCobrancas } = useGlobal();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let localCobrancas = [];
    if (previstas) {
      localCobrancas = filtrarCobrancas(listaCobrancas, "Pendente");
    } else if (pagas) {
      localCobrancas = filtrarCobrancas(listaCobrancas, "Paga");
    } else if (vencidas) {
      localCobrancas = filtrarCobrancas(listaCobrancas, "Vencida");
    }
    const valoresOnly = localCobrancas.map((cobranca) => cobranca.valor);
    if (valoresOnly.length) {
      const total = valoresOnly.reduce((total, curr) => total + curr);
      setTotal(total);
    }
    //eslint-disable-next-line
  }, [listaCobrancas]);

  return (
    <div
      className="resumo resumo-previstas"
      style={{
        backgroundColor: pagas ? "#eef6f6" : previstas ? "#fcf6dc" : "#ffefef",
      }}
    >
      <img
        src={pagas ? pagasImg : previstas ? previstasImg : vencidasImg}
        alt=""
        className="resumo--img"
      />
      <div className="resumo--container">
        <h1 className="resumo--titulo">{titulo}</h1>
        <span className="resumo--valor">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export default ResumoCobrancas;

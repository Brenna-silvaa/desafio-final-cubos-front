import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import filtrarCobrancas from "../../utils/filtrarCobrancas";
import { formatCurrency } from "../../utils/formatCurrency";
import { get } from "../../utils/requests";
import "./style.css";

function TabelaResumoCobrancas({ pagas, vencidas, previstas }) {
  const { token } = useAuth();
  const { setListaCobrancas, setListaCobrancasFiltradas } = useGlobal();
  const [localCobrancas, setLocalCobrancas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const { data: cobrancasAtualizadas } = await get("/cobrancas", token);
        setListaCobrancas(cobrancasAtualizadas);
        if (pagas) {
          const cobrancasPagas = filtrarCobrancas(cobrancasAtualizadas, "Paga");
          return setLocalCobrancas(cobrancasPagas);
        }
        if (vencidas) {
          const cobrancasVencidas = filtrarCobrancas(
            cobrancasAtualizadas,
            "Vencida"
          );
          return setLocalCobrancas(cobrancasVencidas);
        }
        if (previstas) {
          const cobrancasPrevistas = filtrarCobrancas(
            cobrancasAtualizadas,
            "Pendente"
          );
          return setLocalCobrancas(cobrancasPrevistas);
        }
      } catch (error) {}
    }
    getData();

    //eslint-disable-next-line
  }, []);

  function handleVerTodos() {
    if (pagas) {
      setListaCobrancasFiltradas(localCobrancas);
    } else if (vencidas) {
      setListaCobrancasFiltradas(localCobrancas);
    } else if (previstas) {
      setListaCobrancasFiltradas(localCobrancas);
    }

    navigate("/cobrancas");
  }

  return (
    <table className="cobrancas-resumo">
      <caption className="cobrancas-resumo--titulo">
        <div className="cobrancas-resumo--container">
          <span>
            {pagas && "Cobranças pagas"}
            {vencidas && "Cobranças vencidas"}
            {previstas && "Cobranças previstas"}
          </span>
          <span
            className="cobrancas-resumo--contagem"
            style={
              pagas
                ? { background: "#EEF6F6", color: "#1FA7AF" }
                : vencidas
                ? { background: "#FFEFEF", color: "#971D1D" }
                : { background: "#FCF6DC", color: "#C5A605" }
            }
          >
            {localCobrancas.length}
          </span>
        </div>
      </caption>
      <thead>
        <tr className="cobrancas-resumo--tr">
          <th className="cobrancas-resumo--th">Cliente</th>
          <th className="cobrancas-resumo--th">ID da cob.</th>
          <th className="cobrancas-resumo--th">Valor</th>
        </tr>
      </thead>
      <tbody>
        {localCobrancas.slice(0, 5).map((cobranca, index) => {
          return (
            <tr key={index} className="cobrancas-resumo--tr">
              <td className="cobrancas-resumo--td">{cobranca.cliente_nome}</td>
              <td className="cobrancas-resumo--td">{cobranca.id}</td>
              <td className="cobrancas-resumo--td">
                {formatCurrency(cobranca.valor)}
              </td>
            </tr>
          );
        })}
      </tbody>
      <caption onClick={handleVerTodos} className="cobrancas-resumo--footer">
        Ver todos
      </caption>
    </table>
  );
}

export default TabelaResumoCobrancas;

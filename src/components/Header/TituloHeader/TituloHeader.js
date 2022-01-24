import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./style.css";

function TituloHeader() {
  const { user_id } = useParams();
  const paginaAtual = window.location.pathname;
  if (paginaAtual === "/") {
    return <h1 className="titulo-header--home">Resumo das cobranças</h1>;
  }

  if (paginaAtual === "/clientes") {
    return (
      <div className="titulo-header--container">
        <span className="titulo-header--prev">Clientes</span>
      </div>
    );
  }

  if (paginaAtual === `/clientes/${user_id}`) {
    return (
      <div className="titulo-header--container">
        <Link to="/clientes" className="titulo-header--prev">
          Clientes
        </Link>
        <span>{">"}</span>
        <span>Detalhes do cliente</span>
      </div>
    );
  }
  return (
    <div className="titulo-header--container">
      <span className="titulo-header--prev">Cobranças</span>
    </div>
  );
}

export default TituloHeader;

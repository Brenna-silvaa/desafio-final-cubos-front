import { useNavigate } from "react-router";
import FileCinza from "../../assets/FileCinza.svg";
import FileRosa from "../../assets/FileRosa.svg";
import HomeCinza from "../../assets/HomeCinza.svg";
import HomeRosa from "../../assets/HomeRosa.svg";
import UsersCinza from "../../assets/UsersCinza.svg";
import UsersRosa from "../../assets/UsersRosa.svg";
import "./style.css";

function MenuLateral() {
  const paginaAtual = window.location.pathname;

  const navigate = useNavigate();
  return (
    <div className="menu-lateral nav-bar">
      <div className="itens-nav">
        <div
          className={`${paginaAtual === "/" ? "novo-button" : "button-nav"}`}
          onClick={() => navigate("/")}
        >
          <img
            width="42px"
            src={paginaAtual === "/" ? HomeRosa : HomeCinza}
            alt=""
          />
          <p>Home</p>
        </div>

        <div
          className={`${
            paginaAtual.includes("/clientes") ? "novo-button" : "button-nav"
          }`}
          onClick={() => navigate("/clientes")}
        >
          <img
            width="42px"
            src={paginaAtual.includes("/clientes") ? UsersRosa : UsersCinza}
            alt=""
          />
          <p>Clientes</p>
        </div>

        <div
          className={`${
            paginaAtual === "/cobrancas" ? "novo-button" : "button-nav"
          }`}
          onClick={() => navigate("/cobrancas")}
        >
          <img
            width="42px"
            src={paginaAtual === "/cobrancas" ? FileRosa : FileCinza}
            alt=""
          />
          <p>Cobranças</p>
        </div>
      </div>
    </div>
  );
}

export default MenuLateral;

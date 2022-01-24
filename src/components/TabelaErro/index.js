import "./style.css";
import lupa from "../../assets/lupaNotFound.svg";
import avatar from "../../assets/avatarNotFound.svg";

function TabelaErro() {
  return (
    <div className="tabela-erro">
      <div className="tabela-erro--container">
        <img className="tabela-erro--avatar" src={avatar} alt="" />
        <img src={lupa} alt="" />
      </div>
      <div className="tabela-erro--container2">
        <span>Nenhum resultado foi encontrado!</span>
        <span>Verifique se escrita está correta</span>
      </div>
    </div>
  );
}

export default TabelaErro;

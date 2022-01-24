import { useNavigate } from "react-router-dom";
import check from "../../assets/check.svg";
import confirmationImg from "../../assets/confirmation-img.svg";
import footerStepCheck from "../../assets/footer-step-check.svg";
import footerStep from "../../assets/footer-step.svg";
import line from "../../assets/line-green.svg";
import BotaoRosa from "../../components/BotaoRosa";
import "./style.css";

function Cadastro3() {
  const navigate = useNavigate();

  function handleGoToLogin() {
    navigate("/login");
  }

  return (
    <div className="background">
      <div className="background-left">
        <div className="check">
          <img src={check} alt="" />
          <img src={line} alt="" />
          <img src={check} alt="" />
          <img src={line} alt="" />
          <img src={check} alt="" />
        </div>
        <div className="container-info">
          <div className="info">
            <h1>Cadastre-se</h1>
            <p>Por favor, escreva seu nome e e-mail</p>
          </div>
          <div className="info">
            <h1>Escolha uma senha</h1>
            <p>Escolha uma senha segura</p>
          </div>
          <div className="info">
            <h1>Cadastro realizado com sucesso</h1>
            <p>E-mail e senha cadastrados com sucesso</p>
          </div>
        </div>
      </div>
      <div className="background-right-conclusao">
        <div className="container-confirmacao">
          <img src={confirmationImg} alt="check" />
          <h1 className="container-confirmacao--h1">
            Cadastro realizado com sucesso!
          </h1>
        </div>

        <BotaoRosa className="botao-login" onClick={handleGoToLogin}>
          Ir para Login
        </BotaoRosa>
        <div className="progresso">
          <img src={footerStep} alt="" />
          <img src={footerStep} alt="" />
          <img src={footerStepCheck} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro3;

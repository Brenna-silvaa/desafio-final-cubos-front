import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bolinhaBranca from "../../assets/bolinhaBranca.svg";
import bolinhaVerdeComCheck from "../../assets/bolinhaVerdeComCheck.svg";
import linhaBrancaHorizontal from "../../assets/linhaBrancaHorizontal.svg";
import linhaVerdeHorizontal from "../../assets/linhaVerdeHorizontal.svg";
import linhaVerde from "../../assets/linhaVerdeVertical.svg";
import BotaoRosa from "../../components/BotaoRosa";
import InputGeral from "../../components/InputGeral";
import { useAuth } from "../../hooks/useAuth";
import { notificacaoErro } from "../../utils/notificacao";
import { post } from "../../utils/requests";
import "../css/cadastro1e2.css";

function Cadastro1() {
  const navigate = useNavigate();
  const { setNovoUsuario } = useAuth();
  const [localInfo, setLocalInfo] = useState({
    nome: "",
    email: "",
  });
  const [localErro, setLocalErro] = useState("");

  function handleChangeNome(e) {
    setLocalInfo({ ...localInfo, nome: e.target.value });
  }

  function handleChangeEmail(e) {
    setLocalErro("");
    setLocalInfo({ ...localInfo, email: e.target.value });
  }

  async function handleContinuar() {
    try {
      await post("/validador", { email: localInfo.email });
      setNovoUsuario({ ...localInfo });
      navigate("/cadastro-2");
    } catch (error) {
      console.log(error.response);
      const { mensagem } = error.response.data;
      if (mensagem === "O e-mail informado já está em uso") {
        setLocalErro(mensagem);
        return;
      }
      if (mensagem === "email deve ser um email válido") {
        setLocalErro("O email deve ser um email válido");
        return;
      }
      notificacaoErro(mensagem);
    }
  }

  return (
    <div className="background">
      <div className="background-left">
        <div className="check">
          <img src={bolinhaVerdeComCheck} alt="" />
          <img src={linhaVerde} alt="" />
          <img src={bolinhaBranca} alt="" />
          <img src={linhaVerde} alt="" />
          <img src={bolinhaBranca} alt="" />
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
      <div className="background-right">
        <div className="background-right--container">
          <h1>Adicione seus dados</h1>
          <div className="nome">
            <label>Nome*</label>
            <InputGeral
              required
              placeholder="Digite seu nome"
              value={localInfo.nome}
              onChange={handleChangeNome}
            />
          </div>
          <div className="email">
            <label>Email*</label>
            <InputGeral
              required
              placeholder="Digite seu email"
              value={localInfo.email}
              type="email"
              onChange={handleChangeEmail}
              localErro={localErro}
            />
          </div>
          <BotaoRosa
            onClick={handleContinuar}
            disabled={!localInfo.nome || !localInfo.email}
          >
            Continuar
          </BotaoRosa>
          <span className="faca-login">
            Já possui uma conta? Faça seu
            <Link to="/login">Login</Link>
          </span>
        </div>
        <div className="progresso">
          <img src={linhaVerdeHorizontal} alt="" />
          <img src={linhaBrancaHorizontal} alt="" />
          <img src={linhaBrancaHorizontal} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro1;

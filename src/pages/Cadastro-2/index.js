import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bolinhaBranca from "../../assets/bolinhaBranca.svg";
import bolinhaVerde from "../../assets/bolinhaVerde.svg";
import bolinhaVerdeComCheck from "../../assets/bolinhaVerdeComCheck.svg";
import linhaBrancaHorizontal from "../../assets/linhaBrancaHorizontal.svg";
import linhaVerdeHorizontal from "../../assets/linhaVerdeHorizontal.svg";
import linhaVerde from "../../assets/linhaVerdeVertical.svg";
import BotaoRosa from "../../components/BotaoRosa";
import BotaoCinza from "../../components/BotaoCinza";
import InputSenha from "../../components/InputSenha";
import { useAuth } from "../../hooks/useAuth";
import { notificacaoErro } from "../../utils/notificacao";
import { post } from "../../utils/requests";
import "../css/cadastro1e2.css";

function Cadastro2() {
  const { novoUsuario, setNovoUsuario } = useAuth();
  const navigate = useNavigate();
  const [localSenha, setLocalSenha] = useState({
    senha: "",
    senhaConfirmacao: "",
  });

  const [localErro, setLocalErro] = useState("");

  function handleChangeSenha(e) {
    setLocalErro("");
    setLocalSenha({ ...localSenha, senha: e.target.value });
  }

  function handleChangeSenhaConfirmacao(e) {
    setLocalErro("");
    setLocalSenha({ ...localSenha, senhaConfirmacao: e.target.value });
  }

  function isCamposIncorretos() {
    return (
      !localSenha.senha ||
      !localSenha.senhaConfirmacao ||
      localSenha.senha !== localSenha.senhaConfirmacao
    );
  }
  async function handleCadastrar() {
    if (isCamposIncorretos()) return;
    const body = { ...novoUsuario, senha: localSenha.senha };
    try {
      await post("/usuario", body);
      setNovoUsuario({ ...novoUsuario, senha: localSenha.senha });
      navigate("/cadastro-3");
    } catch (error) {
      console.log(error.response);
      const { mensagem } = error.response.data;
      if (mensagem === "senha deve ser pelo menos 5 caracteres") {
        return setLocalErro("A senha deve ter pelo menos 5 catacteres");
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
          <img src={bolinhaVerde} alt="" />
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
          <h1>Escolha uma senha</h1>
          <div className="senha">
            <label>Senha*</label>
            <InputSenha
              required
              placeholder="Digite sua senha"
              value={localSenha.senha}
              onChange={handleChangeSenha}
              erro={localErro}
            />
          </div>
          <div className="repetir-senha">
            <label>Repita senha*</label>
            <InputSenha
              required
              placeholder="Confirme sua senha"
              value={localSenha.senhaConfirmacao}
              onChange={handleChangeSenhaConfirmacao}
              inputVerificacao
              senhaParaComparar={localSenha.senha}
              erro={localErro}
            />
          </div>
          <div className="background-right--botoes">
            <BotaoCinza width={160} onClick={() => navigate("/cadastro-1")}>
              Voltar
            </BotaoCinza>
            <BotaoRosa
              onClick={handleCadastrar}
              disabled={isCamposIncorretos()}
            >
              Cadastrar
            </BotaoRosa>
          </div>
          <span className="faca-login">
            Já possui uma conta? Faça seu
            <Link to="/login">Login</Link>
          </span>
        </div>
        <div className="progresso">
          <img src={linhaBrancaHorizontal} alt="" />
          <img src={linhaVerdeHorizontal} alt="" />
          <img src={linhaBrancaHorizontal} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro2;

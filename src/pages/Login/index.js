import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotaoRosa from "../../components/BotaoRosa";
import InputGeral from "../../components/InputGeral";
import InputSenha from "../../components/InputSenha";
import { useAuth } from "../../hooks/useAuth";
import { post } from "../../utils/requests";
import { notificacaoErro } from "../../utils/notificacao";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [localInfo, setLocalInfo] = useState({
    email: "",
    senha: "",
  });
  const [localErro, setLocalErro] = useState({
    email: "",
    senha: "",
  });

  function handleChangeEmail(e) {
    setLocalErro({ ...localErro, email: "" });
    setLocalInfo({ ...localInfo, email: e.target.value });
  }
  function handleChangeSenha(e) {
    setLocalInfo({ ...localInfo, senha: e.target.value });
    setLocalErro({ ...localErro, senha: "" });
  }

  function isCamposIncorretos() {
    return !localInfo.email || !localInfo.senha;
  }

  async function handleContinuar() {
    if (isCamposIncorretos()) return;
    try {
      const { data } = await post("/login", localInfo);
      setUser(data);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      const { mensagem } = error.response.data;
      if (mensagem === "email deve ser um email válido") {
        return setLocalErro({ ...localErro, email: mensagem });
      }
      if (mensagem === "senha deve ser pelo menos 5 caracteres") {
        return setLocalErro({
          ...localErro,
          senha: "A senha deve ter pelo menos 5 catacteres",
        });
      }
      notificacaoErro(mensagem);
    }
  }
  return (
    <div className="background">
      <div className="background-login-img">
        <div className="background-left-conteudo">
          <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
        </div>
      </div>
      <div className="background-right-login">
        <div className="container-input">
          <h1>Faça seu login!</h1>
          <div className="senha">
            <label>E-mail*</label>
            <InputGeral
              required
              value={localInfo.email}
              placeholder="Digite seu e-mail"
              onChange={handleChangeEmail}
              localErro={localErro.email}
            />
          </div>
          <div className="repetir-senha">
            <div className="a">
              <label>Senha</label>
              <Link to="#">Esqueceu a senha?</Link>
            </div>
            <InputSenha
              required
              value={localInfo.senha}
              placeholder="Digite sua senha"
              onChange={handleChangeSenha}
              erro={localErro.senha}
            />
          </div>
          <BotaoRosa disabled={isCamposIncorretos()} onClick={handleContinuar}>
            Entrar
          </BotaoRosa>
          <span className="cadastrar-text">
            Ainda não possui uma conta?
            <Link to="/cadastro-1">Cadastre-se</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

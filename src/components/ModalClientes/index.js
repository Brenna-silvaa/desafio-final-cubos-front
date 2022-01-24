import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import avatarCliente from "../../assets/cadastro-cliente-avatar.svg";
import close from "../../assets/close.svg";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import { notificacaoErro, notificacaoSucesso } from "../../utils/notificacao";
import { post, put } from "../../utils/requests";
import {
  isCepInvalid,
  isCpfOrTelRequiredInvalid,
} from "../../utils/validarDados";
import BotaoRosa from "../BotaoRosa";
import InputGeral from "../InputGeral";
import MaskedInput from "../MaskedInput";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ModalClientes() {
  const classes = useStyles();
  const { user_id } = useParams();
  const { token } = useAuth();
  const {
    openModalCliente,
    setOpenModalCliente,
    clienteAtual,
    atualizarCliente,
    atualizarClientes,
  } = useGlobal();

  const initialLocalInfo = {
    nome: !user_id ? "" : clienteAtual.nome,
    email: !user_id ? "" : clienteAtual.email,
    cpf: !user_id ? "" : clienteAtual.cpf,
    telefone: !user_id ? "" : clienteAtual.telefone,
    endereco: !user_id ? "" : clienteAtual.endereco,
    complemento: !user_id ? "" : clienteAtual.complemento,
    cep: !user_id ? "" : clienteAtual.cep,
    bairro: !user_id ? "" : clienteAtual.bairro,
    cidade: !user_id ? "" : clienteAtual.cidade,
    uf: !user_id ? "" : clienteAtual.uf,
  };

  const [localInfo, setLocalInfo] = useState({ ...initialLocalInfo });
  const [localErro, setLocalErro] = useState({
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
  });

  function handleClose() {
    setOpenModalCliente(false);
    setLocalInfo({ ...initialLocalInfo });
  }

  function handleChangeNome(e) {
    setLocalInfo({ ...localInfo, nome: e.target.value });
  }
  function handleChangeEmail(e) {
    setLocalErro({ ...localErro, email: "" });
    setLocalInfo({ ...localInfo, email: e.target.value });
  }
  function handleChangeCPF(e) {
    setLocalErro({ ...localErro, cpf: "" });
    setLocalInfo({ ...localInfo, cpf: e.target.value });
  }
  function handleChangeTelefone(e) {
    setLocalErro({ ...localErro, telefone: "" });
    setLocalInfo({ ...localInfo, telefone: e.target.value });
    console.log(e.target.value);
  }
  function handleChangeEndereco(e) {
    setLocalInfo({ ...localInfo, endereco: e.target.value });
  }
  function handleChangeComplemento(e) {
    setLocalInfo({ ...localInfo, complemento: e.target.value });
  }
  async function handleChangeCEP(e) {
    setLocalErro({ ...localErro, cep: "" });
    setLocalInfo({ ...localInfo, cep: e.target.value });
    if (e.target.value.length === 8) {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${e.target.value}/json/`
      );
      setLocalInfo((prev) => ({
        ...prev,
        endereco: data.logradouro,
        cidade: data.localidade,
        bairro: data.bairro,
        uf: data.uf,
      }));
    }
  }
  function handleChangeBairro(e) {
    setLocalInfo({ ...localInfo, bairro: e.target.value });
  }
  function handleChangeCidade(e) {
    setLocalInfo({ ...localInfo, cidade: e.target.value });
  }
  function handleChangeUF(e) {
    setLocalInfo({ ...localInfo, uf: e.target.value });
  }

  function isCamposIncorretos() {
    return (
      !localInfo.nome ||
      !localInfo.email ||
      !localInfo.cpf ||
      !localInfo.telefone
    );
  }

  async function handleSubmit() {
    if (isCamposIncorretos()) return;
    if (isCpfOrTelRequiredInvalid(localInfo.cpf)) {
      return setLocalErro({ ...localErro, cpf: "CPF inválido" });
    }
    if (isCpfOrTelRequiredInvalid(localInfo.telefone)) {
      return setLocalErro({ ...localErro, telefone: "Telefone inválido" });
    }
    if (isCepInvalid(localInfo.cep)) {
      return setLocalErro({ ...localErro, cep: "Cep inválido" });
    }
    try {
      if (!user_id) {
        await post("/cliente", localInfo, token);
        notificacaoSucesso("Cliente cadastrado com sucesso");
        atualizarClientes();
      } else {
        await put(`/cliente/${user_id}`, localInfo, token);
        notificacaoSucesso("Cliente editado com sucesso");
        atualizarCliente(user_id);
      }
      handleClose();
    } catch (error) {
      console.log(error.response);
      const { mensagem } = error.response.data;
      if (mensagem === "O email informado já foi cadastrado") {
        setLocalErro({ ...localErro, email: "E-mail já cadastrado" });
        return;
      }
      if (mensagem === "email deve ser um email válido") {
        setLocalErro((prev) => ({ ...prev, email: "E-mail não válido" }));
        return;
      }
      if (mensagem === "O cpf informado já foi cadastrado") {
        setLocalErro((prev) => ({ ...prev, cpf: "CPF já cadastrado" }));
        return;
      }
      !user_id
        ? notificacaoErro("Houve um erro ao cadastrar o cliente")
        : notificacaoErro("Houve um erro ao editar o cliente");
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={openModalCliente}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalCliente}>
        <div className="modal-cadastrar-cliente">
          <img
            className="editar--close"
            src={close}
            alt=""
            onClick={handleClose}
          />
          <div className="modal-cadastrar-cliente--top">
            <img src={avatarCliente} alt="" />
            <h1 className="modal-cadastrar-cliente--h1">
              {!user_id ? "Cadastro de cliente" : "Editar cliente"}
            </h1>
          </div>
          <div>
            <label>Nome*</label>
            <InputGeral
              required
              placeholder="Digite o nome"
              value={localInfo.nome}
              onChange={handleChangeNome}
            />
          </div>
          <div>
            <label>Email*</label>
            <InputGeral
              placeholder="Digite o email"
              value={localInfo.email}
              onChange={handleChangeEmail}
              localErro={localErro.email}
              required
            />
          </div>
          <div className="modal-cadastrar-cliente--container">
            <div>
              <label>CPF*</label>
              <MaskedInput
                mask="999.999.999-99"
                placeholder="Digite o CPF"
                value={localInfo.cpf}
                onChange={handleChangeCPF}
                erro={localErro.cpf}
                required
              />
            </div>
            <div>
              <label>Telefone*</label>
              <MaskedInput
                mask="(99)9 9999-9999"
                placeholder="Digite o telefone"
                type="number"
                value={localInfo.telefone}
                onChange={handleChangeTelefone}
                erro={localErro.telefone}
                required
              />
            </div>
          </div>
          <div>
            <label>Endereço</label>
            <InputGeral
              placeholder="Digite o endereço"
              type="text"
              value={localInfo.endereco}
              onChange={handleChangeEndereco}
            />
          </div>
          <div>
            <label>Complemento</label>
            <InputGeral
              placeholder="Digite o complemento"
              type="text"
              value={localInfo.complemento}
              onChange={handleChangeComplemento}
            />
          </div>
          <div className="modal-cadastrar-cliente--container">
            <div>
              <label>CEP</label>
              <MaskedInput
                mask="99.999-999"
                placeholder="Digite o CEP"
                value={localInfo.cep}
                onChange={handleChangeCEP}
                erro={localErro.cep}
              />
            </div>
            <div>
              <label>Bairro</label>
              <InputGeral
                placeholder="Digite o bairro"
                type="text"
                value={localInfo.bairro}
                onChange={handleChangeBairro}
              />
            </div>
          </div>
          <div className="cliente--cidade-uf">
            <div className="cidade">
              <label>Cidade</label>
              <InputGeral
                placeholder="Digite a cidade"
                type="text"
                value={localInfo.cidade}
                onChange={handleChangeCidade}
              />
            </div>
            <div>
              <label>UF</label>
              <InputGeral
                placeholder="Digite a UF "
                type="text"
                value={localInfo.uf}
                onChange={handleChangeUF}
              />
            </div>
          </div>
          <div className="btn-container">
            <button className="btn-cancelar" onClick={handleClose}>
              Cancelar
            </button>
            <BotaoRosa disabled={isCamposIncorretos()} onClick={handleSubmit}>
              Aplicar
            </BotaoRosa>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

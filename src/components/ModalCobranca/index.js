import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useParams } from "react-router";
import close from "../../assets/close.svg";
import fileCinza from "../../assets/FileCinza.svg";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import { formatCurrencyInput } from "../../utils/formatCurrency";
import { notificacaoErro, notificacaoSucesso } from "../../utils/notificacao";
import onlyNumbers from "../../utils/onlyNumbers";
import { post, put } from "../../utils/requests";
import BotaoRosa from "../BotaoRosa";
import InputGeral from "../InputGeral";
import InputStatus from "../InputStatus";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ModalCobranca() {
  const classes = useStyles();
  const { token } = useAuth();
  const { user_id } = useParams();
  const {
    openModalCobranca,
    setOpenModalCobranca,
    clienteAtual,
    atualizarCobrancas,
    atualizarCobrancasPorCliente,
    cobrancaAtual,
  } = useGlobal();

  const initialLocalInfo = {
    nome: openModalCobranca.cadastrar
      ? clienteAtual.nome
      : cobrancaAtual.cliente_nome,
    descricao: openModalCobranca.cadastrar ? "" : cobrancaAtual.descricao,
    data_vencimento: openModalCobranca.cadastrar
      ? ""
      : cobrancaAtual.data_vencimento,
    valor: openModalCobranca.cadastrar
      ? ""
      : formatCurrencyInput(cobrancaAtual.valor),
    paga: openModalCobranca.cadastrar ? null : cobrancaAtual.paga,
  };
  const [localInfo, setLocalInfo] = useState({ ...initialLocalInfo });

  function handleClose() {
    setOpenModalCobranca({ cadastrar: false, editar: false });
    setLocalInfo(initialLocalInfo);
  }

  function handleChangeDesc(e) {
    setLocalInfo({ ...localInfo, descricao: e.target.value });
  }
  function handleChangeVencimento(e) {
    setLocalInfo({ ...localInfo, data_vencimento: e.target.value });
  }
  function handleChangeValor(e) {
    setLocalInfo({ ...localInfo, valor: e.target.value });
    console.log(e.target.value);
  }

  function isCamposIncorretos() {
    return (
      !localInfo.descricao ||
      !localInfo.data_vencimento ||
      !localInfo.valor ||
      localInfo.valor === "0,00" ||
      localInfo.paga === null
    );
  }

  async function handleSubmit() {
    if (isCamposIncorretos()) return;
    try {
      if (openModalCobranca.cadastrar) {
        const body = {
          ...localInfo,
          cliente_id: clienteAtual.id,
          valor: onlyNumbers(localInfo.valor),
        };
        await post(`/cobrancas/${clienteAtual.id}`, body, token);
        notificacaoSucesso("Cobrança cadastrada com sucesso");
        handleClose();
        atualizarCobrancasPorCliente(user_id);
        return;
      }
      if (openModalCobranca.editar) {
        const body = {
          ...localInfo,
          cliente_id: cobrancaAtual.cliente_id,
          valor: onlyNumbers(localInfo.valor),
        };
        console.log(body);
        await put(`/cobrancas/${cobrancaAtual.id}`, body, token);
        notificacaoSucesso("Cobrança editada com sucesso");
        handleClose();
        if (user_id) {
          atualizarCobrancasPorCliente(user_id);
        } else {
          atualizarCobrancas();
        }
        return;
      }
    } catch (error) {
      console.log(error.response);
      notificacaoErro("Algo de errado aconteceu");
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={openModalCobranca}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalCobranca}>
        <div className="modal-cadastrar-cobranca">
          <img
            className="editar--close"
            src={close}
            alt=""
            onClick={handleClose}
          />
          <div className="modal-cadastrar-cobranca--top">
            <img src={fileCinza} alt="" />
            <h1 className="modal-cadastrar-cobranca--h1">
              {openModalCobranca.cadastrar
                ? "Cadastro de Cobrança"
                : "Edição de cobrança"}
            </h1>
          </div>
          <div>
            <label>Nome*</label>
            <InputGeral value={localInfo.nome} isStatic />
          </div>
          <div className="desc">
            <label>Descrição*</label>
            <textarea
              className="text-desc"
              placeholder="Digite a descrição"
              value={localInfo.descricao}
              onChange={handleChangeDesc}
            ></textarea>
          </div>
          <div className="modal-cadastrar-cobranca--container">
            <div>
              <label>Vencimento*</label>
              <InputGeral
                placeholder="Data de vencimento"
                type="date"
                value={localInfo.data_vencimento}
                onChange={handleChangeVencimento}
                required
              />
            </div>
            <div>
              <label>Valor*</label>
              <InputGeral
                name="currency"
                placeholder="Digite o valor"
                value={localInfo.valor}
                onChange={handleChangeValor}
                required
              />
            </div>
          </div>
          <div className="status">
            <label>Status*</label>
            <div>
              <InputStatus localInfo={localInfo} setLocalInfo={setLocalInfo} />
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

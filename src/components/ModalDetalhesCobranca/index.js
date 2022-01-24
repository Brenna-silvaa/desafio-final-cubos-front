import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import close from "../../assets/close.svg";
import avatar from "../../assets/cobranca-avatar.svg";
import { useGlobal } from "../../hooks/useGlobal";
import { formatarData } from "../../utils/formatarCampos";
import { formatCurrency } from "../../utils/formatCurrency";
import "./style.css";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ModalDetalhesCobranca() {
  const classes = useStyles();
  const {
    openModalDetalheCobranca,
    setOpenModalDetalheCobranca,
    cobrancaAtual,
  } = useGlobal();

  function handleClose() {
    setOpenModalDetalheCobranca(false);
  }

  return (
    <Modal
      className={classes.modal}
      open={openModalDetalheCobranca}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalDetalheCobranca}>
        <div className="modal-detalhes-cobranca">
          <img
            className="detalhes--close"
            src={close}
            alt=""
            onClick={handleClose}
          />
          <div className="detalhes-cobranca--header">
            <img src={avatar} alt="" />
            <h1>Detalhe da cobrança</h1>
          </div>
          <div className="detalhes-cobranca--campo">
            <h2>Nome</h2>
            <span>{cobrancaAtual.cliente_nome}</span>
          </div>
          <div className="detalhes-cobranca--campo">
            <h2>Descrição</h2>
            <span>{cobrancaAtual.descricao}</span>
          </div>
          <div className="detalhes-cobranca--container">
            <div className="detalhes-cobranca--campo">
              <h2>Vencimento</h2>
              <span>
                {!!cobrancaAtual.data_vencimento &&
                  formatarData(cobrancaAtual.data_vencimento)}
              </span>
            </div>
            <div className="detalhes-cobranca--campo">
              <h2>Valor</h2>
              <span>
                {!!cobrancaAtual.valor && formatCurrency(cobrancaAtual.valor)}
              </span>
            </div>
          </div>
          <div className="detalhes-cobranca--container">
            <div className="detalhes-cobranca--campo">
              <h2>ID Cobrança</h2>
              <span>{cobrancaAtual.id}</span>
            </div>
            <div className="detalhes-cobranca--campo">
              <h2>Status</h2>
              <span
                className={
                  cobrancaAtual.status === "Vencida"
                    ? "detalhes-cobranca--vencida-td"
                    : cobrancaAtual.status === "Paga"
                    ? "detalhes-cobranca--paga-td"
                    : "detalhes-cobranca--pendente-td"
                }
              >
                {cobrancaAtual.status}
              </span>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

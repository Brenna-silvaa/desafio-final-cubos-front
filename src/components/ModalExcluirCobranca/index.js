import { Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useParams } from "react-router";
import close from "../../assets/close.svg";
import excluirAlert from "../../assets/excluirCobrancaAlert.svg";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import { notificacaoErro, notificacaoSucesso } from "../../utils/notificacao";
import { del } from "../../utils/requests";
import "./style.css";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  botoes: {
    textTransform: "none",
    fontFamily: "Nunito",
    fontSize: 18,
    minWidth: 100,
    borderRadius: 4,
  },
  botaoVermelho: {
    backgroundColor: "#F2D6D0",
    color: "#AE1100",
    "&:hover": {
      backgroundColor: "#e5b5ac",
    },
  },
  botaoVerde: {
    backgroundColor: "#ACD9C5",
    color: "#034A2A",
    "&:hover": {
      backgroundColor: "#93c9b0",
    },
  },
});

export default function ModalExcluirCobranca() {
  const classes = useStyles();
  const { token } = useAuth();
  const {
    openModalExcluirCobranca,
    setOpenModalExcluirCobranca,
    cobrancaAtual,
    atualizarCobrancas,
    atualizarCobrancasPorCliente,
  } = useGlobal();
  const { user_id } = useParams();

  function handleClose() {
    setOpenModalExcluirCobranca(false);
  }

  async function handleDelete() {
    if (cobrancaAtual) {
      try {
        await del(`/cobrancas/${cobrancaAtual.id}`, token);
        notificacaoSucesso("Cobrança excluída com sucesso");
        handleClose();
        if (user_id) {
          atualizarCobrancasPorCliente(user_id);
        } else {
          atualizarCobrancas();
        }
      } catch (error) {
        console.log(error.response);
        notificacaoErro("Algo de errado aconteceu");
      }
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={openModalExcluirCobranca}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalExcluirCobranca}>
        <div className="modal-excluir-cobranca">
          <img
            className="excluir--close"
            src={close}
            alt=""
            onClick={handleClose}
          />
          <img src={excluirAlert} alt="" />
          <span className="excluir--mensagem">
            Tem certeza que deseja excluir essa cobrança ?
          </span>
          <div className="excluir--buttons">
            <Button
              className={`${classes.botoes} ${classes.botaoVermelho}`}
              variant="contained"
              onClick={handleClose}
            >
              Não
            </Button>
            <Button
              className={`${classes.botoes} ${classes.botaoVerde}`}
              variant="contained"
              onClick={handleDelete}
            >
              Sim
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

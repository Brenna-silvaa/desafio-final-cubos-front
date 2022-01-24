import { toast } from "react-toastify";

const options = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function notificacaoErro(mensagem) {
  return toast.error(mensagem, options);
}

export function notificacaoSucesso(mensagem) {
  return toast.success(mensagem, options);
}

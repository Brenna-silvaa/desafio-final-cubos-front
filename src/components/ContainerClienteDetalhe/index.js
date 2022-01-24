import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import avatar from "../../assets/cliente-section-avatar.svg";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import {
  formatarCep,
  formatarCpf,
  formatarTel,
} from "../../utils/formatarCampos";
import isNull from "../../utils/isNull";
import { notificacaoErro } from "../../utils/notificacao";
import { get } from "../../utils/requests";
import BotaoCinza from "../BotaoCinza";
import BotaoRosa from "../BotaoRosa";
import ModalClientes from "../ModalClientes";
import TabelaCobrancas from "../TabelaCobrancas";
import "./style.css";

function ContainerClienteDetalhe() {
  const { user_id } = useParams();
  const { token } = useAuth();
  const {
    clienteAtual,
    setClienteAtual,
    setOpenModalCliente,
    openModalCobranca,
    setOpenModalCobranca,
    openModalCliente,
  } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    setClienteAtual({});
    getCliente();
    //eslint-disable-next-line
  }, []);

  async function getCliente() {
    try {
      const { data } = await get(`cliente/${user_id}`, token);
      const dataFormat = {
        id: data.id,
        nome: isNull(data.nome),
        email: isNull(data.email),
        cpf: isNull(data.cpf),
        telefone: isNull(data.telefone),
        endereco: isNull(data.endereco),
        complemento: isNull(data.complemento),
        cep: isNull(data.cep),
        bairro: isNull(data.bairro),
        cidade: isNull(data.cidade),
        uf: isNull(data.uf),
      };
      setClienteAtual({ ...dataFormat });
    } catch (error) {
      console.log(error.response.data);
      notificacaoErro("Usuário não encontrado");
      navigate("/clientes");
    }
  }
  return (
    <div className="cliente-detalhe--container">
      <div className="cliente-detalhe--top">
        <div>
          <img src={avatar} alt="" />
          <h1 className="cliente-detalhe--h1">{clienteAtual.nome}</h1>
        </div>
        <div></div>
      </div>
      <div className="cliente-detalhe--dados">
        <div className="cliente-detalhe--container2">
          <h2 className="cliente-detalhe--h2">Dados do cliente</h2>
          <BotaoCinza isEdit onClick={() => setOpenModalCliente(true)}>
            Editar cliente
          </BotaoCinza>
        </div>
        <table className="cliente-detalhe--t1">
          <thead>
            <tr>
              <th>Email</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{clienteAtual.email}</td>
              <td>{formatarTel(clienteAtual.telefone)}</td>
              <td>{formatarCpf(clienteAtual.cpf)}</td>
            </tr>
          </tbody>
        </table>
        <table className="cliente-detalhe--t2">
          <thead>
            <tr>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Complemento</th>
              <th>CEP</th>
              <th>Cidade</th>
              <th>UF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{clienteAtual.endereco}</td>
              <td>{clienteAtual.bairro}</td>
              <td>{clienteAtual.complemento}</td>
              <td>{formatarCep(clienteAtual.cep)}</td>
              <td>{clienteAtual.cidade}</td>
              <td>{clienteAtual.uf}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cliente-detalhe--tabela-container">
        <div>
          <h2 className="cliente-detalhe--h2">Cobranças do cliente</h2>
          <BotaoRosa
            comprido
            onClick={() =>
              setOpenModalCobranca({ ...openModalCobranca, cadastrar: true })
            }
          >
            + Nova Cobrança
          </BotaoRosa>
        </div>
        <TabelaCobrancas />
      </div>
      {!!openModalCliente && <ModalClientes />}
    </div>
  );
}
export default ContainerClienteDetalhe;

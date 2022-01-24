import avatar from "../../assets/cliente-section-avatar.svg";
import BotaoRosa from "../../components/BotaoRosa";
import InputPesquisa from "../../components/InputPesquisa";
import TabelaClientes from "../../components/TabelaClientes";
import { useGlobal } from "../../hooks/useGlobal";
import "./style.css";
import filtro from "../../../src/assets/filtro-pesquisa.svg";
import ModalClientes from "../ModalClientes";
import onlyNumbers from "../../utils/onlyNumbers";
import TabelaErro from "../TabelaErro";
import { useState } from "react";

function ContainerClientes() {
  const { setOpenModalCliente, listaClientesBase, setListaClientes } =
    useGlobal();

  const [tabelaErro, setTabelaErro] = useState(false);

  function handlePesquisaChange(e) {
    setTabelaErro(false);
    if (!e.target.value) {
      setListaClientes(listaClientesBase);
      return;
    }

    const cpfOnlyNumbers = onlyNumbers(e.target.value);
    const localClientes = listaClientesBase.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
        cliente.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        cliente.cpf.includes(cpfOnlyNumbers || " ")
    );
    if (!localClientes.length) {
      setTabelaErro(true);
      return;
    }
    setListaClientes(localClientes);
  }

  return (
    <div className="clientes--container">
      <div className="clientes--top">
        <div>
          <img src={avatar} alt="" />
          <h1 className="clientes--h1">Clientes</h1>
        </div>
        <div>
          <div>
            <BotaoRosa
              comprido
              onClick={() => {
                setOpenModalCliente(true);
              }}
            >
              + Adicionar cliente
            </BotaoRosa>
          </div>
          <div className="filtro-input">
            <img src={filtro} alt="" />
          </div>
          <InputPesquisa onChange={handlePesquisaChange} />
        </div>
      </div>
      {!tabelaErro ? <TabelaClientes /> : <TabelaErro />}
      <ModalClientes />
    </div>
  );
}
export default ContainerClientes;

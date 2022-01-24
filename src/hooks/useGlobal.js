import { useContext, useState } from "react";
import { globalContext } from "../contexts/GlobalProvider";
import { notificacaoErro } from "../utils/notificacao";
import { get } from "../utils/requests";
import { useAuth } from "./useAuth";

function useGlobalProvider() {
  const { token } = useAuth();

  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [abrirPopup, setAbrirPopup] = useState(false);
  const [openModalCliente, setOpenModalCliente] = useState(false);
  const [openModalCobranca, setOpenModalCobranca] = useState({
    cadastrar: false,
    editar: false,
  });
  const [openModalExcluirCobranca, setOpenModalExcluirCobranca] =
    useState(false);
  const [openModalDetalheCobranca, setOpenModalDetalheCobranca] =
    useState(false);

  const [clienteAtual, setClienteAtual] = useState({});
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesBase, setListaClientesBase] = useState([]);
  const [listaClientesFiltrados, setListaClientesFiltrados] = useState();

  const [cobrancaAtual, setCobrancaAtual] = useState({});
  const [listaCobrancas, setListaCobrancas] = useState([]);
  const [listaCobrancasBase, setListaCobrancasBase] = useState([]);
  const [listaCobrancasFiltradas, setListaCobrancasFiltradas] = useState();

  async function atualizarClientes() {
    try {
      const { data } = await get("/cliente", token);
      setListaClientes(data);
      setListaClientesBase(data);
    } catch (error) {
      console.log(error.response.data);
      notificacaoErro("Houve um erro ao atualizar os clientes");
    }
  }
  async function atualizarCliente(id) {
    try {
      const { data } = await get(`/cliente/${id}`, token);
      setClienteAtual(data);
    } catch (error) {
      console.log(error.response.data);
      notificacaoErro("Houve um erro ao atualizar o cliente");
    }
  }
  async function atualizarCobrancas() {
    setListaCobrancas([]);
    try {
      const { data } = await get("/cobrancas", token);
      setListaCobrancas(data);
      setListaCobrancasBase(data);
    } catch (error) {
      console.log(error.response.data);
      notificacaoErro("Houve um erro ao atualizar as cobrancas");
    }
  }

  async function atualizarCobrancasPorCliente(id) {
    setListaCobrancas([]);
    try {
      const { data } = await get("/cobrancas", token);
      const cobrancasDoCliente = data.filter(
        (cobranca) => cobranca.cliente_id === Number(id)
      );
      setListaCobrancas(cobrancasDoCliente);
    } catch (error) {
      console.log(error.response.data);
      notificacaoErro("Houve um erro ao atualizar as cobrancas");
    }
  }

  return {
    openModalEditar,
    setOpenModalEditar,
    abrirPopup,
    setAbrirPopup,
    openModalCliente,
    setOpenModalCliente,
    openModalCobranca,
    setOpenModalCobranca,
    listaClientes,
    setListaClientes,
    listaCobrancas,
    setListaCobrancas,
    atualizarClientes,
    atualizarCliente,
    atualizarCobrancas,
    atualizarCobrancasPorCliente,
    clienteAtual,
    setClienteAtual,
    listaCobrancasFiltradas,
    setListaCobrancasFiltradas,
    listaClientesFiltrados,
    setListaClientesFiltrados,
    listaCobrancasBase,
    setListaCobrancasBase,
    listaClientesBase,
    setListaClientesBase,
    cobrancaAtual,
    setCobrancaAtual,
    openModalExcluirCobranca,
    setOpenModalExcluirCobranca,
    openModalDetalheCobranca,
    setOpenModalDetalheCobranca,
  };
}

function useGlobal() {
  return useContext(globalContext);
}

export { useGlobalProvider, useGlobal };

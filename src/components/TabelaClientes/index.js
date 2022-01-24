import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import novaCobranca from "../../assets/nova-cobranca.svg";
import clienteOrdenacao from "../../assets/ordenacao.svg";
import { useGlobal } from "../../hooks/useGlobal";
import { formatarCpf, formatarTel } from "../../utils/formatarCampos";
import "./style.css";

function TabelaClientes() {
  const {
    atualizarClientes,
    listaClientes,
    setListaClientes,
    setListaClientesBase,
    setClienteAtual,
    openModalCobranca,
    setOpenModalCobranca,
    listaClientesFiltrados,
    setListaClientesFiltrados,
  } = useGlobal();

  const [ordenacao, setOrdenacao] = useState(null);

  useEffect(() => {
    if (listaClientesFiltrados) {
      setListaClientes([...listaClientesFiltrados]);
      setListaClientesBase([...listaClientesFiltrados]);
      setListaClientesFiltrados();
      return;
    }
    atualizarClientes();
    //eslint-disable-next-line
  }, []);

  function handleOrdenacaoPorNome() {
    const ordenacaoAtual = !ordenacao;
    if (ordenacaoAtual === true) {
      const menorParaMaior = listaClientes.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      setListaClientes(menorParaMaior);
    } else {
      const maiorParamenor = listaClientes.sort((a, b) =>
        b.nome.localeCompare(a.nome)
      );
      setListaClientes(maiorParamenor);
    }
    setOrdenacao(ordenacaoAtual);
  }

  return (
    <table className="clientes-tabela">
      <thead>
        <tr className="clientes--tr">
          <th
            onClick={handleOrdenacaoPorNome}
            className="clientes--th cliente--th"
          >
            <img src={clienteOrdenacao} alt="" />
            <span>Cliente</span>
          </th>
          <th className="clientes--th">CPF</th>
          <th className="clientes--th">E-mail</th>
          <th className="clientes--th">Telefone</th>
          <th className="clientes--th">Status</th>
          <th className="clientes--th">Criar cobrança</th>
        </tr>
      </thead>
      <tbody>
        {!!listaClientes &&
          listaClientes.map((cliente, index) => {
            return (
              <tr
                style={
                  index === listaClientes.length - 1
                    ? { borderBottom: "none" }
                    : {}
                }
                key={cliente.id}
                className="clientes--tr"
              >
                <td className="clientes--td">
                  <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
                </td>
                <td className="clientes--td">{formatarCpf(cliente.cpf)}</td>
                <td className="clientes--td">{cliente.email}</td>
                <td className="clientes--td">
                  {formatarTel(cliente.telefone)}
                </td>
                <td className="clientes--td">
                  <span
                    className={
                      cliente.status === "Inadimplente"
                        ? "inadimplente--td"
                        : "emdia--td"
                    }
                  >
                    {cliente.status}
                  </span>
                </td>
                <td className="clientes--td">
                  <img
                    onClick={() => {
                      setClienteAtual(cliente);
                      setOpenModalCobranca({
                        ...openModalCobranca,
                        cadastrar: true,
                      });
                    }}
                    style={{ display: "inline-block", cursor: "pointer" }}
                    src={novaCobranca}
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TabelaClientes;

import { Header } from "../../components/Header";
import InputPesquisa from "../../components/InputPesquisa";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";
import filtro from "../../../src/assets/filtro-pesquisa.svg";
import avatar from "../../../src/assets/cobranca-avatar.svg";
import TabelaCobrancas from "../../components/TabelaCobrancas";
import { useGlobal } from "../../hooks/useGlobal";
import { useState } from "react";
import TabelaErro from "../../components/TabelaErro";
import ModalCobranca from "../../components/ModalCobranca";

function Cobrancas() {
  const { listaCobrancasBase, setListaCobrancas, openModalCobranca } =
    useGlobal();

  const [tabelaErro, setTabelaErro] = useState(false);

  function handlePesquisaChange(e) {
    setTabelaErro(false);
    if (!e.target.value) {
      setListaCobrancas(listaCobrancasBase);
      return;
    }
    const localCobrancas = listaCobrancasBase.filter(
      (cobranca) =>
        cobranca.cliente_nome
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        cobranca.id === Number(e.target.value)
    );
    if (!localCobrancas.length) {
      setTabelaErro(true);
      return;
    }
    setListaCobrancas(localCobrancas);
  }

  return (
    <div className="cobrancas">
      <MenuLateral />
      <Header />
      <section className="cobrancas-section">
        <div className="cobrancas--top">
          <div>
            <img src={avatar} alt="" />
            <h1 className="cobrancas--h1">Cobranças</h1>
          </div>
          <div>
            <div className="filtro-input">
              <img src={filtro} alt="" />
            </div>
            <InputPesquisa onChange={handlePesquisaChange} />
          </div>
        </div>
        {!tabelaErro ? <TabelaCobrancas /> : <TabelaErro />}
      </section>
      {!!openModalCobranca.editar && <ModalCobranca />}
    </div>
  );
}

export default Cobrancas;

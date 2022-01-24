import CardCobranca from "../../components/CardCobranca";
import { Header } from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import TabelaResumoClientes from "../../components/TabelaResumoClientes";
import TabelaResumoCobrancas from "../../components/TabelaResumoCobrancas";
import "./style.css";

export default function Home() {
  return (
    <div className="home">
      <MenuLateral />
      <Header />
      <section className="home-section">
        <section className="home-section--container">
          <section className="home-section--1">
            <div className="container-pagas">
              <CardCobranca pagas titulo="Cobranças Pagas" />
              <TabelaResumoCobrancas pagas />
            </div>
            <div className="container-vencidas">
              <CardCobranca vencidas titulo="Cobranças Vencidas" />
              <TabelaResumoCobrancas vencidas />
            </div>
            <div className="container-previstas">
              <CardCobranca previstas titulo="Cobranças Previstas" />
              <TabelaResumoCobrancas previstas />
            </div>
          </section>
          <section className="home-section--2">
            <TabelaResumoClientes emDia />
            <TabelaResumoClientes inadimplentes />
          </section>
        </section>
      </section>
    </div>
  );
}

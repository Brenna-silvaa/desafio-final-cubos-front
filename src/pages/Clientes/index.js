import { useParams } from "react-router";
import ContainerClienteDetalhe from "../../components/ContainerClienteDetalhe";
import ContainerClientes from "../../components/ContainerClientes";
import { Header } from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import ModalEditarUsuario from "../../components/ModalEditarUsuario";
import ModalCobranca from "../../components/ModalCobranca";
import "./style.css";
import { useGlobal } from "../../hooks/useGlobal";

function Clientes() {
  const { user_id } = useParams();
  const { openModalCobranca } = useGlobal();
  return (
    <div className="clientes">
      <MenuLateral />
      <Header />
      <section className="clientes-section">
        {!user_id ? <ContainerClientes /> : <ContainerClienteDetalhe />}
      </section>
      <ModalEditarUsuario />
      {(!!openModalCobranca.cadastrar || !!openModalCobranca.editar) && (
        <ModalCobranca />
      )}
    </div>
  );
}

export default Clientes;

import { useNavigate } from "react-router";
import editar from "../../../assets/editar.svg";
import sair from "../../../assets/sair.svg";
import { useAuth } from "../../../hooks/useAuth";
import { useGlobal } from "../../../hooks/useGlobal";
import "./style.css";
import topSide from "../../../assets/popup-top-side.svg";

const Popup = () => {
  const { removeUser } = useAuth();
  const { setOpenModalEditar, setAbrirPopup } = useGlobal();

  const navigate = useNavigate();

  document.addEventListener("click", () => setAbrirPopup(false));

  function handleEditar() {
    setOpenModalEditar(true);
    setAbrirPopup(false);
  }
  function handleSair() {
    removeUser();
    navigate("/login");
  }

  return (
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      <div className="popup-top">
        <img src={topSide} alt="" />
      </div>
      <img className="icone" src={editar} alt="" onClick={handleEditar} />
      <img className="icone" src={sair} alt="" onClick={handleSair} />
    </div>
  );
};

export default Popup;

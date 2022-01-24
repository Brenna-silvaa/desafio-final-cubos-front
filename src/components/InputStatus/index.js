import bolinhaNormalCinza from "../../assets/bolinhaNormalCinza.svg";
import bolinhaVerdeComCheck from "../../assets/bolinhaVerdeComCheck.svg";
import "./style.css";

export default function InputStatus({ localInfo, setLocalInfo }) {
  return (
    <div className="input-status">
      <div
        onClick={() => setLocalInfo({ ...localInfo, paga: true })}
        className="input-option"
      >
        <img
          src={localInfo.paga ? bolinhaVerdeComCheck : bolinhaNormalCinza}
          alt=""
          className="bolinha"
        />
        Cobrança Paga
      </div>
      <div
        onClick={() => setLocalInfo({ ...localInfo, paga: false })}
        className="input-option"
      >
        <img
          src={
            localInfo.paga === false ? bolinhaVerdeComCheck : bolinhaNormalCinza
          }
          alt=""
          className="bolinha"
        />
        Cobrança Pendente
      </div>
    </div>
  );
}

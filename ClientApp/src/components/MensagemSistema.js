import React, { useState, useEffect } from "react";
import "../CSS/MensagemSistema.css";

const MensagemSistema = ({ mensagem, onClose, onExibirChange, temErro }) => {
  const [exibir, setExibir] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExibir(false);
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    setExibir(onExibirChange);
  }, [onExibirChange]);

  return exibir ? (
    <>
      {temErro ? (
        <div className="mensagem-box" style={{backgroundColor: "#ff5e5e"}}>
          <span className="fechar" onClick={onClose}>
            &times;
          </span>
          <div className="mensagem-texto">{mensagem}</div>
        </div>
      ) : (
        <div className="mensagem-box" style={{backgroundColor: "#87ff83"}}>
          <span className="fechar" onClick={onClose}>
            &times;
          </span>
          <div className="mensagem-texto">{mensagem}</div>
        </div>
      )}
    </>
  ) : null;
};

export default MensagemSistema;

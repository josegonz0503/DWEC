import './Eventos-lista.css'; 

export default function EventosLista({ children, handleCerrar }) {
  return (
    <div className="eventos-lista">
      {children}

      <button onClick={handleCerrar}>
        Cerrar
      </button>
    </div>
  );
}

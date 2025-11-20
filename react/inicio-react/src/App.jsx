import Titulo from './components/Titulo';
import Modal from './components/Modal';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [eventos, setEventos] = useState([
    { titulo: "examen DWEC", id: 1 },
    { titulo: "concurso Programame", id: 2 },
    { titulo: "puente de la constitución", id: 3 },
  ]);

  const [mostrarEventos, setMostrarEventos] = useState(false);

  // AHORA EMPIEZA EN FALSE
  const [muestraModal, setMuestraModal] = useState(false);

  const subtitulo = "Todos los eventos para desarrollo aplicaciones web";
  const subtitulo2 = "Todos los eventos para desarrollo aplicaciones multiplataforma";

  const handleClick = (id) => {
    setEventos(eventosPrevios =>
      eventosPrevios.filter(evento => id !== evento.id)
    );
  };

  const handleCerrar = () => {
    setMuestraModal(false);
  };

  return (
    <div className="App">
      <Titulo titulo="Eventos de DAW" subtitulo={subtitulo} />
      <Titulo titulo="Eventos de DAM" subtitulo={subtitulo2} />

      {!mostrarEventos && (
        <button onClick={() => setMostrarEventos(true)}>
          Mostrar Eventos
        </button>
      )}

      {mostrarEventos && (
        <button onClick={() => setMostrarEventos(false)}>
          Ocultar Eventos
        </button>
      )}

      {mostrarEventos && eventos.map((evento, index) => (
        <div key={evento.id}>
          <h2>{index + 1} - {evento.titulo}</h2>
          <button onClick={() => handleClick(evento.id)}>
            Eliminar Evento
          </button>
        </div>
      ))}

      <button onClick={() => setMuestraModal(true)}>
        Abrir modal
      </button>

      {muestraModal && (
        <Modal handleCerrar={handleCerrar}>
          <h2>Stem Talks</h2>
          <p>No te lo pierdas</p>
        </Modal>
      )}
    </div>
  );
};

export default App;

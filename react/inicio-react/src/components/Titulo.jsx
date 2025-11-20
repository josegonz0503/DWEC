export default function Titulo({titulo,subtitulo}) {
  return (
    <div>
      <h1 className="titulo">{titulo}</h1>
      <br />
      <h2 className="subtitulo">{subtitulo}</h2>
    </div>
  );
}
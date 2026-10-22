import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Asistente({ usuario }) {
  const [modo, setModo] = useState("entrenador");
  const [mensajes, setMensajes] = useState([]);
  const [conversaciones, setConversaciones] = useState([]);
  const [conversacion, setConversacion] = useState(null);
  const [consulta, setConsulta] = useState("");
  const [estado, setEstado] = useState(null);
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);
  async function cargar() {
    try {
      setEstado((await axios.get("/ia/estado")).data);
      setConversaciones((await axios.get("/ia/conversaciones")).data.items);
    } catch (e) {
      setAviso(
        e.response?.data?.message || "No se pudo consultar el asistente.",
      );
    }
  }
  useEffect(() => {
    cargar();
  }, []);
  async function abrir(id) {
    if (!id) {
      setConversacion(null);
      setMensajes([]);
      return;
    }
    setOcupado(true);
    try {
      const r = await axios.get("/ia/conversaciones/" + id);
      setConversacion(id);
      setModo(r.data.conversacion.modo);
      setMensajes(r.data.mensajes);
    } catch (e) {
      setAviso(
        e.response?.data?.message || "No se pudo abrir la conversación.",
      );
    } finally {
      setOcupado(false);
    }
  }
  async function enviar(e) {
    e.preventDefault();
    setOcupado(true);
    setAviso("");
    try {
      const r = await axios.post("/ia/consulta", {
        consulta,
        modo,
        conversacion_id: conversacion,
      });
      setMensajes([
        ...mensajes,
        { rol: "user", contenido: consulta },
        { rol: "assistant", contenido: r.data.respuesta },
      ]);
      setConversacion(r.data.conversacion_id);
      setConsulta("");
      await cargar();
    } catch (error) {
      setAviso(
        error.response?.data?.message || "No se pudo contactar a Cohere.",
      );
    } finally {
      setOcupado(false);
    }
  }
  const habilitado =
    usuario.consentimiento_ia && estado?.configurada && !ocupado;
  return (
    <main>
      <p className="etiqueta">PREGUNTÁ. ENTENDÉ. AVANZÁ.</p>
      <h1>
        Asistente <span className="acento">✦</span>
      </h1>
      <p className="muted">
        Cohere por API ·{" "}
        {estado
          ? estado.configurada
            ? "Configurada; disponibilidad sujeta al proveedor"
            : "Falta configurar la clave en el servidor"
          : "Consultando configuración…"}
      </p>
      {!usuario.consentimiento_ia && (
        <p className="aviso">
          Primero activá el consentimiento de IA en{" "}
          <Link to="/cuenta">Mi cuenta</Link>.
        </p>
      )}
      {aviso && (
        <p role="status" className="aviso">
          {aviso}
        </p>
      )}
      <section className="tarjeta">
        <div className="grilla dos">
          <label>
            Modo
            <select
              value={modo}
              disabled={ocupado}
              onChange={(e) => {
                setModo(e.target.value);
                setConversacion(null);
                setMensajes([]);
              }}
            >
              <option value="entrenador">Entrenador</option>
              <option value="soporte">Soporte de la app</option>
            </select>
          </label>
          <label>
            Conversación
            <select
              value={conversacion || ""}
              disabled={ocupado}
              onChange={(e) => abrir(e.target.value)}
            >
              <option value="">Nueva conversación</option>
              {conversaciones
                .filter((c) => c.modo === modo)
                .map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.titulo}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="chat" aria-live="polite">
          {!mensajes.length && (
            <div className="vacio">
              <span className="chat-estrella">✦</span>
              <h2>¿Qué querés mejorar hoy?</h2>
              <p>
                Podés preguntar sobre entrenamiento, hábitos o cómo usar GYM-OS.
              </p>
            </div>
          )}
          {mensajes.map((m, i) => (
            <article className={"mensaje " + m.rol} key={m.id || i}>
              <small>{m.rol === "user" ? "VOS" : "GYM-OS · COHERE"}</small>
              <p>{m.contenido.replaceAll("**", "")}</p>
            </article>
          ))}
          {ocupado && <p role="status">Consultando… No cierres esta página.</p>}
        </div>
        <form onSubmit={enviar}>
          <label>
            Tu consulta
            <textarea
              required
              maxLength={2000}
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Por ejemplo: ¿cómo organizo tres días de entrenamiento?"
            />
          </label>
          <button disabled={!habilitado}>Enviar consulta ↗</button>
        </form>
        <small>
          El chat no modifica tus datos. Orientación general, no consejo médico
          ni nutricional individual.
        </small>
      </section>
    </main>
  );
}

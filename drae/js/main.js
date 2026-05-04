/** URL base de la API de definiciones. */
const API_BASE = 'https://api.bouillet.com.ar/api/v1/drae/';

/** Longitud máxima permitida para un término de búsqueda. */
const MAX_TERM_LENGTH = 100;


/**
 * Limpia y normaliza un término de búsqueda.
 *
 * Elimina espacios extremos, recorta al máximo permitido y
 * descarta cualquier carácter que no sea letra española o
 * espacio, para evitar que valores inesperados lleguen a la
 * API o al historial del navegador.
 *
 * @param {string} term - Texto ingresado por el usuario.
 * @returns {string} Término saneado, o cadena vacía si no
 *   queda contenido válido.
 */
function sanitizeTerm(term) {
  return String(term)
    .trim()
    .slice(0, MAX_TERM_LENGTH)
    .replace(/[^a-záéíóúñü\s]/gmi, '')
    .trim();
}


/**
 * Consulta la definición de un término y actualiza la vista.
 *
 * Saneada la entrada, realiza un GET a la API y, con la
 * respuesta, reemplaza el contenido del elemento #resultado
 * y actualiza la URL con un hash que permite compartir o
 * recuperar la búsqueda mediante navegación back/forward.
 *
 * @param {string} term - Término a buscar.
 * @returns {void}
 */
function send(term) {
  const cleanTerm = sanitizeTerm(term);
  if (!cleanTerm) return;

  fetch(`${API_BASE}${encodeURIComponent(cleanTerm)}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(function(data) {
    document.querySelector('#resultado').innerHTML = data.data;
    document.querySelector('#term').value = cleanTerm;
    history.pushState(
      { term: cleanTerm },
      '',
      `#${encodeURIComponent(cleanTerm)}`
    );
  })
  .catch(function(ex) {
    console.error('Búsqueda fallida:', ex);
  });
}


/**
 * Registra el evento click en todos los botones de búsqueda.
 *
 * Lee el valor del campo #term y lo envía a `send()`.
 * Usa querySelectorAll para soportar múltiples botones con
 * la clase .js-buscar-termino en la misma página.
 */
document.querySelectorAll('.js-buscar-termino').forEach(
  function(element) {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      send(document.querySelector('#term').value);
    });
  }
);


/**
 * Delegación de clicks sobre palabras enlazadas en el resultado.
 *
 * Intercepta clicks en elementos <mark> y <a> dentro del
 * contenido devuelto por la API, extrayendo su texto para
 * iniciar una nueva búsqueda sin recargar la página.
 */
document.addEventListener('click', function(e) {
  if (e.target.matches('mark') || e.target.matches('a')) {
    e.preventDefault();
    send(e.target.textContent);
  }
});


/**
 * Lee el hash de la URL actual y dispara la búsqueda.
 *
 * Permite cargar un resultado directamente desde una URL con
 * hash (p. ej. `/#cielo`) y recuperar el estado anterior al
 * navegar con los botones back/forward del navegador.
 *
 * @returns {void}
 */
function loadFromHash() {
  const hash = decodeURIComponent(window.location.hash)
    .replace('#', '')
    .trim();
  if (hash) send(hash);
}

document.addEventListener('DOMContentLoaded', loadFromHash);
window.addEventListener('popstate', loadFromHash);

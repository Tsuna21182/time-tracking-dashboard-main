let datos;

// Fetch los datos del archivo JSON
fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      console.error("Error al cargar los datos");
      return;
    }
    return response.json();
  })
  .then((data) => {
    datos = data; // Guarda los datos
    actualizarValores("weekly"); // Actualiza los valores iniciales a "weekly"
  });

// Selecciona los botones
const day = document.querySelector(".day");
const week = document.querySelector(".week");
const month = document.querySelector(".month");

// Agrega eventos de clic a los botones
day.addEventListener("click", () => actualizarValores("daily"));
week.addEventListener("click", () => actualizarValores("weekly"));
month.addEventListener("click", () => actualizarValores("monthly"));

// Función para actualizar los valores en el HTML
function actualizarValores(periodo) {
  if (!datos) return; // Verifica si los datos están disponibles

  datos.forEach((item) => {
    const titulo = item.title.toLowerCase(); // Título como clase (e.g., "work")
    const tarjeta = document.querySelector(`.${titulo}`); // Selecciona la tarjeta por clase

    if (tarjeta) {
      const current = tarjeta.querySelector(".content__time span");
      const previous = tarjeta.querySelector(".duration span");

      current.textContent = item.timeframes[periodo].current;
      previous.textContent = item.timeframes[periodo].previous;
    }
  });
}

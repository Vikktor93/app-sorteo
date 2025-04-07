let estudiantes = [];
let historial = [];

// Al cargar la página, restaurar historial desde localStorage
window.onload = function () {
  const historialGuardado = localStorage.getItem('historialSorteos');
  if (historialGuardado) {
    historial = JSON.parse(historialGuardado);
    actualizarHistorial();
  }
};

document.getElementById('fileInput').addEventListener('change', leerArchivo);

function leerArchivo(event) {
  const archivo = event.target.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    const contenido = e.target.result;
    estudiantes = contenido.split(/\r?\n|,/).map(n => n.trim()).filter(Boolean);
  };

  lector.readAsText(archivo);
}

function formarGrupos() {
  const groupSize = parseInt(document.getElementById('groupSize').value);

  if (!groupSize || groupSize <= 0) {
    alert('Ingresa un número válido de integrantes por grupo');
    return;
  }

  if (estudiantes.length === 0) {
    alert('Primero carga un archivo con estudiantes');
    return;
  }

  const copiaEstudiantes = [...estudiantes];
  copiaEstudiantes.sort(() => Math.random() - 0.5); // Se mezcla aleatoriamente

  const grupos = [];
  while (copiaEstudiantes.length > 0) {
    grupos.push(copiaEstudiantes.splice(0, groupSize));
  }

  // Mostrar resultado actual
  mostrarGrupos(grupos, document.getElementById('gruposResultado'));

  // Guardar en historial y persistir
  historial.push(grupos);
  localStorage.setItem('historialSorteos', JSON.stringify(historial));

  actualizarHistorial();
}

function mostrarGrupos(grupos, contenedor) {
  contenedor.innerHTML = '';
  grupos.forEach((grupo, index) => {
    const div = document.createElement('div');
    div.className = 'bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow';
    div.innerHTML = `
      <h2 class="text-lg font-semibold text-blue-700 mb-2">Grupo ${index + 1}</h2>
      <ul class="list-disc ml-6 text-gray-700">${grupo.map(n => `<li>${n}</li>`).join('')}</ul>
    `;
    contenedor.appendChild(div);
  });
}

function actualizarHistorial() {
  const contenedorHistorial = document.getElementById('contenedorHistorial');
  contenedorHistorial.innerHTML = '';

  historial.forEach((grupos, index) => {
    const div = document.createElement('div');
    div.className = 'bg-white border border-gray-300 rounded p-4 shadow';
    div.innerHTML = `<h3 class="font-bold text-gray-800 mb-2">Sorteo #${index + 1}</h3>`;

    grupos.forEach((grupo, i) => {
      div.innerHTML += `
        <div class="mb-2">
          <h4 class="font-semibold text-blue-600">Grupo ${i + 1}</h4>
          <ul class="list-disc ml-6 text-gray-700">
            ${grupo.map(n => `<li>${n}</li>`).join('')}
          </ul>
        </div>
      `;
    });

    contenedorHistorial.appendChild(div);
  });
}

function borrarHistorial() {
  if (confirm('¿Estás seguro de que deseas borrar todo el historial de sorteos?')) {
    historial = [];
    localStorage.removeItem('historialSorteos');
    document.getElementById('contenedorHistorial').innerHTML = '';
    alert('Historial borrado correctamente.');
  }
}

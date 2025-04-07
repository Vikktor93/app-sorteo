let estudiantes = [];

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
  copiaEstudiantes.sort(() => Math.random() - 0.5); // Selección Random

  const gruposResultado = document.getElementById('gruposResultado');
  gruposResultado.innerHTML = ''; // Limpiar contenido anterior

  let grupoNumero = 1;
  while (copiaEstudiantes.length > 0) {
    const grupo = copiaEstudiantes.splice(0, groupSize);
    const div = document.createElement('div');
    div.className = 'bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow';

    div.innerHTML = `
      <h2 class="text-lg font-semibold text-blue-700 mb-2">Grupo ${grupoNumero++}</h2>
      <ul class="list-disc ml-6 text-gray-700">${grupo.map(n => `<li>${n}</li>`).join('')}</ul>
    `;

    gruposResultado.appendChild(div);
  }
}

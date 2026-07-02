console.log('✅ JS cargado');

const personajes = [
    { id: 1, nombre: "A-Bomb", imagen: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg" },
    { id: 2, nombre: "Abe Sapien", imagen: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg" },
    { id: 3, nombre: "Abin Sur", imagen: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/3-abin-sur.jpg" },
    { id: 4, nombre: "Abomination", imagen: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg" },
    { id: 5, nombre: "Abraxas", imagen: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/5-abraxas.jpg" }
];
// Renderizar los cards en el contenedor para que se vean en la página//
function renderizarCards(lista) {
    // Obtener el contenedor de los cards y limpiar su contenido previo//
    const contenedor = document.getElementById('contenedorCards');
    contenedor.innerHTML = '';
    // Iterar sobre la lista de personajes y crear un card para cada uno// iterar es recorrer cada elemento de la lista y hacer algo con cada uno// iteramos con forEach que es un metodo de los arrays que nos permite recorrer cada elemento de la lista y hacer algo con cada uno//
    lista.forEach(({ id, nombre, imagen }) => {
        // Crear un elemento div para el card y asignarle la clase col para que se vea bien en la grilla de Bootstrap//
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
    <div class="card h-100">
        <img src="${imagen}" class="card-img-top" alt="${nombre}">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${nombre}</h5>
            <button class="btn btn-danger mt-auto btn-eliminar" data-id="${id}">
                Eliminar
            </button>
        </div>
    </div>
`;
        //aqui agregamos el card al contenedor de los cards para que se vea en la página//
        contenedor.appendChild(div);
    });
}
// Llamar a la función para renderizar los cards al cargar la página//
renderizarCards(personajes);

const contenedorCards = document.getElementById('contenedorCards');

contenedorCards.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
        const id = Number(e.target.dataset.id);
        const index = personajes.findIndex(p => p.id === id);
        personajes.splice(index, 1);
        renderizarCards(personajes);
    }
});
const formAgregar = document.getElementById('formAgregar');

formAgregar.addEventListener('submit', (e) => {
    e.preventDefault(); // evita que la página se recargue al enviar el formulario

    const inputNombre = document.getElementById('inputNombre');
    const inputImagen = document.getElementById('inputImagen');

    const nuevoPersonaje = {
        id: Date.now(), // genera un número único basado en la fecha/hora actual
        nombre: inputNombre.value.trim(),
        imagen: inputImagen.value.trim()
    };

    personajes.push(nuevoPersonaje);
    renderizarCards(personajes);

    formAgregar.reset(); // limpia los campos del formulario
});
const inputFiltro = document.getElementById('inputFiltro');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimpiar = document.getElementById('btnLimpiar');

btnFiltrar.addEventListener('click', () => {
    const texto = inputFiltro.value.toLowerCase().trim();

    const filtrados = personajes.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    renderizarCards(filtrados);
});

btnLimpiar.addEventListener('click', () => {
    inputFiltro.value = '';
    renderizarCards(personajes);
});

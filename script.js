document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.card-destino');
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    function normalizarTexto(texto) {
        if (!texto) return "";
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function aplicarFiltrosYBusqueda() {
        const botonesActivos = document.querySelectorAll('.filter-btn.active-filter');
        let categoriasActivas = [];
        botonesActivos.forEach(boton => {
            categoriasActivas.push(boton.getAttribute('data-filter').trim().toLowerCase());
        });

        const query = normalizarTexto(searchInput ? searchInput.value : "");

        destinationCards.forEach(card => {
            const categoriaTarjeta = card.getAttribute('data-category') ? card.getAttribute('data-category').trim().toLowerCase() : "";
            const nombreTarjeta = normalizarTexto(card.getAttribute('data-name'));

            const coincideCategoria = (categoriasActivas.length === 0) || categoriasActivas.includes(categoriaTarjeta);
            const coincideBusqueda = (query === "") || nombreTarjeta.includes(query);

            if (coincideCategoria && coincideBusqueda) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active-filter');
                aplicarFiltrosYBusqueda();
            });
        });
    }

    if (searchButton) searchButton.addEventListener('click', aplicarFiltrosYBusqueda);
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') aplicarFiltrosYBusqueda();
        });
    }
});
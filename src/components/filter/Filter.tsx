import React from "react";
import "./index.css";
export default function FilterComponent() {
    return (
        <aside>
            <input
                type="checkbox"
                id="menuToggle"
                className="menu-toggle visually-hidden"
            />
            <label htmlFor="menuToggle" className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
            </label>

            <div id="filterContainer">
                <h2>Métodos de Filtrado</h2>

                <label htmlFor="searchInput">Búsqueda:</label>
                <input type="text" id="searchInput" placeholder="Buscar..." />

                <h3>Categorías:</h3>
                <ul id="categoryFilter">
                    <li>
                        <input
                            type="checkbox"
                            id="category1"
                            value="categoria1"
                        />
                        <label htmlFor="category1">Categoría 1</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="category2"
                            value="categoria2"
                        />
                        <label htmlFor="category2">Categoría 2</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="category3"
                            value="categoria3"
                        />
                        <label htmlFor="category3">Categoría 3</label>
                    </li>
                </ul>

                <h3>Disponibilidad:</h3>
                <ul id="availabilityFilter">
                    <li>
                        <input
                            type="checkbox"
                            id="available"
                            value="available"
                        />
                        <label htmlFor="available">Disponible</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="outOfStock"
                            value="outOfStock"
                        />
                        <label htmlFor="outOfStock">Agotado</label>
                    </li>
                </ul>

                <h3>Precio:</h3>
                <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="100"
                    step="1"
                />
                <span id="priceValue"></span>
            </div>
        </aside>
    );
}


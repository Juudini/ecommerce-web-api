/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Filter from "../filter/Filter";

export default function ProductComponent() {
    const [products, setProducts] = useState([]);
    const [expandedProductId, setExpandedProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/products"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.payload);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const toggleDescription = (productId: any) => {
        setExpandedProductId(
            expandedProductId === productId ? null : productId
        );
    };
    return (
        <main className="content space-y-5">
            {/* //Todo give categories to Filter component */}
            <Filter />
            <div className="products-content">
                <div id="products" className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        {products.map((product: any) => (
                            <div key={product.id} className="cards">
                                <div className="product">
                                    {product.product_images.length > 0 ? (
                                        <img
                                            src={product.product_images[0].url}
                                            alt={product.title}
                                            className="rounded-lg shadow-lg "
                                            draggable="false"
                                        />
                                    ) : (
                                        <img
                                            src="https://pbs.twimg.com/media/EUXVBu5WoAA46ua.jpg"
                                            alt="Placeholder"
                                            className="rounded-lg shadow-lg"
                                            draggable="false"
                                        />
                                    )}

                                    <p className="product-category">
                                        {product.categories
                                            .map(
                                                (category: any) =>
                                                    category.title
                                            )
                                            .join(", ")}
                                    </p>
                                    <p className="product-title">
                                        {product.title}
                                    </p>
                                    <p className="product-price">
                                        ${product.price}
                                    </p>
                                    <button
                                        className="details-button"
                                        onClick={() =>
                                            toggleDescription(product.id)
                                        }>
                                        Ver más
                                    </button>
                                    {expandedProductId === product.id && (
                                        <div>
                                            <p className="text-gray-800">
                                                Descripción:{" "}
                                                {product.description}
                                            </p>
                                            <p>Stock: {product.inStock}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}


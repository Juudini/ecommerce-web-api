/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product: any) => (
                <div
                    key={product.id}
                    className="card w-full bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        {product.product_images.length > 0 ? (
                            <img
                                src={product.product_images[0].url}
                                alt={product.title}
                                className="rounded-xl"
                            />
                        ) : (
                            <img
                                src="https://pbs.twimg.com/media/EUXVBu5WoAA46ua.jpg"
                                alt="Placeholder"
                                className="rounded-xl"
                            />
                        )}
                    </figure>
                    <div className="card-body items-center text-center">
                        <p className="text-sm">
                            {product.categories
                                .map((category: any) => category.title)
                                .join(", ")}
                        </p>
                        <p className="text-xl">{product.title}</p>
                        <p>Precio: ${product.price}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => toggleDescription(product.id)}>
                            Ver más
                        </button>
                        {expandedProductId === product.id && (
                            <div>
                                <p>Descripción: {product.description}</p>

                                <p>Stock: {product.inStock}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}


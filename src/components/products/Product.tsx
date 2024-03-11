/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable @next/next/no-img-element */
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-14">
            {products.map((product: any) => (
                <div
                    key={product.id}
                    className="w-full rounded-lg overflow-hidden group hover:border hover:border-2 hover:border-gray-500/75 hover:bg-[#f0f0f0]">
                    <div className="px-24">
                        <figure className="px-2 pt-2">
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
                        </figure>
                        <div className="card-body items-center text-center p-1">
                            <p className="text-sm group-hover:text-[#555]">
                                {product.categories
                                    .map((category: any) => category.title)
                                    .join(", ")}
                            </p>
                            <p className="text-lg group-hover:text-[#555]">
                                {product.title}
                            </p>
                            <p className="text-[#d06e6a] group-hover:text-[#666]">
                                Precio: ${product.price}
                            </p>
                            <button
                                className="btn"
                                onClick={() => toggleDescription(product.id)}>
                                Ver más
                            </button>
                            {expandedProductId === product.id && (
                                <div>
                                    <p className="text-gray-800">
                                        Descripción: {product.description}
                                    </p>
                                    <p>Stock: {product.inStock}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


import React from "react";

// Array de productos de ejemplo
const products = [
    {
        id: 1,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata2.jpg",
    },
    {
        id: 2,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata3.jpg",
    },
    {
        id: 3,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata1.jpg",
    },
    {
        id: 1,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata2.jpg",
    },
    {
        id: 2,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata3.jpg",
    },
    {
        id: 3,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata1.jpg",
    },
    {
        id: 1,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata2.jpg",
    },
    {
        id: 2,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata3.jpg",
    },
    {
        id: 3,
        category: "Manga",
        title: "Amor de gata",
        price: 3600.0,
        imageUrl:
            "https://juudini-re-main.netlify.app/src/imgs/manga/amordegata/amordegata1.jpg",
    },
];

export default function ProductComponent() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="card w-full bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <p className="text-sm">{product.category}</p>
                        <p className="text-xl">{product.title}</p>

                        <p>Precio: ${product.price}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Ver más</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


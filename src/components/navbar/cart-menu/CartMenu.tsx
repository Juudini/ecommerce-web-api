import React from "react";

export const CartMenu = () => {
    return (
        <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                        View cart
                    </button>
                </div>
            </div>
        </div>
    );
};


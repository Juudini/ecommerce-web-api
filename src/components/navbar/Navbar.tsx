import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "./categories-menu/CategoryMenu";
import { CartMenu } from "./cart-menu/CartMenu";
import { ProfileMenu } from "./profile-menu/ProfileMenu";

export default function NavbarComponent() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <CategoryMenu />{" "}
                </div>
                <Link className="btn btn-ghost text-xl" href="">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c6/RE-MAIN_Anime_Logo.png"
                        height={100}
                        width={100}
                        alt=""></Image>
                </Link>
            </div>

            <div className="flex-none navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="badge badge-sm indicator-item">
                                8
                            </span>
                        </div>
                    </div>
                    <CartMenu />
                </div>
                <ProfileMenu />
            </div>
        </div>
    );
}


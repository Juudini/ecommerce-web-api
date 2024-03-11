import NavbarComponent from "@/components/navbar/Navbar";
import ProductComponent from "@/components/products/Product";

export default function Home() {
    return (
        <div data-theme="nord">
            <NavbarComponent />
            <main className="flex min-h-screen p-4">
                <ProductComponent />
            </main>
        </div>
    );
}


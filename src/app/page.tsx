import NavbarComponent from "@/components/navbar/Navbar";
import ProductComponent from "@/components/products/Product";

export default function Home() {
    return (
        <div data-theme="nord">
            <NavbarComponent />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <ProductComponent />
            </main>
        </div>
    );
}


/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/next-script-for-ga */
// eslint-disable-next-line react/no-unescaped-entities
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const bodyFont = Poppins({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://remain.com"),
    alternates: {
        canonical: "/",
        languages: { es: "/es", en: "/en" },
    },
    robots: { index: true, follow: true },
    title: "Re-Main | Ecommerce",
    description: "Ecommerce",
    openGraph: {
        type: "website",
        siteName: "Re-Main",
        url: "https://remain.com",
        title: "Re-Main | Ecommerce",
        description: "Ecommerce",
        images: ["https://Re-Maindigital.com/assets/home-android-phone.webp"],
    },
    twitter: {
        title: "Re-Main | Ecommerce",
        description: "Ecommerce",
        card: "summary_large_image",
        creator: "Re-Main",
        site: "https://Re-Maindigital.com",
        images: ["https://Re-Maindigital.com/assets/home-android-phone.webp"],
    },
    applicationName: "Re-Main",
    keywords: ["Ecommerce", "Books", "Manga", "Manwha", "Novels", "Re-Main"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={bodyFont.className}>{children}</body>
        </html>
    );
}


"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="pt-48 pb-24 container-wide">
                <h1 className="text-6xl font-black text-dark mb-12 tracking-tighter">Terms of Service</h1>
                <div className="prose prose-lg text-dark/60 font-secondary max-w-4xl space-y-8">
                    <p>Effective Date: April 2026</p>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Institutional Engagement</h2>
                        <p>By accessing the RiseMate Venture portal, you agree to engage with our sovereign entities in accordance with institutional best practices.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">2. Intellectual Capital</h2>
                        <p>All architectural designs, digital legacy content, and entity taglines are the intellectual capital of RiseMate Venture.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

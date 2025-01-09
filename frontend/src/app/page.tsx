import React from 'react';
import NavBar from "@/components/Navbar";
import {RdvForm} from "@/components/RdvForm";
import {RdvList} from "@/components/RdvList";

const App: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            <NavBar/>

            <main className="text-center px-6 py-16">
                <h1 className="text-5xl font-bold mb-8 leading-snug">
                    Agenda en ligne professionnel pour Coach Sportif <br/>
                    <span className="text-red-500">Réserver vos rendez-vous, de coach sportif   </span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                    Notre plateforme SaaS puissante vous permet de proposer un service ultra performant de prise de
                    rendez-vous en ligne.
                </p>
            </main>

            <RdvForm/>
            <RdvList/>
        </div>
    );
}

export default App;
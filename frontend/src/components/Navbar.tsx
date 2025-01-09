import React from "react";

export default function NavBar() {
    return (
        <header className="flex justify-between items-center px-8 py-6 shadow-md">
            <div className="text-2xl font-bold text-gray-800"><a href="/">Non moi je suis coach</a></div>
            <nav>
                <ul className="flex space-x-6 text-gray-700">
                    <li><a href="/rdvs" className="hover:text-red-500">Services</a></li>
                    <li><a href="#" className="hover:text-red-500">Tarifs</a></li>
                    <li><a href="/login" className="hover:text-red-500">Connection</a></li>
                </ul>
            </nav>
            <a href="/register"
               className="bg-red-500 text-white px-5 py-2 rounded-md shadow-lg hover:bg-red-600">Inscription</a>
        </header>
    );
}

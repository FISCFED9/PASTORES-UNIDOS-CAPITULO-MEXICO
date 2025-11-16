
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'El Congreso' },
    { href: '#speakers', label: 'Ponentes' },
    { href: '#sponsors', label: 'Alianzas' },
    { href: '#register', label: 'Registro' },
  ];

  return (
    <header className="bg-gradient-to-r from-[#8a0000] to-[#4d0000] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-xl font-bold font-serif tracking-wider">Pastores Unidos</a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-yellow-300 transition duration-300 ease-in-out font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#4d0000]">
          <nav className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="py-2 px-4 text-lg hover:bg-[#8a0000] w-full text-center transition duration-300 ease-in-out" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

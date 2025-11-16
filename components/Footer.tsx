import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2c0000] text-gray-300">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-white font-serif mb-4">Pastores Unidos México</h3>
            <p className="text-sm">Uniendo y equipando a los líderes de la iglesia para un impacto nacional.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-yellow-300">El Congreso</a></li>
              <li><a href="#speakers" className="hover:text-yellow-300">Ponentes</a></li>
              <li><a href="#sponsors" className="hover:text-yellow-300">Alianzas</a></li>
              <li><a href="#register" className="hover:text-yellow-300">Registro</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <p className="text-sm">Email: contacto@pastoresunidos.mx</p>
            <p className="text-sm">Tel: +52 55 1234 5678</p>
            <p className="text-sm">Dirección: Centro de Convenciones, Ciudad de México</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:text-yellow-300 text-sm">Facebook</a>
              <a href="#" className="hover:text-yellow-300 text-sm">Instagram</a>
              <a href="#" className="hover:text-yellow-300 text-sm">X (Twitter)</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Pastores Unidos Capítulo México. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
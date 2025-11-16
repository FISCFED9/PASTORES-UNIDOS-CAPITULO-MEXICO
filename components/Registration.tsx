
import React, { useState, useMemo } from 'react';
import type { Ticket } from '../types';

// UI Components (defined locally to avoid creating new files)
const MagicWandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278V2.75M12 21.25V17.7472M17.7472 12H21.25M2.75 12H6.25278M16.0355 7.96447L18.5355 5.46447M5.46447 18.5355L7.96447 16.0355M16.0355 16.0355L18.5355 18.5355M5.46447 5.46447L7.96447 7.96447M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" />
    </svg>
);
const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const MagicEditButton: React.FC<{ onClick: () => void; isLoading: boolean; label: string; }> = ({ onClick, isLoading, label }) => (
    <div className="absolute top-4 right-4 z-40 group">
        <button onClick={onClick} disabled={isLoading} className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed" aria-label={`Generate new content for ${label} section`}>
            {isLoading ? <LoadingSpinner /> : <MagicWandIcon />}
        </button>
        <div role="tooltip" className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            Regenerar Registro
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
        </div>
    </div>
);

// Icon Components
const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const ChurchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V10.75M19 10.75L12 3L5 10.75M19 10.75H5M4 21h16m-4-7v7m-4-7v7" />
    </svg>
);

interface RegistrationProps {
  content: {
    title: string;
    description: string;
    ticket: Ticket;
  };
  onGenerate: () => void;
  isLoading: boolean;
}

const Registration: React.FC<RegistrationProps> = ({ content, onGenerate, isLoading }) => {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', church: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const TICKET_PRICE = content.ticket;
  const totalPrice = useMemo(() => TICKET_PRICE.price * quantity, [quantity, TICKET_PRICE]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, quantity, totalPrice });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <section id="register" className="py-20 bg-gradient-to-r from-[#8a0000] to-[#4d0000] text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">¡Gracias por registrarte!</h2>
                <p className="text-xl mb-6">Hemos enviado un correo de confirmación a <strong>{formData.email}</strong> con los detalles de tu compra.</p>
                <p className="text-lg">¡Nos vemos en el congreso!</p>
            </div>
        </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-gradient-to-r from-[#8a0000] to-[#4d0000] text-white relative">
      <MagicEditButton onClick={onGenerate} isLoading={isLoading} label="Registration" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">{content.title}</h2>
          <p className="text-lg text-yellow-200 mt-2">{content.description}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#fdfbf5] text-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-[#4d0000]">Formulario de Registro</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
                    <div className="relative text-gray-400 focus-within:text-[#8a0000]">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <div className="relative group">
                          <UserIcon />
                          <div role="tooltip" className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Ingresa tu nombre completo
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                          </div>
                        </div>
                       </span>
                      <input type="text" id="name" name="name" onChange={handleInputChange} value={formData.name} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0000] focus:border-transparent transition-all duration-300" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                     <div className="relative text-gray-400 focus-within:text-[#8a0000]">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                         <div className="relative group">
                          <MailIcon />
                          <div role="tooltip" className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Ingresa tu correo electrónico
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                          </div>
                         </div>
                       </span>
                      <input type="email" id="email" name="email" onChange={handleInputChange} value={formData.email} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0000] focus:border-transparent transition-all duration-300" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="church" className="block text-gray-700 font-bold mb-2">Iglesia / Ministerio</label>
                    <div className="relative text-gray-400 focus-within:text-[#8a0000]">
                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                         <div className="relative group">
                           <ChurchIcon />
                           <div role="tooltip" className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                              Nombre de tu iglesia o ministerio
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                           </div>
                         </div>
                       </span>
                      <input type="text" id="church" name="church" onChange={handleInputChange} value={formData.church} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0000] focus:border-transparent transition-all duration-300" required />
                    </div>
                  </div>
                </div>

              </div>

              <div className="md:w-1/2 p-8 bg-gray-50 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-center text-[#4d0000]">Resumen de Compra</h3>
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">{TICKET_PRICE.name}</span>
                    <span className="text-lg font-bold">${TICKET_PRICE.price.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <label htmlFor="quantity" className="text-lg font-medium">Cantidad</label>
                    <div className="flex items-center">
                      <button type="button" onClick={() => handleQuantityChange(-1)} className="bg-gray-200 px-3 py-1 rounded-l-lg font-bold hover:bg-gray-300 transition-colors">-</button>
                      <input type="text" id="quantity" value={quantity} readOnly className="w-12 text-center border-t border-b border-gray-200 bg-white" />
                      <button type="button" onClick={() => handleQuantityChange(1)} className="bg-gray-200 px-3 py-1 rounded-r-lg font-bold hover:bg-gray-300 transition-colors">+</button>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-[#8a0000]">${totalPrice.toLocaleString('es-MX')} MXN</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;

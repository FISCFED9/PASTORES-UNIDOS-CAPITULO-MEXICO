
import React, { useState, useEffect } from 'react';

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
            Regenerar Hero
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
        </div>
    </div>
);
const LoadingOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-30">
        <div className="text-white text-center p-4">
            <svg className="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold">Generando nuevo contenido...</p>
        </div>
    </div>
);

interface HeroProps {
  content: {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    description: string;
    cta: string;
    backgroundImage: string;
  };
  onGenerate: () => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ content, onGenerate, isLoading }) => {
  const calculateTimeLeft = () => {
    const eventDate = new Date('2024-12-19T09:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // FIX: Changed type from JSX.Element[] to React.ReactElement[] to resolve namespace error.
  const timerComponents: React.ReactElement[] = Object.keys(timeLeft).map((interval) => {
    const value = timeLeft[interval as keyof typeof timeLeft];
    return (
     <div key={interval} className="text-center">
        <span className="text-3xl md:text-5xl font-bold">{String(value || 0).padStart(2, '0')}</span>
        <span className="block text-xs md:text-sm uppercase tracking-widest">{interval}</span>
    </div>
    );
  });

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${content.backgroundImage}')` }}
    >
      {isLoading && <LoadingOverlay />}
      <MagicEditButton onClick={onGenerate} isLoading={isLoading} label="Hero" />

      <div className="text-center z-10 p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
          {content.title} 
          <span className="block text-xl md:text-2xl mt-2 font-serif tracking-wider">{content.subtitle}</span>
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto my-6"></div>
        <p className="text-lg md:text-xl mb-4 font-light">{content.date} | {content.location}</p>
        <p className="max-w-3xl mx-auto mb-8 text-base md:text-lg uppercase">
          {content.description}
        </p>

        {timerComponents.length ? (
            <div className="max-w-xl mx-auto mb-8">
                <div className="grid grid-cols-4 gap-4 bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-white/20">
                    {timerComponents}
                </div>
            </div>
        ) : (
            <p className="my-8 text-2xl font-bold text-yellow-400">¡El evento ha comenzado!</p>
        )}
        
        <a 
          href="#register" 
          className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 shadow-xl"
        >
          {content.cta}
        </a>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#4d0000] via-transparent to-transparent opacity-70"></div>
    </section>
  );
};

export default Hero;

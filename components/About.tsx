import React from 'react';

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
            Regenerar Sobre
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
        </div>
    </div>
);
const LoadingOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-30">
        <div className="text-gray-800 text-center p-4">
            <svg className="animate-spin h-10 w-10 text-[#8a0000] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold">Generando nuevo contenido...</p>
        </div>
    </div>
);


const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8a0000] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8a0000] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface AboutProps {
  content: {
    title: string;
    description: string;
    topicsTitle: string;
    topics: string[];
    image: string;
    date: string;
    location: string;
  };
  onGenerate: () => void;
  isLoading: boolean;
}


const About: React.FC<AboutProps> = ({ content, onGenerate, isLoading }) => {
    return (
        <section id="about" className="py-20 bg-[#fdfaf6] relative">
            {isLoading && <LoadingOverlay />}
            <MagicEditButton onClick={onGenerate} isLoading={isLoading} label="About" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">{content.title}</h2>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                        {content.description}
                    </p>
                    <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src={content.image} alt="Pastores reunidos" className="rounded-lg shadow-2xl w-full" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#4d0000]">{content.topicsTitle}</h3>
                        <ul className="space-y-3 text-gray-700">
                            {content.topics.map((topic, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-16 text-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex justify-center"><CalendarIcon /></div>
                        <h4 className="text-xl font-bold text-gray-800">Fecha del Evento</h4>
                        <p className="text-gray-600 text-lg mt-2">{content.date}</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex justify-center"><LocationIcon /></div>
                        <h4 className="text-xl font-bold text-gray-800">Ubicación</h4>
                        <p className="text-gray-600 text-lg mt-2">{content.location}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
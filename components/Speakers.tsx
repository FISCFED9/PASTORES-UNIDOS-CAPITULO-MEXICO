import React from 'react';
import type { Speaker } from '../types';

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
            Regenerar Ponentes
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
            <p className="text-lg font-semibold">Generando nuevos ponentes...</p>
        </div>
    </div>
);


const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <img className="w-full h-56 object-cover object-center" src={speaker.imageUrl} alt={speaker.name} />
            <div className="p-6">
                <h3 className="text-xl font-bold text-[#4d0000]">{speaker.name}</h3>
                <p className="text-yellow-600 font-semibold text-sm mt-1">{speaker.title}</p>
                <p className="text-gray-600 mt-4 text-sm">{speaker.bio}</p>
            </div>
        </div>
    );
};

interface SpeakersProps {
    content: {
        title: string;
        description: string;
        speakersList: Speaker[];
    };
    onGenerate: () => void;
    isLoading: boolean;
}

const Speakers: React.FC<SpeakersProps> = ({ content, onGenerate, isLoading }) => {
  return (
    <section id="speakers" className="py-20 bg-gradient-to-b from-[#fdfaf6] to-[#fef8f0] relative">
      {isLoading && <LoadingOverlay />}
      <MagicEditButton onClick={onGenerate} isLoading={isLoading} label="Speakers" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{content.title}</h2>
          <p className="text-lg text-gray-600 mt-2">{content.description}</p>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.speakersList.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
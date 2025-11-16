
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Donors from './components/Donors';
import Testimonials from './components/Testimonials';
import Registration from './components/Registration';
import Footer from './components/Footer';
import type { Speaker, Sponsor, Testimonial, Ticket } from './types';
// FIX: Removed unused `Type` enum to prevent potential runtime errors with enums.
import { GoogleGenAI } from "@google/genai";

const initialContent = {
  hero: {
    title: "Primer Congreso Nacional de Pastores Unidos",
    subtitle: "Capítulo México",
    date: "19 de Diciembre",
    location: "Ciudad de México",
    description: "Líderes pastores dialogando sobre temas de los derechos humanos y el derecho a profesar la religión cristiana, el futuro de la religión cristiana en México, los retos de la fe, la fe en los tiempos actuales en México entre otros temas de importancia nacional.",
    cta: "Regístrate Ahora",
    backgroundImage: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1920&auto=format&fit=crop",
  },
  about: {
    title: "Un Encuentro Trascendental",
    description: "Este congreso es una convocatoria para todos los pastores de México a unirse en un diálogo crucial sobre el presente y futuro de nuestra fe y nación.",
    topicsTitle: "Temas Clave a Tratar:",
    topics: [
      "La visión de los pastores para un México transformado.",
      "Retos de los cristianos ante el nuevo panorama del gobierno.",
      "La religión como un derecho humano fundamental y de libre expresión.",
      "La necesidad de un representante permanente ante la Comisión de Derechos Humanos.",
      "Libertad de culto en la educación y la esfera pública.",
    ],
    image: "https://picsum.photos/600/400?random=1",
    date: "19 de Diciembre, 2024",
    location: "Centro de Convenciones, Ciudad de México",
  },
  speakers: {
      title: "Nuestros Ponentes",
      description: "Voces de experiencia y sabiduría para guiar el diálogo.",
      speakersList: [
        { name: 'Dr. Samuel Rojas', title: 'Líder en Ministerio Pastoral y Visión', bio: 'Con más de 30 años de experiencia, el Dr. Rojas compartirá su visión para el liderazgo pastoral en el siglo XXI.', imageUrl: 'https://picsum.photos/id/1005/400/400' },
        { name: 'Lic. Elena Vázquez', title: 'Experta en Derecho Constitucional y Religión', bio: 'La Lic. Vázquez analizará el marco legal actual de los derechos humanos y la libertad de culto en México.', imageUrl: 'https://picsum.photos/id/1011/400/400' },
        { name: 'Pastor David Chen', title: 'Estratega en Crecimiento de Iglesias', bio: 'El Pastor Chen presentará estrategias innovadoras para enfrentar los retos del cristianismo en la sociedad moderna.', imageUrl: 'https://picsum.photos/id/1025/400/400' },
        { name: 'Mtra. Isabel Fuentes', title: 'Socióloga y Analista de Tendencias Religiosas', bio: 'La Maestra Fuentes ofrecerá una perspectiva académica sobre el panorama religioso actual y sus implicaciones futuras.', imageUrl: 'https://picsum.photos/id/1027/400/400' },
      ]
  },
  sponsors: {
      title: "Alianzas Estratégicas",
      description: "Agradecemos a las organizaciones que hacen posible este evento.",
      sponsorsList: Array.from({ length: 48 }, (_, i) => ({ id: i + 1, name: `Sponsor ${i + 1}`, imageUrl: `https://picsum.photos/200/100?random=${i + 1}&grayscale` })),
  },
  donors: {
      title: "A Nuestros Donantes",
      description: "Su generosidad y apoyo son el pilar que sostiene esta visión. ¡Gracias por sembrar en este ministerio!",
      tiers: {
        gold: ["Familia González", "Ministerios 'Luz del Mundo'"],
        silver: ["Comunidad Cristiana 'El Redentor'", "Empresarios con Propósito A.C.", "Fundación 'Fe y Obras'"],
        bronze: ["Iglesia Bautista 'Renacer'", "Jóvenes en Victoria", "Anónimo"],
      }
  },
  testimonials: {
      title: "Testimonios",
      description: "Lo que otros líderes dicen sobre este encuentro.",
      testimonialsList: [
        { quote: "Este congreso es una cita obligada. Los temas son relevantes y la comunión entre pastores es invaluable para el ministerio.", author: "Pastor Juan Carlos Mendoza", church: "Iglesia 'Vida Nueva', Monterrey" },
        { quote: "Cada año salgo renovado y con una visión más clara. Es un espacio de edificación y estrategia fundamental para la iglesia en México.", author: "Pastora Ana Sofía López", church: "Centro Cristiano 'Impacto', Guadalajara" },
        { quote: "La calidad de los ponentes y la profundidad de los diálogos nos preparan para los desafíos que enfrentamos como líderes espirituales.", author: "Apóstol Ricardo Jiménez", church: "Ministerio Internacional 'El Shaddai', CDMX" },
      ]
  },
  registration: {
    title: "Asegura tu Lugar",
    description: "El cupo es limitado. ¡No te quedes fuera de este evento histórico!",
    ticket: { name: 'Entrada General', price: 500 },
  }
};

const App: React.FC = () => {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState({
    hero: false,
    about: false,
    speakers: false,
    sponsors: false,
    donors: false,
    testimonials: false,
    registration: false,
  });

  const handleGenerateContent = async (section: keyof typeof isLoading) => {
    setIsLoading(prev => ({ ...prev, [section]: true }));
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      let prompt = `You are a creative director for a Christian pastors' congress in Mexico called "Pastores Unidos Capítulo México". The tone should be formal, encouraging, professional, and inspiring. Generate new, compelling content for the "${section}" section of the landing page. Provide content in the specified JSON format.`;
      let schema: any;
      let generateImage = false;
      let aspectRatio = '16:9';

      switch (section) {
        case 'hero':
          prompt += " Also provide a creative and detailed prompt for an image generator to create a high-quality, inspiring background image relevant to a Christian pastors' congress in Mexico. The image should evoke unity, faith, and leadership.";
          // FIX: Use string literals for schema types to prevent potential runtime errors with enums.
          schema = {
            type: 'OBJECT', properties: {
              title: { type: 'STRING' },
              subtitle: { type: 'STRING' },
              dateAndLocation: { type: 'STRING' },
              description: { type: 'STRING' },
              cta: { type: 'STRING' },
              imagePrompt: { type: 'STRING' }
            }, required: ['title', 'subtitle', 'dateAndLocation', 'description', 'cta', 'imagePrompt']
          };
          generateImage = true;
          aspectRatio = '16:9';
          break;
        case 'about':
           prompt += " Also provide a creative and detailed prompt for an image generator to create a photo of diverse pastors in a collaborative and professional setting in Mexico.";
          // FIX: Use string literals for schema types to prevent potential runtime errors with enums.
          schema = {
            type: 'OBJECT', properties: {
              title: { type: 'STRING' },
              description: { type: 'STRING' },
              topicsTitle: { type: 'STRING' },
              topics: { type: 'ARRAY', items: { type: 'STRING' } },
              imagePrompt: { type: 'STRING' }
            }, required: ['title', 'description', 'topicsTitle', 'topics', 'imagePrompt']
          };
          generateImage = true;
          aspectRatio = '4:3';
          break;
        case 'speakers':
            prompt += " Generate a list of 4 diverse, fictional speakers. For each, provide their name, a credible title, a short bio, and a detailed prompt for a photorealistic, professional headshot."
            // FIX: Use string literals for schema types to prevent potential runtime errors with enums.
            schema = {
                type: 'OBJECT', properties: {
                    title: { type: 'STRING' },
                    description: { type: 'STRING' },
                    speakers: { type: 'ARRAY', items: {
                        type: 'OBJECT', properties: {
                            name: { type: 'STRING' }, title: { type: 'STRING' }, bio: { type: 'STRING' },
                            imagePrompt: { type: 'STRING' }
                        }, required: ['name', 'title', 'bio', 'imagePrompt']
                    }}
                }, required: ['title', 'description', 'speakers']
            };
            break;
        case 'testimonials':
            prompt += " Generate 3 fictional, powerful testimonials from pastors who attended previous events.";
            // FIX: Use string literals for schema types to prevent potential runtime errors with enums.
            schema = {
                type: 'OBJECT', properties: {
                    title: { type: 'STRING' },
                    description: { type: 'STRING' },
                    testimonials: { type: 'ARRAY', items: {
                        type: 'OBJECT', properties: {
                            quote: { type: 'STRING' }, author: { type: 'STRING' }, church: { type: 'STRING' }
                        }, required: ['quote', 'author', 'church']
                    }}
                }, required: ['title', 'description', 'testimonials']
            };
            break;
        default: // sponsors, donors, registration
            // FIX: Use string literals for schema types to prevent potential runtime errors with enums.
            schema = {
                type: 'OBJECT', properties: {
                    title: { type: 'STRING' },
                    description: { type: 'STRING' }
                }, required: ['title', 'description']
            };
            break;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", responseSchema: schema },
      });

      const jsonResponse = JSON.parse(response.text);
      
      let newContent = { ...content };

      if (section === 'hero') {
        const imageResponse = await ai.models.generateImages({ model: 'imagen-4.0-generate-001', prompt: jsonResponse.imagePrompt, config: { numberOfImages: 1, aspectRatio: '16:9' } });
        const image = `data:image/png;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
        const [date, location] = jsonResponse.dateAndLocation.split('|').map((s: string) => s.trim());
        newContent.hero = { ...jsonResponse, date, location, backgroundImage: image };
      } else if (section === 'about') {
        const imageResponse = await ai.models.generateImages({ model: 'imagen-4.0-generate-001', prompt: jsonResponse.imagePrompt, config: { numberOfImages: 1, aspectRatio: '4:3' } });
        const image = `data:image/png;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
        newContent.about = { ...content.about, ...jsonResponse, image };
      } else if (section === 'speakers') {
          const generatedSpeakers = await Promise.all(jsonResponse.speakers.map(async (speaker: any) => {
              const imageResponse = await ai.models.generateImages({ model: 'imagen-4.0-generate-001', prompt: speaker.imagePrompt, config: { numberOfImages: 1, aspectRatio: '1:1' } });
              const imageUrl = `data:image/png;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
              return { ...speaker, imageUrl };
          }));
          newContent.speakers = { title: jsonResponse.title, description: jsonResponse.description, speakersList: generatedSpeakers };
      } else if (section === 'testimonials') {
          newContent.testimonials = { title: jsonResponse.title, description: jsonResponse.description, testimonialsList: jsonResponse.testimonials };
      } else {
        newContent[section] = { ...content[section], ...jsonResponse };
      }
      
      setContent(newContent);

    } catch (error) {
      console.error(`Error generating content for ${section}:`, error);
      alert(`Failed to generate content for the ${section} section. Please try again.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [section]: false }));
    }
  };

  return (
    <div className="bg-[#fdfbf5] text-gray-800">
      <Header />
      <main>
        <Hero content={content.hero} onGenerate={() => handleGenerateContent('hero')} isLoading={isLoading.hero} />
        <About content={content.about} onGenerate={() => handleGenerateContent('about')} isLoading={isLoading.about} />
        <Speakers content={content.speakers} onGenerate={() => handleGenerateContent('speakers')} isLoading={isLoading.speakers} />
        <Sponsors content={content.sponsors} onGenerate={() => handleGenerateContent('sponsors')} isLoading={isLoading.sponsors}/>
        <Donors content={content.donors} onGenerate={() => handleGenerateContent('donors')} isLoading={isLoading.donors}/>
        <Testimonials content={content.testimonials} onGenerate={() => handleGenerateContent('testimonials')} isLoading={isLoading.testimonials} />
        <Registration content={content.registration} onGenerate={() => handleGenerateContent('registration')} isLoading={isLoading.registration} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

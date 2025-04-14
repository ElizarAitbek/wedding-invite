"use client";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Heart, Calendar, MapPin, Clock, Music, MicOff , X, Globe} from "lucide-react";
import CountdownTimer from "./components/countdown-timer";

import kg from './locales/kg.json';
import ru from './locales/ru.json';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function WeddingInvite() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("kg");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = language === "kg" ? kg : ru;

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/wedding-music.mp3");
      audioRef.current.loop = true;
    }
  }, []);

  const handlePlayMusic = (): void => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
    setShowModal(false);
  };

  const handleSkipMusic = (): void => {
    setShowModal(false);
  };

  const toggleAudio = (): void => {
    if (audioPlaying && audioRef.current) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };
  
  const toggleLanguage = (): void => {
    setLanguage(language === "kg" ? "ru" : "kg");
  };


  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
<main
      className={`min-h-screen text-gray-900 bg-gradient-to-b from-rose-50 to-white ${playfair.className}`}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="fixed z-50 top-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-rose-100 transition-all duration-300 flex items-center gap-2"
        aria-label="Change language"
      >
        <Globe size={20} className="text-rose-700" />
        <span className="text-sm font-medium text-rose-700">{language.toUpperCase()}</span>
      </button>

      {/* Music Permission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-rose-800">{t.music.title}</h3>
                <button 
                  onClick={handleSkipMusic}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="mb-6 text-gray-700">
                {t.music.question}
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSkipMusic}
                  className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {t.music.no}
                </button>
                <button
                  onClick={handlePlayMusic}
                  className="px-5 py-2 bg-rose-600 text-white rounded-full flex items-center gap-2 hover:bg-rose-700 transition-colors"
                >
                  <Music size={16} />
                  <span>{t.music.yes}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio control button */}
      {!showModal && (
        <button
          onClick={toggleAudio}
          className="fixed z-50 bottom-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-rose-100 transition-all duration-300"
          aria-label={audioPlaying ? "Pause music" : "Play music"}
        >
          {audioPlaying ? (
            <MicOff size={20} className="text-rose-700" />
          ) : (
            <Music size={20} className="text-rose-700" />
          )}
        </button>
      )}

      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center text-center h-screen px-4 overflow-hidden"
        style={{
          backgroundImage: "url(/wedding-bg.webp)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPositionY: `calc(50% + ${scrollY * 0.2}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        
        <motion.div
          className="relative z-10 px-6 py-10 rounded-lg backdrop-blur-sm bg-black/20 border border-white/20 w-11/12 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex justify-center mb-4"
          >
            <Heart size={32} className="text-rose-300" fill="rgba(244,63,94,0.2)" />
          </motion.div>

          <motion.p
            className="text-xl text-rose-200 mb-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {t.invitation.title}
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.2 }}
          >
            {t.invitation.names}
          </motion.h1>

          <motion.div
            className="h-px w-20 bg-rose-300 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 1.2, duration: 1 }}
          />

          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {t.invitation.subtitle}
          </motion.p>
          
          <motion.div
            className="mt-8 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <svg 
              className="w-6 h-6 mx-auto text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Invitation Message */}
      <section className={`py-16 px-4 ${cormorant.className}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className="flex justify-center"
              variants={animationVariants}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/invite-flower.jpeg"
                alt="Wedding flowers"
                width={300}
                height={300}
                className="rounded-full shadow-lg object-cover border-4 border-rose-100"
              />
            </motion.div>
            
            <motion.div
              className="text-center max-w-2xl mx-auto"
              variants={animationVariants}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-rose-800 mb-6">
                {t.message.title}
              </h2>
              <div className="bg-rose-50 p-8 rounded-2xl shadow-lg border border-rose-200 text-gray-800 text-lg leading-relaxed">
                <p>{t.message.content}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Countdown Section */}
      <section className="py-12 px-4 bg-rose-50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-rose-800 mb-8">
            {t.countdown.title}
          </h2>
          
          <CountdownTimer targetDate="2025-05-13T18:00:00" t={t} />
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="w-full md:w-1/2"
              variants={animationVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/invite-hall.jpeg"
                  alt="Wedding venue"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Ayar Grand Hall</h3>
                  <p className="text-sm text-gray-200">Фрунзе к. 133 Новопавловка, Бишкек</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
              variants={animationVariants}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-rose-800 mb-6 text-center">
                {t.details.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.details.date}</h4>
                    <p className="text-gray-700">{t.details.dateValue}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.details.time}</h4>
                    <p className="text-gray-700">{t.details.gathering}</p>
                    <p className="text-gray-700">{t.details.start}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="text-rose-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.details.venue}</h4>
                    <p className="text-gray-700 mb-2">Ayar Grand Hall</p>
                    <a
                      href="https://go.2gis.com/k2H8n"
                      className="inline-block bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.details.viewMap}
                    </a>
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-center italic text-gray-600">
                {t.details.note}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Final Section */}
      <section className="py-12 px-4 bg-rose-700 text-white text-center">
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.final.title}
          </h2>
          <p className="text-lg text-rose-100">
            {t.invitation.names}
          </p>
          <div className="mt-8 flex justify-center">
            <Heart size={32} fill="white" className="text-white animate-pulse" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}


import { useState } from 'react';
import { useHoverRefresh } from './hooks/useHoverRefresh.js';
import { useNodeCard } from './hooks/useNodeCard.js';
import { Header } from './components/Header/Header.jsx';
import { HeroSection } from './components/Hero/HeroSection.jsx';
import { DiagramSection } from './components/Diagram/DiagramSection.jsx';
import { ContactSection } from './components/Contact/ContactSection.jsx';
import { VideoModal } from './components/VideoModal/VideoModal.jsx';
import './globals.css';

export function App() {
  useHoverRefresh();
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const openTalk = () => setTalkModalOpen(true);
  const closeTalk = () => setTalkModalOpen(false);
  const nodeCard = useNodeCard();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DiagramSection onTalkClick={openTalk} nodeCard={nodeCard} />
        <ContactSection onTalkClick={openTalk} />
      </main>
      <VideoModal isOpen={talkModalOpen} onClose={closeTalk} />
    </>
  );
}

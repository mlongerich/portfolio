import { useState } from 'react';
import { useHoverRefresh } from './hooks/useHoverRefresh.js';
import { useNodeCard } from './hooks/useNodeCard.js';
import { Header } from './components/Header/Header.jsx';
import { HeroSection } from './components/Hero/HeroSection.jsx';
import { DiagramSection } from './components/Diagram/DiagramSection.jsx';
import { AboutSection } from './components/About/AboutSection.jsx';
import { ContactSection } from './components/Contact/ContactSection.jsx';
import { VideoModal } from './components/VideoModal/VideoModal.jsx';
import './globals.css';

export function App() {
  useHoverRefresh();
  const [talkModalOpen, setTalkModalOpen] = useState(false);
  const openTalk = () => setTalkModalOpen(true);
  const closeTalk = () => setTalkModalOpen(false);
  const nodeCard = useNodeCard();

  const handlePsRowClick = (nodeId) => {
    const nodeEl = document.querySelector(`[data-node="${nodeId}"]`);
    if (!nodeEl) return;
    nodeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const el = document.querySelector(`[data-node="${nodeId}"]`);
      if (el) nodeCard.handlers.pinCard(nodeId, el);
    }, 650);
  };

  return (
    <>
      <Header />
      <main>
        <HeroSection onPsRowClick={handlePsRowClick} />
        <DiagramSection onTalkClick={openTalk} nodeCard={nodeCard} />
        <AboutSection />
        <ContactSection onTalkClick={openTalk} />
      </main>
      <VideoModal isOpen={talkModalOpen} onClose={closeTalk} />
    </>
  );
}

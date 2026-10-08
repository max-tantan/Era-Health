import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Sparkle } from '../components/StickerIllustration';
import './CheckinPage.css';

type Message = {
  role: 'user' | 'ai';
  text: string;
  time: string;
};

function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

const initialMessages: Message[] = [
  {
    role: 'ai',
    text: 'Hai, Rina \u{1F44B} Aku Era, teman cerita kamu.\n\nGimana kabarmu hari ini? Cerita aja apa yang kamu rasakan — aku di sini buat dengerin, pelan-pelan aja.',
    time: now(),
  },
];

export default function CheckinPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(text: string) {
    const userMsg: Message = { role: 'user', text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        capek: 'Halo, Rasanya pasti berat ya. \n\nIstirahat itu penting, kamu udah hebat bisa bertahan sejauh ini. Coba tarik napas pelan-pelan, ya. \n\nKalau mau, kita bisa bahas apa yang bikin kamu capek hari ini.',
        sedih: 'Halo, \u{1F49B} Aku turut sedih dengarmu. \n\nNangis boleh kok, itu tanda kamu manusia. Yang penting kamu nggak sendiri — aku di sini buat dengerin ceritamu.\n\nApa yang terjadi? Cerita pelan-pelan aja.',
        senang: 'Halo, senang dengar kamu baik-baik aja hari ini! \u{1F31F}\n\nKadang kita lupa merayakan momen-momen kecil. Makasih udah berbagi kabar baik sama aku.\n\nApa hal terbaik yang terjadi hari ini?',
      };

      const lower = text.toLowerCase();
      let reply = responses.capek;
      if (lower.includes('senang') || lower.includes('bahagia') || lower.includes('happy') || lower.includes('baik')) {
        reply = responses.senang;
      } else if (lower.includes('sedih') || lower.includes('menangis') || lower.includes('kecewa')) {
        reply = responses.sedih;
      }

      const aiMsg: Message = { role: 'ai', text: reply, time: now() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <DashboardLayout>
      <div className="checkin">
        <motion.div
          className="checkin__header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
            <span className="checkin__header-title">check-in hari ini</span>
            <Sparkle delay={0} />
          </div>
          <span className="checkin__header-sub">ceritakan apa yang kamu rasakan, pelan-pelan aja</span>
        </motion.div>

        <div className="checkin__messages">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} index={i} />
          ))}

          {isTyping && (
            <motion.div
              className="chat-message chat-message--ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="chat-message__avatar chat-message__avatar--ai">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="15" stroke="#171717" strokeWidth="2" />
                  <path d="M11 20c0-2 1-4 5-4s5 2 5 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM15 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="#171717" />
                </svg>
              </div>
              <div className="chat-message__body">
                <span className="chat-message__name">era</span>
                <div className="chat-message__bubble chat-message__bubble--ai">
                  <span className="typing-dots">sedang mengetik</span>
                  <span className="typing-dots__dot">.</span>
                  <span className="typing-dots__dot">.</span>
                  <span className="typing-dots__dot">.</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="checkin__bottom">
          <div className="checkin__input-wrapper">
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

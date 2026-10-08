import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import MoodPicker from '../components/MoodPicker';
import StoryInput from '../components/StoryInput';
import CheckinReview from '../components/CheckinReview';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Sparkle } from '../components/StickerIllustration';
import { getMood } from '../lib/moods';
import './CheckinPage.css';

type Step = 'mood' | 'story' | 'review' | 'chat';

type Message = {
  role: 'user' | 'ai';
  text: string;
  time: string;
};

function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function buildAiOpening(moods: string[], story: string): string {
  const moodList = moods.map((m) => getMood(m).label).join(', ');
  let text = `Terima kasih sudah check-in hari ini.\n\nAku lihat hari ini kamu merasa: **${moodList}**.`;
  if (story.trim()) {
    text += `\n\nKamu juga menulis: "${story.trim()}"`;
  }
  text += `\n\nCeritakan lebih lanjut, ya — aku di sini buat dengerin.`;
  return text;
}

export default function CheckinPage() {
  const [searchParams] = useSearchParams();
  const moodParam = searchParams.get('mood');

  const [step, setStep] = useState<Step>(moodParam ? 'story' : 'mood');
  const [selectedMoods, setSelectedMoods] = useState<string[]>(moodParam ? [moodParam] : []);
  const [story, setStory] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSave() {
    const opening: Message = {
      role: 'ai',
      text: buildAiOpening(selectedMoods, story),
      time: now(),
    };

    const userSummary: Message = {
      role: 'user',
      text: `hari ini aku merasa ${selectedMoods.join(', ')}` + (story.trim() ? `. ${story.trim()}` : ''),
      time: now(),
    };

    setMessages([opening, userSummary]);
    setStep('chat');
  }

  function handleChatSend(text: string) {
    const userMsg: Message = { role: 'user', text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        capek: 'Rasanya pasti berat ya. \n\nIstirahat itu penting, kamu udah hebat bisa bertahan sejauh ini. Coba tarik napas pelan-pelan, ya. \n\nKalau mau, kita bisa bahas apa yang bikin kamu capek hari ini.',
        sedih: 'Aku turut sedih dengarmu. \n\nNangis boleh kok, itu tanda kamu manusia. Yang penting kamu nggak sendiri — aku di sini buat dengerin ceritamu.\n\nApa yang terjadi? Cerita pelan-pelan aja.',
        senang: 'senang dengar kamu baik-baik aja hari ini!\n\nKadang kita lupa merayakan momen-momen kecil. Makasih udah berbagi kabar baik sama aku.\n\nApa hal terbaik yang terjadi hari ini?',
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
        <div className="checkin__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
            <span className="checkin__header-title">check-in hari ini</span>
            <Sparkle delay={0} />
          </div>
          <span className="checkin__header-sub">
            {step === 'mood' && 'pilih perasaan yang kamu rasakan'}
            {step === 'story' && 'cerita pelan-pelan aja'}
            {step === 'review' && 'pastikan semuanya sudah sesuai'}
            {step === 'chat' && 'ngobrol dengan era, teman ceritamu'}
          </span>
        </div>

        <div className="checkin__body">
          {step === 'mood' && (
            <MoodPicker
              selected={selectedMoods}
              onSelect={setSelectedMoods}
              onNext={() => setStep('story')}
            />
          )}

          {step === 'story' && (
            <StoryInput
              value={story}
              onChange={setStory}
              onNext={() => setStep('review')}
              onSkip={() => setStep('review')}
            />
          )}

          {step === 'review' && (
            <CheckinReview
              selectedMoods={selectedMoods}
              story={story}
              onSave={handleSave}
              onBack={() => setStep('mood')}
            />
          )}

          {step === 'chat' && (
            <>
              <div className="checkin__messages">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} index={i} />
                ))}

                {isTyping && (
                  <div className="chat-message chat-message--ai">
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
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="checkin__input-area">
                <ChatInput onSend={handleChatSend} disabled={isTyping} />
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

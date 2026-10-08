import { motion } from 'framer-motion';
import './ChatMessage.css';

type Message = {
  role: 'user' | 'ai';
  text: string;
  time?: string;
};

type ChatMessageProps = {
  message: Message;
  index: number;
};

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`chat-message chat-message--${message.role}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className={`chat-message__avatar chat-message__avatar--${message.role}`}>
        {isUser ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-charcoal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21c0-4.4-3.6-8-8-8s-8 3.6-8 8" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#171717" strokeWidth="2" />
            <path d="M11 20c0-2 1-4 5-4s5 2 5 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM15 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="#171717" />
          </svg>
        )}
      </div>

      <div className="chat-message__body">
        <span className="chat-message__name">{isUser ? 'kamu' : 'era'}</span>
        <div className={`chat-message__bubble chat-message__bubble--${message.role}`}>
          {message.text}
        </div>
        {message.time && <span className="chat-message__time">{message.time}</span>}
      </div>
    </motion.div>
  );
}

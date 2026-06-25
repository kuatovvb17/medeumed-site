'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Calendar, MessageSquarePulse, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTable?: boolean;
  chips?: string[];
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Сәлеметсіз бе! Мен **MedeuMed** клиникасының ақылды ИИ (Жасанды Интеллект) көмекшісімін 🤖✨\n\nСізге клиника қызметтері, дәрігерлер тізімі, бағалар немесе онлайн жазылу бойынша қандай көмек қажет?',
      chips: [
        '💰 Қызметтер мен бағалар',
        '👩‍⚕️ Дәрігерлер тізімі',
        '📅 Қабылдауға жазылу',
        '🩺 УДЗ-ге (УЗИ) дайындалу',
        '📍 Клиника мекенжайы'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const processAIQuery = (queryText: string) => {
    const q = queryText.toLowerCase();

    if (q.includes('баға') || q.includes('қанша') || q.includes('ақша') || q.includes('құны') || q.includes('price') || q.includes('стоимость')) {
      return {
        text: 'MedeuMed клиникасының негізгі қызметтер бағасы:\n\n| Қызмет атауы | Бағасы |\n|---|---|\n| ЖТД / Терапевт кеңесі | **6 500 ₸** |\n| Акушер-гинеколог кеңесі | **8 000 ₸** |\n| Кешенді УДЗ (УЗИ) 3D/4D | **9 500 ₸** |\n| Кардиолог + ЭКГ | **10 000 ₸** |\n| Педиатр (балалар дәрігері) | **7 000 ₸** |\n| Зертханалық кешенді талдау | **4 500 ₸** |\n\nБарлық мамандарға онлайн бронь жасауға болады 👇',
        chips: ['📅 Қабылдауға жазылу', '👩‍⚕️ Дәрігерлер тізімі']
      };
    }

    if (q.includes('дәрігер') || q.includes('врач') || q.includes('маман') || q.includes('доктор') || q.includes('кім')) {
      return {
        text: 'Біздің жоғары санатты жетекші дәрігерлеріміз:\n\n🌟 **Ахметова Алина Серікқызы** — Жалпы тәжірибелі дәрігер (12 жыл тәжірибе)\n🌟 **Оспанов Данияр Маратұлы** — Невролог (16 жыл тәжірибе)\n🌟 **Сүлейменова Әлия Қайратқызы** — Кардиолог (14 жыл тәжірибе)\n🌟 **Жұмабаев Айдос Кенесұлы** — УДЗ (УЗИ) сарапшысы (20 жыл тәжірибе)\n🌟 **Исаев Мақсат Бақытұлы** — Акушер-гинеколог (14 жыл тәжірибе)\n\nНақты дәрігердің бос сағаттарын көру үшін жазылу бөліміне өтіңіз:',
        chips: ['📅 Қабылдауға жазылу']
      };
    }

    if (q.includes('жазылу') || q.includes('запись') || q.includes('уақыт') || q.includes('бронь') || q.includes('кесте') || q.includes('қалай')) {
      return {
        text: 'Онлайн жазылу өте оңай! 📅\n\n1. Сайттағы **[Жазылу бөліміне](/booking)** өтіңіз.\n2. Өзіңізге керекті дәрігер мен қызметті таңдаңыз.\n3. Ыңғайлы күн мен сағатты белгілеп, телефон нөміріңізді қалдырыңыз.\n\nЖүйе лезде растап, Жеке кабинетіңізге бронь түсіреді! Бұл бар болғаны 15 секунд алады 🚀',
        chips: ['📅 Қабылдауға жазылу']
      };
    }

    if (q.includes('мекенжай') || q.includes('адрес') || q.includes('қайда') || q.includes('карта') || q.includes('орналасқан')) {
      return {
        text: '📍 **Біздің клиниканың мекенжайы:**\nАлматы қаласы, Медеу ауданы, Достық даңғылы, 180 (КөкТөбе аялдамасының жанында).\n\n⏰ **Жұмыс кестесі:**\nДүйсенбі - Жұма: 08:00 - 20:00\nСенбі: 09:00 - 17:00\nЖексенбі: демалыс',
        chips: ['📅 Қабылдауға жазылу', '💰 Қызметтер мен бағалар']
      };
    }

    if (q.includes('удз') || q.includes('узи') || q.includes('анализ') || q.includes('дайындалу') || q.includes('подготовка')) {
      return {
        text: '🩺 **УДЗ-ге (УЗИ) дайындалу ережелері:**\n\n• **Ішкі құрылыс УДЗ:** Зерттеуге 6-8 сағат қалғанда тамақ ішпеу (аш қарынға келген дұрыс).\n• **Кіші жамбас аймағы УДЗ:** Процедурадан 1 сағат бұрын 1 литр таза су ішіп, қуықты босатпау қажет.\n• **Қан анализі:** Таңертең сағат 08:00-11:00 аралығында қатаң түрде аш қарынға тапсырылады.',
        chips: ['📅 Қабылдауға жазылу', '❓ Басқа сұрақ қою']
      };
    }

    if (q.includes('сәлем') || q.includes('привет') || q.includes('здравствуй') || q.includes('қалайсың')) {
      return {
        text: 'Сәлеметсіз бе! Әрқашан көмектесуге қуаныштымын 💚 Денсаулығыңызға қатысты қандай сұрағыңыз бар?',
        chips: ['💰 Қызметтер мен бағалар', '👩‍⚕️ Дәрігерлер тізімі', '📅 Қабылдауға жазылу']
      };
    }

    return {
      text: 'Сұрағыңыз өте орынды! Бұл медициналық мәселе бойынша нақты жауапты клиникамыздың тірі дәрігерлері қабылдау кезінде бергені дұрыс болады 💚\n\nДәрігердің кеңесіне қазір онлайн жазылғыңыз келе ме?',
      chips: ['📅 Қабылдауға жазылу', '📍 Клиника мекенжайы', '💰 Қызметтер мен бағалар']
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = processAIQuery(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse.text,
        chips: aiResponse.chips
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-5 py-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-extrabold animate-bounce">
            1
          </div>
          <Bot size={26} className="text-slate-950 animate-pulse" />
          <span className="text-sm pr-1 hidden sm:inline">ИИ Көмекші</span>
        </button>
      )}

      {/* Chat Modal Popover */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up transition-all duration-300 shadow-emerald-500/10">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0F4C3A] p-4.5 text-white flex items-center justify-between border-b border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-slate-950">
                <Bot size={24} className="animate-pulse" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base tracking-wide flex items-center gap-1.5">
                  Medeu AI <Sparkles size={14} className="text-emerald-400 inline" />
                </h3>
                <p className="text-[11px] text-emerald-300/80 font-medium">24/7 Онлайн медициналық кеңесші</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-start gap-2.5 max-w-[88%]">
                  {m.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-medium rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Quick Reply Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 ml-9.5">
                    {m.chips.map((chip, i) => {
                      const isBooking = chip.includes('жазылу');
                      if (isBooking) {
                        return (
                          <Link
                            key={i}
                            href="/booking"
                            onClick={() => setIsOpen(false)}
                            className="text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-105 inline-block"
                          >
                            {chip}
                          </Link>
                        );
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleSend(chip.replace(/^[^\wқұұіңғүұәөһ]+/i, '').trim() || chip)}
                          className="text-[11px] font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs text-left"
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-medium text-slate-500">Medeu AI жауап теруде...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Сұрағыңызды жазыңыз..."
              className="flex-1 bg-slate-100 border border-transparent focus:border-emerald-400 focus:bg-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-all shadow-md hover:scale-105 shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

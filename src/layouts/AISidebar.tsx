import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { useNavStore } from '@/store/navStore';

export const AI_SIDEBAR_W = 320;
const MIN_W = 260;
const MAX_W = 520;

// ─── Message types ────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi! I'm your S-Plus AI assistant. I can help you with employee records, reports, analytics, and data insights.\n\nWhat would you like to know?",
  },
];

// ─── Canned responses (demo only) ────────────────────────────────────────────

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('leave') || q.includes('absent')) {
    return 'Based on today\'s attendance data, **23 employees** are on leave across all sites:\n- Annual Leave: 15\n- Medical Leave: 6\n- Emergency Leave: 2';
  }
  if (q.includes('employee') || q.includes('headcount') || q.includes('staff')) {
    return 'Current headcount: **1,245 employees** across **87 active sites**.\n\nThis month: 18 new joiners, 4 resignations. Net change: **+14**.';
  }
  if (q.includes('invoice') || q.includes('billing') || q.includes('revenue')) {
    return 'February 2026 billing summary:\n- Total invoiced: **RM 284,500**\n- Collected: **RM 234,200** (82.4%)\n- Outstanding: **RM 50,300**\n- Overdue: **RM 22,800**';
  }
  if (q.includes('patrol') || q.includes('incident')) {
    return 'Last 7 days patrol summary:\n- Patrols completed: **342** / 360 scheduled (95%)\n- Incidents reported: **7** (3 resolved, 4 pending)\n- Defects logged: **12**';
  }
  if (q.includes('project') || q.includes('contract')) {
    return 'Active projects: **31** out of 47 total contracts.\n- Total portfolio value: **RM 28M**\n- Avg progress: **58%**\n- Expiring in 30 days: **4 contracts**';
  }
  return "I'm analysing your query. For detailed data, please navigate to the relevant module or refine your question with specific dates, sites, or employee names.";
}

// ─── AISidebar ────────────────────────────────────────────────────────────────

export function AISidebar() {
  const { aiPanelOpen, setAiPanel, rightSidebarWidth, setRightSidebarWidth } = useNavStore();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartW = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.clientX;
    const newW = Math.min(MAX_W, Math.max(MIN_W, dragStartW.current + delta));
    setRightSidebarWidth(newW);
  }, [setRightSidebarWidth]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  function startDrag(e: React.MouseEvent) {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartW.current = rightSidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (aiPanelOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [aiPanelOpen]);

  function handleSend() {
    const text = draft.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: getResponse(text),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <motion.aside
          key="ai-sidebar"
          initial={{ x: rightSidebarWidth, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: rightSidebarWidth, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }}
          style={{
            position: 'fixed',
            top: 56,
            bottom: 0,
            right: 0,
            width: rightSidebarWidth,
            zIndex: 50,
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 24px -4px rgba(0,0,0,0.08)',
          }}
        >
          {/* Resize handle */}
          <div
            onMouseDown={startDrag}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 5,
              cursor: 'col-resize',
              zIndex: 10,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-brand)';
              (e.currentTarget as HTMLDivElement).style.opacity = '0.3';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              (e.currentTarget as HTMLDivElement).style.opacity = '1';
            }}
          />
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              borderBottom: '1px solid #f3f4f6',
              background: 'linear-gradient(135deg, #f8faff 0%, #fff 100%)',
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--primary-brand)' }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-800 leading-none">AI Assistant</p>
                <p className="text-[10.5px] text-gray-400 leading-none mt-0.5">Powered by S-Plus AI</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAiPanel(false)}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={14} className="text-gray-400" />
            </button>
          </div>

          {/* ── Messages ────────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--primary-brand)' }}
                >
                  <Bot size={12} className="text-white" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-3 py-2 text-[12.5px]"
                  style={{ background: '#f3f4f6', color: '#374151' }}
                >
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Suggested prompts ───────────────────────────────────────── */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-col gap-1.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400 px-1">Suggestions</p>
              {[
                'Who is on leave today?',
                'Show billing summary',
                'How many employees?',
              ].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setDraft(s); setTimeout(handleSend, 0); }}
                  className="text-left px-3 py-2 rounded-lg text-[12px] text-gray-600 hover:bg-gray-50 border border-gray-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* ── Input ───────────────────────────────────────────────────── */}
          <div
            className="flex-shrink-0 px-3 py-3"
            style={{ borderTop: '1px solid #f3f4f6' }}
          >
            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your data…"
                className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder-gray-400 resize-none outline-none leading-relaxed"
                style={{ maxHeight: 80 }}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim()}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: draft.trim() ? 'var(--primary-brand)' : '#e5e7eb',
                  cursor: draft.trim() ? 'pointer' : 'default',
                }}
              >
                <Send size={13} style={{ color: draft.trim() ? '#fff' : '#9ca3af' }} />
              </button>
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-1.5">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  // Simple markdown: **bold** and newlines
  function renderText(text: string) {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : <span key={j}>{part}</span>
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 text-[12.5px] text-white leading-relaxed"
          style={{ background: 'var(--primary-brand)' }}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'var(--primary-brand)' }}
      >
        <Bot size={12} className="text-white" />
      </div>
      <div
        className="max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-[12.5px] text-gray-700 leading-relaxed"
        style={{ background: '#f3f4f6' }}
      >
        {renderText(message.text)}
      </div>
    </div>
  );
}

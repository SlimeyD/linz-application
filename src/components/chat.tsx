'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A very basic markdown to HTML converter.
// It handles bold, italic, code, links, and simple unordered lists.
// For complex markdown, a dedicated library like 'marked' or 'react-markdown' should be used.
const markdownToHtml = (markdown: string): string => {
  let html = markdown;

  // Basic HTML escaping for safety, before other replacements
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Code: `code`
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  // Links: [text](url)
  html = html.replace(/\[([^\]]+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">$1</a>');

  // Unordered lists (simple block handling): - item
  // This regex matches a block of lines starting with '-' and converts them to an HTML unordered list.
  html = html.replace(/^(- .*(\n- .*)*)$/gm, (match) => {
    const listItems = match.split('\n').map(line => `<li>${line.substring(2).trim()}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  });

  // Replace remaining newlines with <br/> for general line breaks
  // This is a simple approach that treats every newline as a line break.
  // For proper paragraph handling, a more sophisticated parser would be needed.
  html = html.replace(/\n/g, '<br/>');

  return html;
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean; // Indicates if the assistant is still streaming its response
}

const exampleQuestions = [
  'Why is Wellington data missing?',
  'What does building_age code 198 mean?',
  'How do I query by address?',
  'What tables make up the DVR?',
];

const MAX_MESSAGES_PER_HOUR = 20; // Must match server-side constant for accurate display

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false); // For initial "Searching documentation..."
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom of the chat window
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Load threadId from sessionStorage on component mount
  useEffect(() => {
    const storedThreadId = sessionStorage.getItem('linz_assistant_thread_id');
    if (storedThreadId) {
      setThreadId(storedThreadId);
    }
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  // Effect to manage user message count (client-side approximation)
  useEffect(() => {
    setMessageCount(messages.filter(msg => msg.role === 'user').length);
  }, [messages]);


  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isApiLoading || isRateLimited) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsApiLoading(true); // Set loading state for the assistant's first response token

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, message: messageText }),
      });

      if (response.status === 429) {
        setIsRateLimited(true);
        setIsApiLoading(false);
        // Remove the user's message if it was rate limited on the server
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
        console.warn('Rate limit exceeded from server.');
        return;
      }

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to fetch response: ${response.status} ${response.statusText}`);
      }

      const newThreadId = response.headers.get('x-thread-id');
      if (newThreadId && newThreadId !== threadId) {
        setThreadId(newThreadId);
        sessionStorage.setItem('linz_assistant_thread_id', newThreadId);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponseContent = '';
      const assistantMessageId = `assistant-${Date.now()}`;

      // Add a placeholder for the assistant's streaming message
      setMessages(prev => [
        ...prev,
        { id: assistantMessageId, role: 'assistant', content: '', isLoading: true },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantResponseContent += chunk;

        // Update the last assistant message with streaming content
        setMessages(prev => prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: assistantResponseContent, isLoading: false } // Mark not loading after first token
            : msg
        ));
        setIsApiLoading(false); // Once first token arrives, remove global loading indicator
        scrollToBottom(); // Keep scrolling as content comes in
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        // Remove any loading assistant messages and the failed user message
        const updatedMessages = prev.filter(msg => msg.id !== userMessage.id && !msg.isLoading);
        return [
          ...updatedMessages,
          { id: `error-${Date.now()}`, role: 'assistant', content: 'Oops! Something went wrong. Please try again.' },
        ];
      });
    } finally {
      setIsApiLoading(false); // Ensure loading is off in all cases
      inputRef.current?.focus(); // Re-focus input after response
    }
  }, [isApiLoading, threadId, isRateLimited, scrollToBottom]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  }, [inputMessage, sendMessage]);

  const handleChipClick = useCallback((question: string) => {
    setInputMessage(question); // Optionally populate input field
    sendMessage(question);
  }, [sendMessage]);

  const assistantName = 'LINZ Data Assistant';

  return (
    <div className="flex flex-col max-h-[500px] w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <h2 className="text-lg font-semibold text-slate-800">{assistantName}</h2>
        </div>
      </div>

      {/* Message List */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onWheel={(e) => {
          const el = e.currentTarget;
          const isScrollable = el.scrollHeight > el.clientHeight;
          if (!isScrollable) return;
          const atTop = el.scrollTop === 0 && e.deltaY < 0;
          const atBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1 && e.deltaY > 0;
          if (!atTop && !atBottom) {
            e.stopPropagation();
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-50 text-slate-800 border border-slate-200'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.content) }} />
                    {msg.isLoading && (
                      <span className="relative flex h-2 w-2 ml-2 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                      </span>
                    )}
                  </>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
          {isApiLoading && messages.filter(msg => msg.role === 'assistant' && msg.isLoading).length === 0 && (
            // Show "Searching documentation..." only if no assistant message is already streaming
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="max-w-[75%] px-4 py-2 rounded-lg shadow-sm bg-slate-50 text-slate-800 border border-slate-200 flex items-center">
                <span>Searching documentation</span>
                <span className="ml-1 text-2xl leading-none animate-pulse">...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        {messages.length === 0 && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {exampleQuestions.map((q, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleChipClick(q)}
                className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors"
                disabled={isApiLoading || isRateLimited}
              >
                {q}
              </motion.button>
            ))}
          </div>
        )}

        {isRateLimited && (
          <div className="text-center text-red-600 text-sm mb-2">
            You&apos;ve sent too many messages. Please wait a bit before trying again.
          </div>
        )}

        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border border-slate-300 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700 placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed"
            placeholder={isRateLimited ? "Rate limit exceeded" : "Ask about the LINZ District Valuation Roll..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isApiLoading || isRateLimited}
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            className="absolute right-2 p-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isApiLoading || !inputMessage.trim() || isRateLimited}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-right text-sm text-slate-500">
          ({messageCount}/{MAX_MESSAGES_PER_HOUR} messages)
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Send, User, Search, Paperclip, MoreVertical, CheckCheck, Clock, Check } from 'lucide-react';

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState('Admin');
    const [message, setMessage] = useState('');

    const chats = [
        { id: 'Admin', name: 'Hospital Admin', lastMsg: 'Shift schedule updated.', time: '10:30 AM', unread: 2, online: true },
        { id: 'Nurse-A', name: 'Senior Nurse Maria', lastMsg: 'Patient in 302 stabilized.', time: 'Prev', unread: 0, online: true },
        { id: 'Lab', name: 'Pathology Lab', lastMsg: 'Blood reports ready.', time: 'Sat', unread: 0, online: false },
        { id: 'Pharmacy', name: 'In-house Pharmacy', lastMsg: 'Oxy-tank refilled.', time: 'Fri', unread: 0, online: true }
    ];

    const [messages, setMessages] = useState([
        { id: 1, sender: 'Admin', text: 'Dr. Ganesh, your requested leave for Friday is approved.', time: '10:00 AM', isMe: false },
        { id: 2, sender: 'Me', text: 'Thank you. I will hand over the cases to Dr. Sharma.', time: '10:15 AM', isMe: true },
        { id: 3, sender: 'Admin', text: 'Shift schedule updated. Please check the dashboard.', time: '10:30 AM', isMe: false }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setMessages([...messages, { id: `${Date.now()}-${Math.random()}`, sender: 'Me', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true }]);
        setMessage('');
    };

    return (
        <div className="p-6 h-[calc(100vh-120px)] flex gap-6">
            <div className="w-80 flex flex-col h-full space-y-4">
                <div className="card h-full p-4 flex flex-col">
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 italic uppercase mb-6 tracking-wider">Staff Terminal</h2>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-xs italic focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Find staff..."
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {chats.map(chat => (
                            <button 
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.name)}
                                className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                                    selectedChat === chat.name 
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                                    : 'bg-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                                        selectedChat === chat.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                                    }`}>
                                        {chat.name.charAt(0)}
                                    </div>
                                    {chat.online && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                                    )}
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <p className={`text-[10px] font-black uppercase truncate ${selectedChat === chat.name ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{chat.name}</p>
                                        <p className={`text-[8px] opacity-70 ${selectedChat === chat.name ? 'text-white' : 'text-gray-400'}`}>{chat.time}</p>
                                    </div>
                                    <p className={`text-[10px] truncate italic ${selectedChat === chat.name ? 'text-white/80' : 'text-gray-400'}`}>{chat.lastMsg}</p>
                                </div>
                                {chat.unread > 0 && selectedChat !== chat.name && (
                                    <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center text-[8px] text-white font-black">{chat.unread}</div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col h-full space-y-4">
                <div className="card h-full p-0 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500 font-black">
                                {selectedChat.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 italic uppercase">{selectedChat}</h3>
                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest italic">Encrypted Secure Line</p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-4 rounded-3xl ${
                                    msg.isMe 
                                    ? 'bg-primary-500 text-white rounded-tr-none shadow-lg shadow-primary-500/10' 
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                                }`}>
                                    <p className="text-xs italic font-medium leading-relaxed">{msg.text}</p>
                                    <div className={`mt-2 flex items-center gap-2 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                        <span className={`text-[8px] font-black uppercase opacity-60`}>{msg.time}</span>
                                        {msg.isMe && <CheckCheck className="w-3 h-3 opacity-60" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="relative flex items-center gap-3">
                            <button type="button" className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input 
                                className="flex-1 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl px-4 py-3 text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Type a message or clinical note..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button 
                                type="submit"
                                className="p-3 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Messages;

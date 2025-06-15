import { Bot } from 'lucide-react';

const FloatingChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold  px-12 py-3 rounded-full transition duration-200"
    >
      Speak to bot
    </button>
  );
};

export default FloatingChatButton;

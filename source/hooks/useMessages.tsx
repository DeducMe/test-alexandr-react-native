import {useState} from 'react';
import {IMessage} from 'react-native-gifted-chat';

export default function useMessages() {
  const [messages, setMessages] = useState<{[key: string]: IMessage[]}>({});
  const [loading, setLoading] = useState(false);

  const setChatMessages = (chatMessages: IMessage[] = [], chatId: string) => {
    setLoading(true);

    setTimeout(() => {
      setMessages({
        ...messages,
        [chatId]: [...(messages[chatId] || []), ...chatMessages],
      });
      setLoading(false);
    }, 2000);
  };

  return {messages, loading, setChatMessages};
}

import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContext} from '../../providers/AppProvider';
import {useFocusEffect} from '@react-navigation/native';

export function ChatScreen({
  route,
}: {
  route: {
    params: {
      chatId: string;
      user: {
        _id: number;
        name: string;
        avatar: string;
      };
    };
  };
}) {
  const {user, chatId} = route.params || {};
  const [messages, setMessages] = useState<IMessage[]>([]);

  const context = useContext(AppContext);
  const chatMessages = context.messages.messages[chatId];

  console.log(chatMessages, user);

  useFocusEffect(
    React.useCallback(() => {
      setMessages(chatMessages || []);
    }, []),
  );

  const onSend = useCallback((messages: IMessage[] = []) => {
    const newMessage = messages[0];
    setMessages((previousMessages: IMessage[] | undefined) => {
      context.messages.setChatMessages(
        [
          ...previousMessages,
          ...[
            {
              _id: new Date().toString(),
              text: `${newMessage.text}❤`,
              createdAt: new Date(),
              user,
            },
            ...messages,
          ],
        ],
        chatId,
      );

      return GiftedChat.append(previousMessages, [
        {
          _id: new Date().toString(),
          text: `${newMessage.text}❤`,
          createdAt: new Date(),
          user,
        },
        ...messages,
      ]);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 999,
        }}
      />
    </SafeAreaView>
  );
}

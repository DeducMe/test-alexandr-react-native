import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContext} from '../../providers/AppProvider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import IconComponent from '../../components/IconComponent/IconComponent';
import {IChat} from '../../hooks/useChats';

export function ChatScreen({
  route,
}: {
  route: {
    params: {
      chatId: string;
      users: number[];
      chatData: {name: string; avatar: string};
    };
  };
}) {
  const {users: usersIds, chatId, chatData} = route.params || {};
  const [messages, setMessages] = useState<IMessage[]>([]);

  const context = useContext(AppContext);
  const chatMessages = context.messages.messages[chatId];
  const users = context.users.users.filter(item =>
    usersIds?.includes(item._id),
  );
  const theme = useTheme();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setMessages(chatMessages || []);
    }, []),
  );

  const onSend = useCallback((messages: IMessage[] = []) => {
    const newMessage = messages[0];
    setMessages((previousMessages: IMessage[]) => {
      context.messages.setChatMessages(
        [
          ...previousMessages,
          ...[
            ...users.map(user => ({
              _id: new Date().toString(),
              text: `${newMessage.text}❤`,
              createdAt: new Date(),
              user,
            })),
            ...messages,
          ],
        ],
        chatId,
      );

      return GiftedChat.append(previousMessages, [
        ...users.map(user => ({
          _id: new Date().toString(),
          text: `${newMessage.text}❤`,
          createdAt: new Date(),
          user,
        })),
        ...messages,
      ]);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconComponent
            style={{marginRight: theme.space.l}}
            name="chevron-back"
            iconSet="Ionicons"
            size={40}
          />
        </TouchableOpacity>
        <Image
          source={{uri: chatData.avatar}}
          style={{
            height: 50,
            width: 50,
            borderRadius: theme.space.l,
            marginRight: theme.space.s,
          }}
        />
        <Text style={{fontSize: theme.fontSizes.large}}>{chatData.name}</Text>
      </View>
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

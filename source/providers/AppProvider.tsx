import React from 'react';

import useUsers, {IUserData} from '../hooks/useUsers';
import useMessages from '../hooks/useMessages';
import {IMessage} from 'react-native-gifted-chat';
import useChats, {IChat} from '../hooks/useChats';

type AppContextT = {
  // TODO замени user на token везде
  messages: {
    messages: {[key: string]: IMessage[]};
    loading: boolean;
    setChatMessages: (chatMessages: IMessage[], chatId: string) => void;
  };
  users: {
    users: IUserData[];
    loading: boolean;
  };
  chats: {
    chats: IChat[];
    loading: boolean;
    addChatWithUser: (
      userId: number,
      chatId: number,
      name: string,
      avatar?: string,
    ) => void;
    addGroupChatWithUsers: (
      userIds: number[],
      chatId: number,
      name: string,
      avatar?: string,
    ) => void;
  };
};

export const AppContext = React.createContext<AppContextT>({
  messages: {
    messages: {},
    loading: false,
    setChatMessages: (chatMessages: IMessage[], chatId: string) => {},
  },
  users: {
    users: [],
    loading: false,
  },
  chats: {
    chats: [],
    loading: false,
    addChatWithUser: (
      userId: number,
      chatId: number,
      name: string,
      avatar?: string,
    ) => {},
    addGroupChatWithUsers: (
      userIds: number[],
      chatId: number,
      name: string,
      avatar?: string,
    ) => {},
  },
});

const {Provider} = AppContext;

export const AppProvider = (props: any) => {
  const chats = useChats();
  const messages = useMessages();
  const users = useUsers();

  return (
    <Provider
      value={{
        messages,
        chats,
        users,
      }}>
      {props.children}
    </Provider>
  );
};

import React from 'react';

import useUsers, {IUserData} from '../hooks/useUsers';
import useMessages from '../hooks/useMessages';
import {IMessage} from 'react-native-gifted-chat';

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
};

export const AppContext = React.createContext<AppContextT>({
  messages: {
    messages: {},
    loading: false,
    setChatMessages: (chatMessages: IMessage[], chatId: string) => {},
  },
  users: {users: [], loading: false},
});

const {Provider} = AppContext;

export const AppProvider = (props: any) => {
  //auth
  const messages = useMessages();
  const users = useUsers();

  return (
    <Provider
      value={{
        messages,
        users,
      }}>
      {props.children}
    </Provider>
  );
};

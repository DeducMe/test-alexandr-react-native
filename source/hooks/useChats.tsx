import {useEffect, useState} from 'react';

export type IChat = {
  type: string;
  _id: number;
  name: string;
  avatar?: string;
  users: number[];
};

export default function useChats() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);

  function addChatWithUser(
    userId: number,
    chatId: number,
    name: string,
    avatar?: string,
  ) {
    const chatExists = !!chats.find(item => item._id === chatId);
    if (chatExists) return;

    setChats([
      ...chats,
      {users: [userId], _id: chatId, name, avatar, type: 'PERSONAL'},
    ]);
  }
  function addGroupChatWithUsers(
    userIds: number[],
    chatId: number,
    name: string,
    avatar?: string,
  ) {
    const chatExists = !!chats.find(item => item._id === chatId);
    if (chatExists) return;

    setChats([
      ...chats,
      {users: userIds, _id: chatId, name, avatar, type: 'GROUP'},
    ]);
  }

  useEffect(() => {
    //emulating api request
    const chatsFromMockDb = [
      {
        _id: 1,
        name: 'User1',
        avatar: 'https://picsum.photos/140',
        users: [1],
        type: 'PERSONAL',
      },
    ];

    setTimeout(() => {
      setChats(chatsFromMockDb);
      setLoading(false);
    }, 2000);
  }, []);

  return {chats, loading, addChatWithUser, addGroupChatWithUsers};
}

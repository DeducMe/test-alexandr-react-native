import {useEffect, useState} from 'react';
import {userData} from '../data/data';

export type IUserData = {
  _id: number;
  name: string;
  avatar: string;
};

export default function useUsers() {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //emulating api request
    setTimeout(() => {
      setUsers(userData);
      setLoading(false);
    }, 2000);
  }, []);

  return {users, loading};
}

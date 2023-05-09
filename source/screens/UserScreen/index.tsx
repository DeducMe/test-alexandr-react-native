import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useContext} from 'react';
import Avatar from '../../components/Avatar';
import {IUserData} from '../../hooks/useUsers';
import {AppContext} from '../../providers/AppProvider';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/useTheme';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/DefaultStackNavigator';

export default function UserScreen({
  route,
}: {
  route: {params: {user: IUserData}};
}) {
  const {user} = route.params || {};
  const context = useContext(AppContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const chats = context.chats.chats.filter(chat =>
    chat.users.includes(user._id),
  );
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.DEFAULT, flex: 1}}>
      <Image
        source={{uri: user.avatar}}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          marginHorizontal: theme.space.s,
          marginBottom: theme.space.s,
        }}>
        Chats with this user:
      </Text>
      <FlatList
        data={chats}
        renderItem={({item}) => {
          const {_id, name, avatar, users, type} = item;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  users,
                  chatId: _id,
                  chatData: {name, avatar, type},
                });
              }}
              style={{
                padding: theme.space.s,
                marginHorizontal: theme.space.xs,

                backgroundColor: theme.colors.DEFAULT_LIGHT,
                flexDirection: 'row',
                marginBottom: theme.space.s,
                borderRadius: theme.space.xxs,
              }}>
              <Image
                source={{uri: avatar}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: theme.space.xxxxl,
                  marginRight: theme.space.s,
                }}
              />
              <Text style={{fontSize: theme.fontSizes.large}}>{name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

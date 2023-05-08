import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useTheme from '../../hooks/useTheme';
import {AppContext} from '../../providers/AppProvider';
import {useNavigation} from '@react-navigation/native';
import IconComponent from '../../components/IconComponent/IconComponent';
import {FloatingAction, IActionProps} from 'react-native-floating-action';
import FloatingButtonAction from '../../components/FloatingButtonAction';
import {TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/DefaultStackNavigator';

export default function ChatListScreen() {
  const theme = useTheme();
  const context = useContext(AppContext);
  const chats = context.chats.chats;
  const chatsLoading = context.chats.loading;
  const messages = context.messages.messages;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [chatsAvailable, setChatsAvailable] = useState(chats);

  useEffect(() => {
    setChatsAvailable(chats);
  }, [chats]);

  const actions: IActionProps[] = [
    {
      render: () => (
        <FloatingButtonAction
          key={'newChat'}
          icon={
            <IconComponent
              iconSet="Ionicons"
              name={'chatbubble-outline'}
              size={25}
            />
          }
          text={'New chat'}
        />
      ),
      name: 'newChat',
    },
    {
      render: () => (
        <FloatingButtonAction
          key={'newGroup'}
          icon={
            <IconComponent
              iconSet="Ionicons"
              name={'chatbubbles-outline'}
              size={25}
            />
          }
          text={'New group'}
        />
      ),
      name: 'newGroup',
    },
  ];

  function onChangeText(value: string) {
    const chatsAvailableFiltered = chats.filter(item =>
      item.name.includes(value),
    );
    setChatsAvailable(chatsAvailableFiltered);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {chatsLoading ? (
        <ActivityIndicator size={'large'}></ActivityIndicator>
      ) : (
        <>
          <FloatingAction
            iconWidth={25}
            iconHeight={25}
            showBackground
            distanceToEdge={{vertical: 30, horizontal: 15}}
            color={theme.colors.BUTTON_COLOR}
            actions={actions}
            actionsPaddingTopBottom={theme.space.xxs}
            onPressItem={name => {
              if (name === 'newChat') {
                navigation.navigate('AddChat', {});
              }
              if (name === 'newGroup') {
                navigation.navigate('AddGroupChat', {});
              }
            }}
          />
          <View style={{paddingHorizontal: theme.space.s}}>
            <TextInput
              placeholder="Search chat"
              style={{
                padding: theme.space.s,
                borderWidth: 1,
                borderRadius: theme.space.xxs,
                marginBottom: theme.space.s,
              }}
              onChangeText={onChangeText}></TextInput>
            <FlatList
              data={chatsAvailable}
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
                      flexDirection: 'row',
                      marginBottom: theme.space.s,
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
                    <Text style={{fontSize: theme.fontSizes.large}}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

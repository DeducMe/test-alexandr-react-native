import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import useTheme from '../../hooks/useTheme';
import {AppContext} from '../../providers/AppProvider';
import {useNavigation} from '@react-navigation/native';
import IconComponent from '../../components/IconComponent/IconComponent';
import {FloatingAction, IActionProps} from 'react-native-floating-action';
import FloatingButtonAction from '../../components/FloatingButtonAction';

export default function ChatListScreen() {
  const theme = useTheme();
  const context = useContext(AppContext);
  const chats = context.chats.chats;
  const chatsLoading = context.chats.loading;
  const messages = context.messages.messages;
  const navigation = useNavigation();
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
          text={'Add chat'}
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
            {chats.map(item => {
              const {_id, name, avatar, users} = item;

              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChatScreen', {
                      users,
                      chatId: _id,
                      chatData: {name, avatar},
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
                      borderRadius: theme.space.l,
                      marginRight: theme.space.s,
                    }}
                  />
                  <Text style={{fontSize: theme.fontSizes.large}}>{name}</Text>
                  {/* <Text style={{fontSize: theme.fontSizes.large}}>
                {' - '}
                id {_id}
              </Text> */}
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

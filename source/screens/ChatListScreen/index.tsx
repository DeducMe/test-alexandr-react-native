import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Platform,
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
import {makeStyleSheet} from '../../theme/makeStyleSheet';

export default function ChatListScreen() {
  const theme = useTheme();
  const context = useContext(AppContext);
  const {chats, loading: chatsLoading} = context.chats;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [chatsAvailable, setChatsAvailable] = useState(chats);

  const styles = makeStyle();

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
              size={theme.iconSize.m}
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
              size={theme.iconSize.m}
            />
          }
          text={'New group'}
        />
      ),
      name: 'newGroup',
    },
  ];

  const onChangeText = (value: string) => {
    const chatsAvailableFiltered = chats.filter(item =>
      item.name.includes(value),
    );
    setChatsAvailable(chatsAvailableFiltered);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search chat"
                onChangeText={onChangeText}></TextInput>
              <IconComponent
                size={theme.iconSize.m}
                iconSet="Feather"
                name="search"></IconComponent>
            </View>
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
                    style={styles.chatItem}>
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

const makeStyle = makeStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.DEFAULT,
  },
  chatItem: {
    padding: theme.space.s,
    marginHorizontal: theme.space.xs,

    backgroundColor: theme.colors.DEFAULT_LIGHT,
    flexDirection: 'row',
    marginBottom: theme.space.s,
    borderRadius: theme.space.xxs,
  },
  searchBar: {
    paddingHorizontal: theme.space.s,
    paddingVertical:
      Platform.OS === 'android' ? theme.space.xxs : theme.space.s,
    marginHorizontal: theme.space.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: theme.colors.DEFAULT_LIGHT,
    borderRadius: theme.space.xxs,
    marginBottom: theme.space.s,
  },
}));

import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import useTheme from '../hooks/useTheme';
import IconComponent from '../components/IconComponent/IconComponent';
import ChatListScreen from '../screens/ChatListScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {AddChat} from '../screens/AddChat';
import {AddGroupChat} from '../screens/AddGroupChat';

const Stack = createStackNavigator();

interface ScreenI {
  name: string;
  component: React.ComponentType<any>;
  options?: any;
  noPreset?: boolean;
}

const screens: ScreenI[] = [
  {
    name: 'ChatListScreen',
    component: ChatListScreen,
    options: {headerShown: false},
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddChat',
    component: AddChat,
    options: {headerShown: false},
  },
  {
    name: 'AddGroupChat',
    component: AddGroupChat,
    options: {headerShown: false},
  },
];

export type RootStackParamList = {
  ChatListScreen: undefined;
  ChatScreen: any;
};
// options: {presentation: 'transparentModal'},

const DefaultStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName={screens[0].name}>
      {screens.map(screen => (
        <Stack.Screen
          //@ts-ignore
          options={{
            headerStyle: {
              backgroundColor: theme.colors.DEFAULT,
              // ...theme.defaultShadow,
            },

            headerTitle: '',
            headerTitleStyle: {color: theme.colors.BLACK},

            headerLeft: props => {
              return (
                <TouchableOpacity
                  style={{padding: theme.space.s}}
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else navigation.navigate(screens[0].name);
                  }}>
                  <IconComponent
                    iconSet="Ionicons"
                    name={'arrow-back'}
                    color={theme.colors.BLACK}
                    size={25}
                  />
                </TouchableOpacity>
              );
            },

            ...(!screen.noPreset
              ? {...TransitionPresets.SlideFromRightIOS}
              : {}),
            ...screen.options,
          }}
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default DefaultStackNavigator;

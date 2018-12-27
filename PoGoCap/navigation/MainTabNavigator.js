import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import FriendsScreen from '../screens/FriendsScreen';
import RaidsScreen from '../screens/RaidsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'pokemon-go'
      }
    />
  ),
};

const ModalStack = createStackNavigator({
  Modal: ModalScreen,
}, {
  mode: 'modal',
  headerMode: 'none'
});

const RaidsStack = createStackNavigator({
  Raids: RaidsScreen,
});

RaidsStack.navigationOptions = {
  tabBarLabel: 'Raids',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'egg-easter' : 'egg-easter'}
    />
  ),
};

const PokemonStack = createStackNavigator({
  Pokemon: RaidsScreen,
});

PokemonStack.navigationOptions = {
  tabBarLabel: 'Pokémon',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'pokeball' : 'pokeball'}
    />
  ),
};

const FriendsStack = createStackNavigator({
  Friends: FriendsScreen,
});

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'account-group' : 'account-group'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ModalStack,
  RaidsStack,
  PokemonStack,
  FriendsStack
});
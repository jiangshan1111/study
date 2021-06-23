import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AuthScreen, MenuListScreen, FoodScreen} from '../components';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  auth: AuthScreen,
  food: FoodScreen,
  menuList: MenuListScreen,
});
export default createAppContainer(AppNavigator);

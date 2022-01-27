import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
const StackNavigator = createStackNavigator();

export default function App(props) {
  const [isSignedIn, setIsSignedIn] = React.useState(true);

  const login = ()=> {
    setIsSignedIn(true);
  }

  return (
    <NavigationContainer>
        <StackNavigator.Navigator initialRouteName='SearchScreen'>
          {isSignedIn ?
          <>
            <StackNavigator.Screen name="SearchScreen" component={SearchScreen}></StackNavigator.Screen>
            <StackNavigator.Screen name="ProfileScreen"  component={ProfileScreen}/>
          </>
              :  
                <StackNavigator.Screen name="LoginScreen"  children={()=> <LoginScreen login={login}/>}/>
          }
        </StackNavigator.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

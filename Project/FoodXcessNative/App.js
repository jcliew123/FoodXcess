import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import StackNavigator from './app/navigation/StackNavigator';
import TabNavigator from './app/navigation/TabNavigator';

export default function App() {
  const[user, setUser] = useState(null);

  useEffect(() =>{
    checkLoggedIn();
  }, [user]);

  const checkLoggedIn = async () => {
    const userToken = await SecureStore.getItemAsync('username')
    if(userToken) {
      setUser(userToken)
    }
  }

  return (
    <>
      {user?
        <TabNavigator setUser={setUser}/>
      : 
        <StackNavigator setUser={setUser} />
      }
    </>
  );
}

import React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 0,
});

const App = () => {
  const getLocation = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });

    console.log(permission);

    let location;
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);
    } else {
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

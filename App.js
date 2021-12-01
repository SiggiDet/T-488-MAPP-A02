import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const imageDirectory = `${FileSystem.documentDirectory}images`;

function allContacts({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Button
        title="Create new Contact"
        onPress={() => navigation.navigate('New Contact')}
      />
    </View>
  );
}

function createNewContact({ navigation }) {
  const [image, setImage] = useState(null);
  const [conName, onConName] = React.useState(null);
  const [conNumber, onConNumber] = React.useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log(result);

  
    if (!result.cancelled) {
        setImage(result.uri);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        onChangeText={onConName}
        value={conName}
        placeholder="Enter contact name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onConNumber}
        value={conNumber}
        placeholder="Enter contact number"
        keyboardType="numeric"
      />
      <Button title="Add an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Contacts" component={allContacts} />
      <Stack.Screen name="New Contact" component={createNewContact} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250
  },
});
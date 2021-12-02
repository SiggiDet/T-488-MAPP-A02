import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = (cb) => {
	try {return cb();} 
  catch (err) {console.error(err);}
};

/*
const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(contactsDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(contactsDirectory);
	}
};
*/

export function makeValidStringForFileName(str) {
	const validString = str.replace(/\s/g, '')
	return validString.replace(/[^A-Za-z0-9\s-]/g, '');
};

export const writeToFile = async (file, newLocation) => {
	onException(() => FileSystem.writeAsStringAsync(newLocation, file));
};

export const addContact = async contactLocation => {
	const fileName = makeValidStringForFileName(contactLocation.name);
	const contJson = JSON.stringify(contactLocation);
	await onException(() => writeToFile(contJson, `${contactsDirectory}/${fileName}`));
};

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      aspect: [4, 3],
      quality: 0.8,
    });


    if (!result.cancelled) {
      onConName(conName);
      onConNumber(conNumber);
      setImage(result.uri);

      newContact = {
        "name": conName,
        "phone": conNumber,
        "imageURI": result.uri
      }

      await addContact(newContact);
    }
    console.log(conName)  // nafn
    console.log(conNumber) // numer
    console.log(result.uri) // file path að mynd

    const folderSplit = (result.uri+'').split('/')
    const photoSplit = folderSplit[folderSplit.length-1]
    console.log(photoSplit) // nafn mynds fyrir json


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
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactDetail from './src/services/detailsContacts';

import SearchBar from './src/SearchBar';

const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

const resetDirectory = async () => {
  await FileSystem.deleteAsync(contactsDirectory);
}

const onException = (cb) => {
	try {return cb();} 
  catch (err) {console.error(err);}
};

const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(contactsDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(contactsDirectory);
	}
};

export function makeValidStringForFileName(str) {
	const validString = str.replace(/\s/g, '')
	return validString.replace(/[^A-Za-z0-9\s-]/g, '');
};

export const writeToFile = async (file, newLocation) => {
	onException(() => FileSystem.writeAsStringAsync(newLocation, file));
  console.log("New contact added to filesystem")
};

export const addContact = async contactLocation => {
  await setupDirectory();
	const fileName = makeValidStringForFileName(contactLocation.name);
	const contJson = JSON.stringify(contactLocation);
	await onException(() => writeToFile(contJson, `${contactsDirectory}/${fileName}.json`));
};

const loadContact = async fileName => {
  return await FileSystem.readAsStringAsync(`${contactsDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.base64
  });
}

export const getAllContacts = async () => {
  await setupDirectory();
  const result = await onException(() => FileSystem.readDirectoryAsync(contactsDirectory)); // All filenames in FileSystem
	return Promise.all(result.map(async (fileName) => {
    return(JSON.parse(await loadContact(fileName)));
	}));
}

const allContacts = ({navigation}) => {

  const [allUsers, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const all_contacts = await getAllContacts()
      setContacts(all_contacts);
    })();
  }, [allUsers]);

  checkWhichUser = (objectContact) => {
    console.log(objectContact)
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity title="View Contact" onPress={() => navigation.navigate('View Contact', {data: item})}>
        <View style={styles.row}>
          <Image source={{ uri: item.imageURI }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <SearchBar/>
      <Button
        title="Create new Contact"
        onPress={() => navigation.navigate('New Contact')}
      />
      <FlatList 
          data={allUsers}
          keyExtractor = {(item) => {
            return item.name;
          }}
          renderItem={this.renderItem}/>
    </View>
  );
}

const createNewContact = ({navigation}) => {
  const [image, setImages] = useState(null);
  const [conName, onConName] = React.useState(null);
  const [conNumber, onConNumber] = React.useState(null);

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
      setImages(result.uri);

      newContact = {
        "name": conName,
        "phone": conNumber,
        "imageURI": result.uri
      }

      navigation.navigate('All Contacts', {
        newContactObject: newContact
      });

      await addContact(newContact);
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
      <Stack.Screen name="View Contact" component={ContactDetail} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
});
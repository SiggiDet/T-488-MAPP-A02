import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactDetail from './src/services/detailsContacts';
import { Feather } from "@expo/vector-icons";

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

function ContainsParam(word, searchParam) {
  const word_lowercase = word.toLowerCase();
  const searchParam_lowercase = searchParam.toLowerCase();
  if (word_lowercase.includes(searchParam_lowercase)) { return (true) }
  else { return(false) }
}

const allContacts = ({route, navigation}) => {
  const [allUsers, setContacts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [SearchContactParams, setSearchContactParams] = useState('');

  useEffect(() => {
    (async () => {
      const all_contacts = await getAllContacts()
      setContacts(all_contacts.sort( function (one, another) {return one.name.localeCompare(another.name);}));
    })();
  }, [route.params]);

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <View style={clicked, styles.searchBarNotClicked, styles.searchBarIsClicked}>
            {/* search Icon */}
            <Feather name="search" size={20} color="black" style={styles.SearchIconLocation}/>
            {/* Input field */}
            <TextInput style={styles.Searchinput} placeholder="Search Contacts" value={SearchContactParams} 
            onChangeText={setSearchContactParams} onFocus={() => {setClicked(true);}}/>
          </View>
          {/* cancel button, depending on whether the search bar is clicked or not, might not be necessary */}
          <View style = {styles.ClearButtonBox}>
              <Button title="Clear" color= "#030714" style = {styles.ClearButton} onPress={() => {setClicked(false); setSearchContactParams('');}} />
          </View>
        </View>
      </View>

      <Button
        title="Create new Contact"
        onPress={() => navigation.navigate('New Contact')}
      />
      {allUsers.map(
        user => {
          if (ContainsParam(user["name"], SearchContactParams) || SearchContactParams == '' || ContainsParam(user["phone"], SearchContactParams)){
            return(
              <TouchableOpacity key={user.name} title="View Contact" onPress={() => navigation.navigate('View Contact', {data: user})}>
                <View style={styles.row}>
                  <Image source={{ uri: user.imageURI }} style={styles.pic} />
                  <View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{user.name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        }
      )}
    </ScrollView>
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
    <View style={styles.NewContact}>
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
  container:{
    width: "100%",
    flexDirection: "row",
  },
  SearchIconLocation:{
      marginLeft: 1
  },
  searchBarNotClicked: {
      padding: 7,
      flexDirection: "row",
      width: "70%",
      backgroundColor: "#d9dbda",
      alignItems: "flex-end",
      borderRadius: 15,
    },
  searchBarIsClicked:{
      margin: 15,
      padding: 7,
      flexDirection: "row",
      width: "70%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "flex-end",
      justifyContent: "space-evenly",
      flex: 1, 
      alignItems: 'center'
  },
  Searchinput:{
      fontSize: 15,
      marginLeft: 10,
      width: "90%",
  },
  ClearButton :{
  },
  ClearButtonBox:{
      marginTop: 15,
      marginBottom: 15,
      marginRight: 15,
      alignItems: "flex-end",
  },
  NewContact:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  }


});
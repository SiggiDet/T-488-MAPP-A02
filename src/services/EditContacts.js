import React from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addContact, makeValidStringForFileName } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import { removeContactAsync } from 'expo-contacts';

const removeContact = (oldContact) => {
    FileSystem.remove(oldContact);
}

const deleteContact = (props) => {
    oldContact = props.Contact.name;
    oldContact = await makeValidStringForFileName(oldContact);
    await removeContact(oldContact);
};

const EditContact = (props) => {
    const [image, setImages] = React.useState(props.Contact.imageURI);
    const [conName, onConName] = React.useState(props.Contact.name);
    const [conNumber, onConNumber] = React.useState(props.Contact.number);
  
        await deleteContact()
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
            placeholder="Edit contact name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onConNumber}
            value={conNumber}
            placeholder="Edit contact number"
            keyboardType="numeric"
          />

          
          <Button title="Add an new image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />}
        </View>
    );
}

export default EditContact;

const styles = StyleSheet.create({

    profile: {
        width: 130,
        height: 130,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#696969",
        marginBottom: 40,
        alignSelf: 'center',
        marginTop: 70
    },

    body: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 60,
        color: "#696969",
        fontWeight: "600",
        alignSelf: 'center',
    },
    number: {
        fontSize: 30,
        color: "#696969",
        fontWeight: "600",
        alignSelf: 'center',
    },
    button: {
        alignItems: "center",
        marginTop: 40,
        fontSize: 30,
        height: 32,
        width: 60,
        alignSelf: 'center',
        backgroundColor: "#4CAF50",
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "500",
    }
});
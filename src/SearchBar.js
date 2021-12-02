import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = (props) => {
    const [ContactNames, setInputName] = useState('');
    const [PhoneNrs, setPhotoURI] = useState('');

    return(
        <View style={styles.container}>

        <View style={props.clicked, styles.searchBarNotClicked, styles.searchBarIsClicked}>

          {/* search Icon */}
          <Feather name="search" size={20} color="black" style={styles.SearchIconLocation}/>

          {/* Input field */}
          <TextInput style={styles.input} placeholder="Search Contact" value={props.searchPhrase} 
          onChangeText={props.setSearchPhrase} onFocus={() => {props.setClicked(true);}}/>

          {/* cross Icon, depending on whether the search bar is clicked or not */}
          {props.clicked && 
          (<Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {props.setSearchPhrase("")}}/>)}
        </View>

        {/* cancel button, depending on whether the search bar is clicked or not */}
        {props.clicked && (
        <View>
            <Button title="Cancel" onPress={() => {Keyboard.dismiss(); props.setClicked(false);}} />
        </View>)}

      </View>
    )
}


const styles = StyleSheet.create({
    container:{
      margin: 5,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
    },
    SearchIconLocation:{
        marginLeft: 1
    },
    searchBarNotClicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
    searchBarIsClicked:{
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input:{
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    }
});

export default SearchBar;
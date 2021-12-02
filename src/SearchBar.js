import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";



const customData = require("./contacts.json");

const SearchBar = (props) => {
    const [Contacts, setContacts] = useState(customData.Contacts);

    const [clicked, setClicked] = useState(false);
    const [SearchContactParams, setSearchContactParams] = useState('');

    return(
      <View style={styles.container}>

        <View style={clicked, styles.searchBarNotClicked, styles.searchBarIsClicked}>

          {/* search Icon */}
          <Feather name="search" size={20} color="black" style={styles.SearchIconLocation}/>

          {/* Input field */}
          <TextInput style={styles.input} placeholder="Search Contacts" value={SearchContactParams} 
          onChangeText={setSearchContactParams} onFocus={() => {setClicked(true);}}/>
        </View>

        {/* cancel button, depending on whether the search bar is clicked or not, might not be necessary */}
        <View style = {styles.ClearButtonBox}>
            <Button title="Clear" color= "#030714" style = {styles.ClearButton} onPress={() => {Keyboard.dismiss(); setClicked(false); setSearchContactParams('');}} />
        </View>
    
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
      margin: 3,
      width: "100%",
      flexDirection: "row"
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
        padding: 7,
        flexDirection: "row",
        width: "70%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "flex-end",
        justifyContent: "space-evenly",
    },
    input:{
        fontSize: 15,
        marginLeft: 10,
        width: "90%",
    },
    ClearButton :{
    },
    ClearButtonBox:{
        alignItems: "flex-end",
        marginLeft: 20,
        marginTop: 3
    }
});

export default SearchBar;
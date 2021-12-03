import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import DisplayAllContacts from "./DisplayAllContacts";

const customData = require("./contacts.json");

const SearchBar = (props) => {
    const [Contacts, setContacts] = useState(customData.Contacts);

    const [clicked, setClicked] = useState(false);
    const [SearchContactParams, setSearchContactParams] = useState('');

    return(
      <View>

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

      <DisplayAllContacts searchParam = {SearchContactParams}/>

      </View>
    )
}
const styles = StyleSheet.create({
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
    input:{
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
        alignItems: "flex-end"
    }
});

export default SearchBar;
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import DisplayContact from "./DisplayContact";

const customData = require("./contacts.json");


function ContainsParam(word, searchParam) {
    const word_lowercase = word.toLowerCase();
    const searchParam_lowercase = searchParam.toLowerCase();

    if (word_lowercase.includes(searchParam_lowercase))
    {
        console.log(word);
        return (true)
    }
    else
    {
        return(false)
    }
}

const DisplayAllContacts = (props) => {
    const sorted_custom_data =  customData.Contacts.sort( function (one, another) {return one.name.localeCompare(another.name);});
    const [Contacts, setContacts] = useState(sorted_custom_data);


    return(
        <View>
            {Contacts.map( 
                Contacts => {
                    if (ContainsParam(Contacts.name, props.searchParam) ||props.searchParam == '' || ContainsParam(Contacts.PhoneNr,props.searchParam))
                    {
                        <DisplayContact name = {Contacts.name} phoneNr = {Contacts.PhoneNr} img = {Contacts.Photo}/>
                    }
                })}
        </View>
    )
}
export default DisplayAllContacts;
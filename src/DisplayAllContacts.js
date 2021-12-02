import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";


const customData = require("./contacts.json");


function ContainsParam(word, searchParam) {
    const word_lowercase = word.toLowerCase();
    const searchParam_lowercase = searchParam.toLowerCase();

    if (word_lowercase.includes(searchParam_lowercase))
        return (true);
    else
        return(false);
}

const DisplayAllContacts = (props) => {
    const [Contacts, setContacts] = useState(customData.Contacts);

    return(
        <View>
            {Contacts.map( 
                Contacts => {
                    if (ContainsParam(Contacts.name, props.searchParam) || ContainsParam(Contacts.PhoneNr,props.searchParam))
                        <DisplayContact/>
                })}
        </View>
    )
}
export default DisplayAllContacts;
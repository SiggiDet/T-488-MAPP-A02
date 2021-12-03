import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Button  } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const DisplayContact = (props) => {
    return(
        <View>
            <Text>{props.name}</Text>
            <Text>{props.PhoneNr}</Text>
            <Image style={{width: 350, height: 350}}  source={{uri: props.Photo}}></Image>
        </View>
    )
}
export default DisplayContact;
import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";


const SearchBar = (props) => {
    return(
        <View>
            <TextInput style = {styles.SearchBar.input}>
                
            </TextInput>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
      margin: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
    },
    searchBar__clicked:{
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
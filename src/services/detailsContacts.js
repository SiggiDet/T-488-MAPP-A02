import React from 'react';
import { Image, View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';


const ContactDetail = ( props ) => {

	return (
		<View style={styles.body}>
			<Image style={styles.profile} source={ {uri: props.route.params.data.imageURI} } />
			<Text style={styles.name}> {props.route.params.data.name} </Text>
            <Text style={styles.number}> {props.route.params.data.phone} </Text>
			<TouchableOpacity>
                <Text onPress={()=>{Linking.openURL(`tel:${props.route.params.data.phone}`); }} style={styles.button}>Call</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ContactDetail;

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
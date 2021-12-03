import React from 'react';
import { Button, Image, View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';


const ContactDetail = ( props ) => {

    console.log("HELLO")
    console.log(props.route.params.data)
	return (
		<View style={{ flex: 1, alignItems: 'center'}}>
			<Image style={styles.avatar} source={ {uri: props.route.params.data.imageURI} } />
			<Text style={styles.name}> {props.route.params.data.name} </Text>
            <Text style={styles.name}> {props.route.params.data.phone} </Text>
			<TouchableOpacity
				onPress={() => { Linking.openURL(`tel:${"555-7777"}`); }}>
                <Button title="Call" variant="success">Call</Button>
			</TouchableOpacity>
		</View>
	);
}

export default ContactDetail;

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		height: 200
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: 'center',
		marginTop: 130
	},
	body: {
		flex: 1,
		marginTop: 60
	},
	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 30,
		paddingBottom: 20,
		borderWidth: 1,
		borderColor: 'gray'
	},
	name: {
		fontSize: 35,
		color: "#696969",
		fontWeight: "600",
		alignSelf: 'center',
		justifyContent: 'center'
	},
	info: {
		fontSize: 20,
		color: "gray",
		marginTop: 40,
		borderWidth: 1,
		borderColor: 'gray'
	},
});
import React from 'react';
import { Button, Image, View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';


const ContactDetail = ( ) => {

	return (
		<View>
			<View style={styles.header}></View>
            <Button title="Edit contact" onPress={() => navigation.navigate('New Contact')}/>
			<Image style={styles.avatar} source={ "https://bootdey.com/img/Content/avatar/avatar5.png" } />
			<View style={styles.body}>
				<View style={styles.bodyContent}></View>
			</View>
			<Text style={styles.name}> {"Arnar"} </Text>
            <Text style={styles.name}> {"555-7777"} </Text>
			<TouchableOpacity
				onPress={() => { Linking.openURL(`tel:${"555-7777"}`); }}>
                <Button variant="success">Call</Button>
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
		width: 140,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
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
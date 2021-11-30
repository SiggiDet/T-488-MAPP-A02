import React from 'react';



import Contacts from '../views/Contacts';
import Search from '../components/Search'

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            < Search />
            <Stack.Screen name="Contacts" component={Contacts} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
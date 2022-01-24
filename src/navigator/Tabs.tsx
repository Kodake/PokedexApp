import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigator from './Navigator';
import SearchScreen from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                tabBarActiveTintColor: '#5856D5',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.82)',
                    paddingBottom: ( Platform.OS === 'ios') ? 0 : 7, 
                    borderWidth: 0,
                    elevation: 0,
                    height: ( Platform.OS === 'ios') ? 70 : 55,
                },
                headerShown: false
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={Navigator}
                options={{
                    tabBarLabel: 'Listado',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={30}
                            name='list-outline'
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Búsqueda',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={30}
                            name='search-outline'
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;
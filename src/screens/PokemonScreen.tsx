import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/Navigator';
import FadeInImage from '../components/FadeInImage';
import globalStyles from '../theme/appTheme';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, color } = route.params;
    const { id, name, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();

    return (
        <View>
            {/* Header container */}
            <View
                style={{
                    ...styles.pokemonDetailHeaderContainer,
                    backgroundColor: color
                }}>

                {/* Back button */}

                <TouchableOpacity
                    onPress={
                        () => navigation.pop()
                    }
                    activeOpacity={0.65}
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        color='white'
                        size={35}
                    />
                </TouchableOpacity>

                {/* Nombre del pokemon */}
                <Text
                    style={{
                        ...styles.pokemonDetailName,
                        top: top + 40
                    }}
                >
                    {name + '\n'}#{id}
                </Text>

                {/* Pokebola blanca */}
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />

                <FadeInImage
                    uri={picture}
                    style={styles.pokemonImage}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    pokemonDetailHeaderContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonDetailName: {
        color: 'white',
        fontSize: 35,
        position: 'absolute',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -25,
        opacity: 0.65
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -30
    }
});

export default PokemonScreen;

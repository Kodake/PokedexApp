import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import FadeInImage from './FadeInImage';
import ImageColors from 'react-native-image-colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('#adb5bd');
    const isMounted = useRef(true);

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: '#adb5bd' })
            .then((colors) => {
                if (!isMounted.current) return;

                (colors.platform === 'ios')
                    ? setBgColor(colors.background || '#adb5bd')
                    : setBgColor(colors.dominant || '#adb5bd')
            })
        return () => {
            isMounted.current = false
        }
    }, []);


    return (
        <TouchableOpacity
            activeOpacity={0.65}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: '#adb5bd',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // overflow: 'hidden'
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.35
    }
});

export default PokemonCard;

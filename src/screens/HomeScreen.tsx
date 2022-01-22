import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import globalStyles from '../theme/appTheme';
import PokemonCard from '../components/PokemonCard';

const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={globalStyles.pokebolaBG}
            />

            <View
                style={{alignItems: 'center'}}
            >
                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...globalStyles.title,
                            ...globalStyles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex</Text>
                    )}

                    renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                    // Ininite scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}

                    ListFooterComponent={(
                        <ActivityIndicator
                            style={globalStyles.activityLoading}
                            size={35}
                            color='grey'
                        />)}
                />
            </View>
        </>
    )
};

export default HomeScreen;

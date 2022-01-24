import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import globalStyles from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('second');

    useEffect(() => {

        if (term.length === 0) {
            return setPokemonFiltered([]);
        }

        if(Number(term) === NaN) {
            setPokemonFiltered(
                simplePokemonList.filter(
                    (poke) => poke.name.toLowerCase()
                    .includes(term.toLowerCase()))
            );
        } else {
            setPokemonFiltered(
                [simplePokemonList.find((poke) => poke.id === term)!]
            );
        }

        setPokemonFiltered(
            simplePokemonList.filter(
                (poke) => poke.name.toLowerCase()
                .includes(term.toLowerCase()))
        );

    }, [term]);


    if (isFetching) return <Loading />;

    return (
        <View style={{
            flex: 1,
            // marginTop: (Platform.OS === 'ios') ? top : top + 10,
            marginHorizontal: 20
        }}>
            <SearchInput
                onDebounce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 30,
                }}
            />

            <FlatList
                // data={simplePokemonList}
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}

                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,
                    }}>{term}</Text>
                )}

                renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
            />
        </View>
    )
};

export default SearchScreen;

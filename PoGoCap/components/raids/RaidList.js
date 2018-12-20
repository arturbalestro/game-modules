import React from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, Text } from 'react-native';

const styles = StyleSheet.create({
    raidTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        margin: 10
    },
    raidContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch'
    },
    raidItem: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        textAlignVertical: 'center',
        padding: 10,
        width: '100%'
    },
    raidGroupList: {
        marginTop: 10
    },

    raidGroup: {
        marginTop: 10
    },

    raidText: {
        lineHeight: 15
    },
    boldText: {
        fontWeight: 'bold'
    }
});

export default class RaidList extends React.Component {

    render() {
        return(
            <ScrollView>
                <Text style={styles.raidTitle}>Upcoming raids:</Text>
            
                <View style={styles.raidContainer}> 
                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 5: <Text style={styles.boldText}>Heatran</Text>
                        </Text>

                        <Text>
                            Pokéstop: <Text style={styles.boldText}>Rotary Norte</Text>
                        </Text>

                        <Text>
                            Opens: <Text style={styles.boldText}>13:30</Text>
                        </Text>

                        <View style={styles.raidGroupList}>
                            <Text style={styles.boldText}>Raid Groups:</Text>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>13:50</Text>
                                </Text>
                                
                                <View>
                                    <Text>Auro - Mystic - 34</Text>
                                    <Text>ArtrmisiaDK - Instinct - 37</Text>
                                    <Text>Elielton - Instinct - 40</Text>
                                    <Text>Jorge - Instinct - 39</Text>
                                    <Text>Fred - Valor - 32</Text>
                                </View>
                            </View>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>14:00</Text>
                                </Text>
                                
                                <View>
                                    <Text>Auro - Mystic - 34</Text>
                                    <Text>Elielton - Instinct - 40</Text>
                                    <Text>Dio - Mystic - 38</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 4: <Text style={styles.boldText}>Walrein</Text>
                        </Text>
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 3: <Text style={styles.boldText}>Jynx</Text>
                        </Text> 
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 3: <Text style={styles.boldText}>Piloswine</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

AppRegistry.registerComponent('PoGoCap', () => RaidList);
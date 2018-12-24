import React from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';

import AddRaidForm from './AddRaidForm';

const styles = StyleSheet.create({
    raidTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        margin: 10
    },
    raidContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    raidItem: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        textAlignVertical: 'center',
        marginBottom: 10,
        padding: 10,
        minWidth: 150
    },
    raidGroupList: {
        marginTop: 10
    },

    raidGroup: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 10,
        padding: 10
    },
    raidGroupMembers: {
        marginBottom: 10
    },

    raidText: {
        lineHeight: 15
    },
    boldText: {
        fontWeight: 'bold'
    }
});

export default class RaidList extends React.Component {

    handleJoinGroup() {
        alert('Joining feature is inactive now!');
    }

    handleAddRaid() {
        alert('Adding raids will be available soon');
        return(
            <AddRaidForm />
        );
    }

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
                                
                                <View style={styles.raidGroupMembers}>
                                    <Text>Auro - Mystic - 34</Text>
                                    <Text>ArtemisiaDK - Instinct - 37</Text>
                                    <Text>Elielto - Instinct - 40</Text>
                                    <Text>Jorge - Instinct - 39</Text>
                                    <Text>Fred - Valor - 32</Text>
                                </View>

                                <Button style={styles.button} onPress={() => this.handleJoinGroup()} title="Join this group" />
                            </View>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>14:00</Text>
                                </Text>
                                
                                <View style={styles.raidGroupMembers}>
                                    <Text>Auro - Mystic - 34</Text>
                                    <Text>Elielto - Instinct - 40</Text>
                                    <Text>Dio - Mystic - 38</Text>
                                </View>

                                <Button onPress={() => this.handleJoinGroup()} title="Join this group" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 4: <Text style={styles.boldText}>Walrein</Text>
                        </Text>

                        <Text>
                            Pokéstop: <Text style={styles.boldText}>Igreja Nossa Senhora Aparecida</Text>
                        </Text>

                        <Text>
                            Opens: <Text style={styles.boldText}>12:21</Text>
                        </Text>

                        <View style={styles.raidGroupList}>
                            <Text style={styles.boldText}>Raid Groups:</Text>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>12:30</Text>
                                </Text>
                                
                                <View style={styles.raidGroupMembers}>
                                    <Text>Balestro</Text>
                                    <Text>Juliana</Text>
                                    <Text>Julio +1</Text>
                                    <Text>Costa +1 (2 rodadas)</Text>
                                    <Text>Alessandro (2 rodadas)</Text>
                                </View>

                                <Button onPress={() => this.handleJoinGroup()} title="Join this group" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 3: <Text style={styles.boldText}>Jynx</Text>
                        </Text> 

                        <Text>
                            Pokéstop: <Text style={styles.boldText}>Fonte Total</Text>
                        </Text>

                        <Text>
                            Opens: <Text style={styles.boldText}>11:00</Text>
                        </Text>

                        <View style={styles.raidGroupList}>
                            <Text style={styles.boldText}>Raid Groups:</Text>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>11:15</Text>
                                </Text>
                                
                                <View style={styles.raidGroupMembers}>
                                    <Text>Guilherme</Text>
                                    <Text>Martina</Text>
                                </View>

                                <Button onPress={() => this.handleJoinGroup()} title="Join this group" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.raidItem}>
                        <Text>
                            Raid lvl 3: <Text style={styles.boldText}>Piloswine</Text>
                        </Text>

                        <Text>
                            Pokéstop: <Text style={styles.boldText}>Azulão Dentuço</Text>
                        </Text>

                        <Text>
                            Opens: <Text style={styles.boldText}>15:35</Text>
                        </Text>

                        <View style={styles.raidGroupList}>
                            <Text style={styles.boldText}>Raid Groups:</Text>

                            <View style={styles.raidGroup}>
                                <Text>
                                    Battle: <Text style={styles.boldText}>15:40</Text>
                                </Text>
                                
                                <View style={styles.raidGroupMembers}>
                                    <Text>Elielto</Text>
                                    <Text>Jorge</Text>
                                    <Text>Cris</Text>
                                    <Text>Diego +1</Text>
                                </View>

                                <Button onPress={() => this.handleJoinGroup()} title="Join this group" />
                            </View>
                        </View>
                    </View>

                    <Button onPress={() => this.handleAddRaid()} title="Add a new Raid" />
                </View>
            </ScrollView>
        )
    }
}
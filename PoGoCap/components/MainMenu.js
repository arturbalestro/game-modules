import React from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#000',
        color: '#FFF',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 10
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center'
    }
});

export default class MainMenu extends React.Component {

    handleSelectMenu(menu) {
        alert(menu);
    }

    render() {
        return(
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.button} onPress={() => this.handleSelectMenu('Raids')}>
                    <Text style={styles.buttonText}>Raids</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.handleSelectMenu('Pokémon')}>
                    <Text style={styles.buttonText}>Pokémon</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => this.handleSelectMenu('Friends')}>
                    <Text style={styles.buttonText}>Friends</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

AppRegistry.registerComponent('PoGoCap', () => MainMenu);
import { StyleSheet } from 'react-native';

export default friendStyles = StyleSheet.create({
    friendContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        marginTop: 10
    },
    friendItem: {
        flex: 1,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        textAlignVertical: 'center',
        marginBottom: 10,
        padding: 10,
        minWidth: 150
    },
    boldText: {
        fontWeight: 'bold'
    },
    italicText: {
        fontStyle: 'italic'
    },
    marginBottom: {
        marginBottom: 10
    }
});
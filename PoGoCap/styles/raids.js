import { StyleSheet } from 'react-native';

export default raidStyles = StyleSheet.create({
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
        alignItems: 'stretch',
        padding: 10
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
    },

    raidFormContainer: {
        padding: 10,
        width: '100%',
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'center'
    },
    textField: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        color: '#333',
        width: '100%',
        minHeight: 40,
        paddingLeft: 5,
        marginBottom: 10
    },
    label: {
        paddingTop: 10,
        paddingBottom: 10
    },
    dropdown: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        width: '100%',
        minHeight: 40
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'steelblue',
        borderRadius: 4,
        padding: 10,
        marginLeft: 5,
        minWidth: '48%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});
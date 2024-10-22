// Home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to OTP Authentication App</Text>
            <Text style={styles.description}>
                please click the button below to log in.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#BEBDB8',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

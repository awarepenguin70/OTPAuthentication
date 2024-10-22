import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            // Sign out the user
            await auth().signOut();
            // Reset the navigation stack to login and remove the OTP related screens
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 40, marginTop: 150 }}>
                Welcome to the Dashboard :3
            </Text>

            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: "#841584",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

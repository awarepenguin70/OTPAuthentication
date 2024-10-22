import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// Import navigation hooks from React Navigation
import { useNavigation } from "@react-navigation/native";
// Import Firebase authentication module (make sure it's properly initialized in your firebaseConfig file)
import { auth } from "./firebaseConfig"; // Ensure this path is correct

export default function Login() {
    // State variables for storing phone number, verification code, and confirmation
    const [phonenumber, setPhoneNumber] = useState(""); // Phone number input
    const [code, setCode] = useState(""); // Verification code input
    const [confirm, setConfirm] = useState(null); // Confirmation object for OTP
    const navigation = useNavigation(); // Hook to access navigation prop

    // Function to send the verification code to the user's phone number
    const signInWithPhoneNumber = async () => {
        try {
            // Send verification code and store confirmation object
            const confirmation = await auth.signInWithPhoneNumber(phonenumber);
            setConfirm(confirmation); // Store confirmation for later use
            // Navigate to Detail page after sending the code
            navigation.navigate("Detail", { uid: confirmation.user.uid });
        } catch (error) {
            // Log error and show alert in case of failure
            console.log("Error sending code:", error);
            Alert.alert("Error sending code. Please try again.");
        }
    };

    // Function to confirm the verification code sent to the phone
    const confirmCode = async () => {
        try {
            // Confirm the code with the confirmation object
            const userCredentials = await confirm.confirm(code);
            const user = userCredentials.user; // Get user info from credentials

            // Check if the user exists in Firestore
            const userDocument = await firebase.firestore().collection("users").doc(user.uid).get();
            if (userDocument.exists) {
                // If user exists, navigate to Dashboard
                navigation.navigate("Dashboard");
            } else {
                // If user is new, navigate to Detail
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            // Log error and show alert in case of invalid code
            console.log("Invalid code:", error);
            Alert.alert("Invalid code. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 40, marginTop: 150 }}>
                Phone Number Authentication using Firebase
            </Text>

            {!confirm ? (
                // If confirmation hasn't been set, show phone number input
                <>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>
                        Enter your phone number
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: '100%',
                            borderColor: 'black',
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10
                        }}
                        placeholder="eg +91 6360458234"
                        value={phonenumber}
                        onChangeText={setPhoneNumber} // Update phone number state
                    />

                    <TouchableOpacity
                        onPress={signInWithPhoneNumber} // Trigger phone number sign-in
                        style={{
                            backgroundColor: "#841584",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                            Send Code
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                // If confirmation is set, show code input
                <>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>
                        Enter the code sent to your phone
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: '100%',
                            borderColor: 'black',
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10
                        }}
                        placeholder="Enter code"
                        value={code}
                        onChangeText={setCode} // Update code state
                    />

                    <TouchableOpacity
                        onPress={confirmCode} // Trigger code confirmation
                        style={{
                            backgroundColor: "#841584",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
                            Confirm Code
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

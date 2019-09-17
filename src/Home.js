import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSession: "aaaa"
        };
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>Home Screen</Text>
                {this.state.loginSession ? (
                    <Button
                        title="move"
                        onPress={() => this.props.navigation.navigate("Detail")}
                    />
                ) : (
                    <Button
                        title="Please SignIn"
                        onPress={() =>
                            this.props.navigation.navigate("Authenticate")
                        }
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

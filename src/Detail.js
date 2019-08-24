import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);

export default class DetailScreen extends React.Component {
    handleSignOut = () => {
        Amplify.Auth.signOut()
            .then(() => this.props.navigation.navigate("Home"))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>Detail Screen</Text>
                <Button title="Sign Out" onPress={this.handleSignOut} />
            </View>
        );
    }
}

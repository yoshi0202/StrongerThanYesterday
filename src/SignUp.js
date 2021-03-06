import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }
    changeStateFunc = (type, val) => {
        return this.props.changeState(type, val);
    };
    render() {
        return (
            <View style={styles.form}>
                <Input
                    label="Email"
                    leftIcon={{
                        type: "font-awesome",
                        name: "envelope"
                    }}
                    onChangeText={value => this.changeStateFunc("email", value)}
                    placeholder="my@email.com"
                />
                <Input
                    label="Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onChangeText={value =>
                        this.changeStateFunc("password", value)
                    }
                    placeholder="p@ssw0rd123"
                    secureTextEntry
                />
                <Input
                    label="Confirm Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onChangeText={value =>
                        this.changeStateFunc("confirmPassword", value)
                    }
                    placeholder="p@ssw0rd123"
                    secureTextEntry
                />
                <Button title="Submit" onPress={this.props.handleSignUp} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        width: "90%"
    }
});

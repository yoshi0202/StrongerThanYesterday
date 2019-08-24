import React from "react";
import { StyleSheet, View, Button, Text, Alert, Modal } from "react-native";
import { ButtonGroup, Input } from "react-native-elements";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";
import Signup from "./SignUp";
import Signin from "./SignIn";

Amplify.configure(aws_exports);

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            modalVisible: false,
            selectedIndex: 0
        };
        this.buttons = ["Sign Up", "Sign In"];
    }
    changeState = (type, val) => {
        switch (type) {
            case "email":
                this.setState({
                    email: val
                });
                break;

            case "password":
                this.setState({
                    password: val
                });
                break;

            case "confirmPassword":
                this.setState({
                    confirmPassword: val
                });
                break;

            case "confirmationCode":
                this.setState({
                    confirmationCode: val
                });
                break;

            default:
                console.log("error");
                break;
        }
    };
    updateIndex = () => {
        const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
        this.setState({ selectedIndex: newIndex });
    };
    handleSignUp = () => {
        const { email, password, confirmPassword } = this.state;
        if (password === confirmPassword) {
            Amplify.Auth.signUp({
                username: email,
                password,
                attributes: { email }
            })
                .then(() => this.setState({ modalVisible: true }))
                .catch(err => console.log(err));
        } else {
            Alert.alert("Passwords do not match.");
        }
    };

    handleSignIn = () => {
        const { email, password } = this.state;
        Amplify.Auth.signIn(email, password)
            .then(user => this.props.navigation.navigate("Detail"))
            .catch(err => {
                Alert.alert(err);
                console.log("handleSignIn:エラー発生");
                console.log(err);
            });
    };
    handleConfirmationCode = () => {
        const { email, confirmationCode } = this.state;
        Amplify.Auth.confirmSignUp(email, confirmationCode, {})
            .then(() => {
                this.setState({ modalVisible: false });
                this.props.navigation.navigate("Detail");
            })
            .catch(err => {
                Alert.alert(err);
                console.log(err);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={this.buttons}
                />
                {this.state.selectedIndex === 0 ? (
                    <Signup
                        changeState={(type, val) => this.changeState(type, val)}
                        handleSignUp={this.handleSignUp}
                    />
                ) : (
                    <Signin
                        changeState={(type, val) => this.changeState(type, val)}
                        handleSignIn={this.handleSignIn}
                    />
                )}
                <Modal visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Input
                            label="Confirmation Code"
                            leftIcon={{ type: "font-awesome", name: "lock" }}
                            onChangeText={value =>
                                this.setState({ confirmationCode: value })
                            }
                        />
                        <Button
                            title="Submit"
                            onPress={this.handleConfirmationCode}
                        />
                    </View>
                </Modal>
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

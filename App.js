import React from "react";
import { View, Text, Button } from "react-native";
import * as Font from "expo-font";
import AppNavigator from "./AppNavigator";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {
        if (!this.state.isReady) {
            return (
                <View>
                    <Text>loading...</Text>
                </View>
            );
        } else {
            return <AppNavigator />;
        }
    }
}

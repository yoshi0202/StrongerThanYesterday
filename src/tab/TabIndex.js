import React, { Component } from "react";
import Show from "./Show";
import User from "./User";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

const Stack = createStackNavigator({
    Show: { screen: Show },
    User: { screen: User }
});
const bottomContainer = createAppContainer(Stack);
export default class TabIndex extends React.Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("Show")}
                    >
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("User")}
                    >
                        <Icon name="camera" />
                        <Text>User</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

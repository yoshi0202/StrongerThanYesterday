import React from "react";
import { AppRegistry, View, StatusBar, Image } from "react-native";
import {
    Container,
    Body,
    Content,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Input,
    Item,
    Label,
    Button,
    Text
} from "native-base";

export default class User extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>User</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Item floatingLabel style={{ marginTop: 20 }}>
                        <Label>User</Label>
                    </Item>
                    <Image
                        source={{
                            uri:
                                "https://windii.jp/wp-content/uploads/2018/07/react-native.png"
                        }}
                        style={{
                            height: 240,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

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
    Item,
    Label,
    Button,
    Text
} from "native-base";

export default class Show extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Show</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Item floatingLabel style={{ marginTop: 20 }}>
                        <Label>Show</Label>
                    </Item>
                    <Image
                        source={{
                            uri:
                                "https://windii.jp/wp-content/uploads/2018/09/react-native-black.jpg"
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

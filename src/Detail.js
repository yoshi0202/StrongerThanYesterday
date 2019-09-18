import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    Alert,
    FlatList
} from "react-native";
import { Input, ListItem } from "react-native-elements";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";
import Icon from "react-native-vector-icons/FontAwesome";

Amplify.configure(aws_exports);
export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            loading: true,
            modalVisible: false,
            post: ""
        };
    }
    getTimeStamp = () => {
        return new Date().getTime();
    };
    createRandID = () => {
        return Math.random()
            .toString(36)
            .slice(-8);
    };
    currentDate = () => {
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        return (
            date +
            "/" +
            month +
            "/" +
            year +
            " " +
            hours +
            ":" +
            min +
            ":" +
            sec
        );
    };
    changeFeed = value => {
        this.setState({ post: value });
    };
    openModal = () => {
        this.setState({ modalVisible: true });
    };
    closeModal = () => {
        this.setState({
            modalVisible: false,
            loading: true
        });
        this.scanAllPosts();
    };
    handleSignOut = () => {
        Amplify.Auth.signOut()
            .then(() => this.props.navigation.navigate("Home"))
            .catch(err => console.log(err));
    };
    addPost = async () => {
        if (this.state.post === "") {
            Alert.alert("text me");
            return;
        }
        const apiName = "api7ac6c396";
        const path = "/posts";
        const putParams = {
            body: {
                device_id: "testtest",
                timestamp: this.getTimeStamp(),
                post_id: this.createRandID(),
                event_id: "post",
                data: {
                    post: this.state.post
                }
            }
        };
        Amplify.API.post(apiName, path, putParams)
            .then(response => {
                this.closeModal();
                console.log("success!");
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error.response);
            });
    };
    scanAllPosts = async () => {
        const apiName = "api7ac6c396";
        const path = "/posts";
        const myInit = {
            response: true,
            headers: {},
            queryStringParameters: {}
        };
        Amplify.API.get(apiName, path, myInit).then(result => {
            this.setState({
                userData: result.data
            });
            this.setState({ loading: false });
        });
    };
    componentDidMount = () => {
        this.setState({ loading: true });
        this.scanAllPosts();
    };
    render() {
        const animating = this.state.loading;
        return (
            <View
                style={{
                    backgroundColor: "green",
                    flex: 1
                }}
            >
                {this.state.loading ? (
                    <ActivityIndicator
                        animating={animating}
                        color="#0000aa"
                        size="large"
                    />
                ) : (
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text>
                                Detail
                                Screen...................................................
                            </Text>
                        </View>
                        <FlatList
                            data={this.state.userData}
                            renderItem={({ item }) => (
                                <ListItem
                                    title={`${item.device_id} ${item.post_id}`}
                                    subtitle={item.data.post}
                                    keyExtractor={item.post_id}
                                />
                            )}
                        />
                        <Icon name="plus" size={50} onPress={this.openModal} />
                        <Button title="Sign Out" onPress={this.handleSignOut} />
                        <Modal
                            visible={this.state.modalVisible}
                            animationType={"slide"}
                        >
                            <View style={styles.modalcontainer}>
                                <Input
                                    label="AddFeed"
                                    leftIcon={{
                                        type: "font-awesome",
                                        name: "lock"
                                    }}
                                    onChangeText={value =>
                                        this.changeFeed(value)
                                    }
                                />
                                <Button
                                    onPress={() => this.addPost()}
                                    title="AddFeed!"
                                ></Button>
                                <Button
                                    onPress={() => this.closeModal()}
                                    title="Close modal"
                                ></Button>
                            </View>
                        </Modal>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

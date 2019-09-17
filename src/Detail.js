import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    Alert
} from "react-native";
import { Input } from "react-native-elements";
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
        // this.getData();
    };
    handleSignOut = () => {
        Amplify.Auth.signOut()
            .then(() => this.props.navigation.navigate("Home"))
            .catch(err => console.log(err));
    };
    addFeed = async () => {
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
                // this.getData();
                this.setState({ loading: false });
                this.closeModal();
                console.log("success!");
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error.response);
            });
    };
    getData = async () => {
        const apiName = "apib3b16946";
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
        });
    };
    componentDidMount = () => {
        this.setState({ loading: false });
        // this.getData();
    };
    render() {
        const animating = this.state.loading;
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
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
                        <Text>Detail Screen</Text>
                        {this.state.userData.map(datas => (
                            <Text key={datas.post_id}>
                                {datas.data.event_user},{datas.data.post},
                                {datas.data.updated_at}
                            </Text>
                        ))}
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
                                    onPress={() => this.addFeed()}
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

import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Home";
import Detail from "./src/Detail";
import Authenticate from "./src/Authenticate";

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            header: null
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions: () => ({
            header: null
        })
    },
    Authenticate: Authenticate
});

export default createAppContainer(AppNavigator);

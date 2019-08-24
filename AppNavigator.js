import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/Home";
import Detail from "./src/Detail";
import Authenticate from "./src/Authenticate";

const AppNavigator = createStackNavigator({
    Home: Home,
    Detail: Detail,
    Authenticate: Authenticate
});

export default createAppContainer(AppNavigator);

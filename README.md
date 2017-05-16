# Basic ReactNavigation Example App and Tutorial
This is a simple 3-page application that demonstrates the basic usage of [React Navigation](https://reactnavigation.org/) as a navigation tool. It is extremely easy to understand. This step-by-step tutorial will take you through the basic concepts. We are using [NativeBase](https://nativebase.io/) as the UI library to design our pages.<br />
<br />
# Find full code [here](https://github.com/GeekyAnts/native-base-react-navigation-stack-navigator)
<br />
![ReactNavigation Gif](https://github.com/GeekyAnts/native-base-docs/raw/master/docs/assets/StackNavigation.gif) <br />

## Aim
We are creating a 3-page application with buttons on each page that takes us to the other page <code>onPress</code>. <br />

## Installation

1. **Create React Native App**: Use [CRNA](https://github.com/react-community/create-react-native-app) tool to create an App like this <br />
<code>
$ npm install -g create-react-native-app
</code> <br />
<code>
$ create-react-native-app my-app
</code> <br />
<code>
$ cd my-app/
</code> <br />
<code>
$ npm start
</code> <br />
2. **Installing Libraries** <br /> With a React Native project SetUp, We can now install all required Libraries as follows. <br />
a. **React Navigation** <br />
Do this
<code>
npm install --save react-navigation
</code> <br />
b. **NativeBase** <br />
<code>
npm install native-base --save
</code> <br />
**Configure all dependencies by running the following command** <br />
<code>
react-native link
</code> <br />
By the end of Installation, your package.json file should look something like this.<br />

![StackNavigation PackageJson](https://github.com/GeekyAnts/native-base-docs/raw/master/docs/assets/StackNavigationPackage.png) <br />

## Lets Play

With our basic project setup we can now start building our App. <br />
Make a folder at the project root by the name of <code>src</code>. Inside this folder we make 3 folders <code>ChatScreen</code> <code>HomeScreen</code> <code>ProfileScreen</code>. <br />

## HomeScreen

This is going to be the first landing screen of out App. We are going to implement the navigation logic here.<br />
For our purpose here, we have used **DrawerNavigator** for navigation through the entire app.<br />
Further screens will have **nested navigators** in them. <br />
Go ahead and add the following file in your project. <br />

**Code HomeScreen/HomeScreen.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
export default class HomeScreen extends React.Component {
  render() {
    return (
      &lt;Container>
        &lt;Header>
          &lt;Left>
            &lt;Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              &lt;Icon name="menu" />
            &lt;/Button>
          &lt;/Left>
          &lt;Body>
            &lt;Title>HomeScreen&lt;/Title>
          &lt;/Body>
          &lt;Right />
        &lt;/Header>
        &lt;Content padder>
          &lt;Card>
            &lt;CardItem>
              &lt;Body>
                &lt;Text>Chat App to talk some awesome people!&lt;/Text>
              &lt;/Body>
            &lt;/CardItem>
          &lt;/Card>
          &lt;Button
            full
            rounded
            dark
            style=&lcub;&lcub; marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Chat")}>
            &lt;Text>Chat With People&lt;/Text>
          &lt;/Button>
          &lt;Button
            full
            rounded
            primary
            style=&lcub;&lcub; marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}>
            &lt;Text>Goto Profiles&lt;/Text>
          &lt;/Button>
        &lt;/Content>
      &lt;/Container>
    );
  }
}
</code></pre><br />

**Explained**
1. Here we have simply added some buttons, each to <code>openDrawer</code> or navigate to other components.
2. The **navigation** object is available as a prop to us as we declare this component inside a *DrawerNavigator* in index.js. <br />

**Code HomeScreen/index.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    Profile: { screen: Profile }
  },
  {
    contentComponent: props => &lt;SideBar {...props} />
  }
);
export default HomeScreenRouter;
</code></pre><br />

**Explained**
1. Here we have simply imported all the screens we will be needing. We will be building these screens in the comming sections. These screens in fact are **router components** which themselves have multiple screens.
2. We pass the screens to the **DrawerNavigator** as shown above.
3. Note how we have used a custom [NativeBase](https://nativebase.io/) components using **customComponent** prop and we pass our custom *drawer* component.<br />

## SideBar

This is going to be our custom drawer component where we put buttons to navigate to different screens available. <br />
Navigation object is available as <code>this.props.navigation</code> since we passed the props in the <code>HomeScreen</code> component. <br />

**Code SideBar/SideBar.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {
  render() {
    return (
      &lt;Container>
        &lt;Content>
          &lt;Image
            source=&lcub;&lcub;
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style=&lcub;&lcub;
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            &lt;Image
              square
              style=&lcub;&lcub; height: 80, width: 70 }}
              source=&lcub;&lcub;
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          &lt;/Image>
          &lt;List
            dataArray={routes}
            renderRow={data => {
              return (
                &lt;ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  &lt;Text>{data}&lt;/Text>
                &lt;/ListItem>
              );
            }}
          />
        &lt;/Content>
      &lt;/Container>
    );
  }
}
</code></pre><br />

## ChatScreen

This screen comprises of **TabNavigator** component. We are going to have three screens here to chat to three different people. <br />
We will also create our own custom component for Tabs. Its done as follows.

**Code ChatScreen/index.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React, { Component } from "react";
import LucyChat from "./LucyChat.js";
import JadeChat from "./JadeChat.js";
import NineChat from "./NineChat.js";
import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from "native-base";
export default (MainScreenNavigator = TabNavigator(
  {
    LucyChat: { screen: LucyChat },
    JadeChat: { screen: JadeChat },
    NineChat: { screen: NineChat }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        &lt;Footer>
          &lt;FooterTab>
            &lt;Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LucyChat")}>
              &lt;Icon name="bowtie" />
              &lt;Text>Lucy&lt;/Text>
            &lt;/Button>
            &lt;Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("JadeChat")}>
              &lt;Icon name="briefcase" />
              &lt;Text>Nine&lt;/Text>
            &lt;/Button>
            &lt;Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("NineChat")}>
              &lt;Icon name="headset" />
              &lt;Text>Jade&lt;/Text>
            &lt;/Button>
          &lt;/FooterTab>
        &lt;/Footer>
      );
    }
  }
));
</code></pre><br />

**Explained** <br />
1. We have simply imported three screens to work as Tabs as shown above.
2. We pass these  screens to **TabNavigator** component.
3. Notice how we pass our Tab component through **tabBarComponent** prop.
4. Navigation is available as props. <br />

#### Sample screen

**Code ChatScreen/LucyChat.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  Label
} from "native-base";
import HomeScreen from "../HomeScreen";
export default class LucyChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      &lt;Container>
        &lt;Header>
          &lt;Left>
            &lt;Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              &lt;Icon name="menu" />
            &lt;/Button>
          &lt;/Left>
          &lt;Body>
            &lt;Title>Lucy Chat&lt;/Title>
          &lt;/Body>
          &lt;Right />
        &lt;/Header>
        &lt;Content padder>
          &lt;Item floatingLabel style=&lcub;&lcub; marginTop: 20 }}>
            &lt;Label>Lucy Chat&lt;/Label>
            &lt;Input />
          &lt;/Item>
          &lt;Button
            rounded
            danger
            style=&lcub;&lcub; marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}>
            &lt;Text>Goto Lucy Profile&lt;/Text>
          &lt;/Button>
        &lt;/Content>
      &lt;/Container>
    );
  }
}
</code></pre><br />

## Profile
This screen includes example for StackNavigation.<br />
**Code ProfileScreen/index.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React, { Component } from "react";
import Profile from "./Profile.js";
import EditScreenOne from "./EditScreenOne.js";
import EditScreenTwo from "./EditScreenTwo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Profile: { screen: Profile },
  EditScreenOne: { screen: EditScreenOne },
  EditScreenTwo: { screen: EditScreenTwo }
}));
</code></pre><br />

**Code ProfileScreen/Profile.js** <br />
<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React from "react";
import { AppRegistry, Alert } from "react-native";
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1
} from "native-base";
import { StackNavigator } from "react-navigation";
import EditScreenOne from "./EditScreenOne.js";
import EditScreenTwo from "./EditScreenTwo.js";
export default class Profile extends React.Component {
  componentDidMount() {
    Alert.alert("No Users Found", "Oops, Looks like you are not signed in");
  }
  render() {
    return (
      &lt;Container>
        &lt;Content padder>
          &lt;Card>
            &lt;CardItem>
              &lt;Icon active name="paper-plane" />
              &lt;Text>Show User profiles here&lt;/Text>
              &lt;Right>
                &lt;Icon name="close" />
              &lt;/Right>
            &lt;/CardItem>
          &lt;/Card>
          &lt;Button
            full
            rounded
            primary
            style=&lcub;&lcub; marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("EditScreenOne")}>
            &lt;Text>Goto EditScreen One&lt;/Text>
          &lt;/Button>
        &lt;/Content>
      &lt;/Container>
    );
  }
}
Profile.navigationOptions = ({ navigation }) => ({
  header: (
    &lt;Header>
      &lt;Left>
        &lt;Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          &lt;Icon name="menu" />
        &lt;/Button>
      &lt;/Left>
      &lt;Body>
        &lt;Title>Profile&lt;/Title>
      &lt;/Body>
      &lt;Right />
    &lt;/Header>
  )
});
</code></pre><br />

**Explained** <br />
1. We have Navigation as a **StackNavigation** prop here. In the UI, we have different buttons to navigate to screens on stack. Notice how we imported screens above.
2. Notice how we passed the **DrawerNavigator** prop inside our Profile screen header above.

**Code ProfileScreen/EditScreenOne.js** <br />
This screen is a simple part of StackNavigation, we have a header with a back button as shown below. <br />

<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React from "react";
import { AppRegistry, Alert } from "react-native";
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1
} from "native-base";
export default class EditScreenOne extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      &lt;Header>
        &lt;Left>
          &lt;Button transparent onPress={() => navigation.goBack()}>
            &lt;Icon name="arrow-back" />
          &lt;/Button>
        &lt;/Left>
        &lt;Body>
          &lt;Title>EditScreenOne&lt;/Title>
        &lt;/Body>
        &lt;Right />
      &lt;/Header>
    )
  });
  render() {
    return (
      &lt;Container>
        &lt;Content padder>
          &lt;Card>
            &lt;CardItem>
              &lt;Icon active name="paper-plane" />
              &lt;Text>Edit Screen 1&lt;/Text>
              &lt;Right>
                &lt;Icon name="close" />
              &lt;/Right>
            &lt;/CardItem>
          &lt;/Card>
          &lt;Button
            full
            rounded
            primary
            style=&lcub;&lcub; marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("EditScreenTwo")}>
            &lt;Text>Goto EditScreenTwo&lt;/Text>
          &lt;/Button>
        &lt;/Content>
      &lt;/Container>
    );
  }
}
</code></pre><br />

## Finishing up

Lastly we import our **routes** component from **HomeScreen** to our **App.js** file as shown. <br />
**Note** how we have loaded fonts for [NativeBase](https://nativebase.io/) since we have used expo here. <br />

**Code App.js**

<pre class="line-numbers"><code class="language-jsx"><code class="language-jsx">
import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo from "expo";
import HomeScreen from "./src/HomeScreen/index.js";
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return &lt;Expo.AppLoading />;
    }
    return &lt;HomeScreen />;
  }
}
</code></pre><br />
All has been taken care of now. Build and run.

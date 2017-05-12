import React from "react";
import { AppRegistry } from "react-native";

import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title
} from "native-base";
import { StackNavigator } from "react-navigation";
import MainScreenNavigator from "./ChatScreen.js";
import Profile from "./Profile.js";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: (
      <Header>
        <Body>
          <Title>Welcome</Title>
        </Body>
      </Header>
    )
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Chat App to talk some awesome people!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => navigate("Chat")}
          >
            <Text>Chat With People</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => navigate("Profile")}
          >
            <Text>Goto Profiles</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default (SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: MainScreenNavigator },
  Profile: { screen: Profile }
}));

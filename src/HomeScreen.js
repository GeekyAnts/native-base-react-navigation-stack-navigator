import React from 'react';
import {
  AppRegistry
} from 'react-native';
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title } from 'native-base';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen.js';
import Profile from './Profile.js';

 class HomeScreen extends React.Component {
  static navigationOptions = {
    header:
                <Header>
                    <Body>
                        <Title>Welcome</Title>
                    </Body>
                </Header>
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
  <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>Chat App to talk to lucy!</Text>
            </Body>
          </CardItem>
        </Card>
        <Button full dark style= {{ marginTop: 10 }}
          onPress={() => navigate('Chat')}><Text>Chat With Lucy</Text></Button>
        <Button full primary style= {{ marginTop: 10 }}
          onPress={() => navigate('Profile')}><Text>Goto Lucy Profile</Text></Button>
      </Content>
  </Container>
    );
  }
}
export default SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Profile: { screen: Profile }
});

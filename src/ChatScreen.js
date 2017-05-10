import React from 'react';
import {
  AppRegistry
} from 'react-native';
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title } from 'native-base';
export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header>
               <Left>
                  <Button transparent onPress= {()=> navigation.goBack()}>
                      <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                    <Title>ChatScreen</Title>
                </Body>
                <Right />
            </Header>,
  });
  render() {
    const {navigate}= this.props.navigation;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>Chat with Lucy</Text>
              </Body>
            </CardItem>
          </Card>
            <Button full primary
              onPress={() => navigate('Profile')}><Text>Goto Lucy Profile</Text></Button>
        </Content>
      </Container>
    );
  }
}

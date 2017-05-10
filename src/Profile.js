import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button } from 'native-base';

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header>
               <Left>
                  <Button transparent onPress= {()=> navigation.goBack()}>
                      <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
            </Header>,
  });
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>Oops!! Looks like Lucy is private person</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

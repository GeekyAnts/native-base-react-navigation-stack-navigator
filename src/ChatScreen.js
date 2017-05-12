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
  FooterTab
} from "native-base";
import { TabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";

class LucyChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <Item rounded style={{ marginTop: 20 }}>
            <Input placeholder="Talk to Lucy..." />
          </Item>
          <Button
            rounded
            danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}
          >
            <Text>Goto Lucy Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class NineChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <Item rounded style={{ marginTop: 20 }}>
            <Input placeholder="Talk to Nine..." />
          </Item>
          <Button
            rounded
            success
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}
          >
            <Text>Goto Nine Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

class JadeChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <Item rounded style={{ marginTop: 20 }}>
            <Input placeholder="Talk to Jade..." />
          </Item>
          <Button
            rounded
            info
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}
          >
            <Text>Goto Jade Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default (MainScreenNavigator = TabNavigator(
  {
    LucyChat: { screen: LucyChat },
    JadeChat: { screen: JadeChat },
    NineChat: { screen: NineChat }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      console.log(props, "Important");
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LucyChat")}
            >
              <Icon name="bowtie" />
              <Text>Lucy</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("JadeChat")}
            >
              <Icon name="briefcase" />
              <Text>Jade</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("NineChat")}
            >
              <Icon name="headset" />
              <Text>Nine</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));

MainScreenNavigator.navigationOptions = ({ navigation }) => ({
  header: (
    <Header noShadow>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>ChatScreen</Title>
      </Body>
      <Right />
    </Header>
  )
});

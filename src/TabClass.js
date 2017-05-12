import { Container, Content, Tab, Tabs, Header } from 'native-base';
import React, { Component } from 'react';
import HomeScreen from './HomeScreen.js';
​export default class TabClass extends React.Component {
    render() {
        return (
            <Container>
            <Content>
                <Tabs>
                  <Tab heading="Lucy">
                      <HomeScreen />
                  </Tab>
                  <Tab heading="Jade">
                      <Text>Jade dajkbdjkanjkxn</Text>
                  </Tab>
                  <Tab heading="Nine">
                    <Text>Nine dahdkjahkjd</Text>
                  </Tab>
                </Tabs>
              </Content>
            </Container>
        );
    }
}

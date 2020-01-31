import React, { Component } from "react";
import Profile from "./Profile.js";
import EditScreenOne from "./EditScreenOne.js";
import EditScreenTwo from "./EditScreenTwo.js";
import { createStackNavigator } from "react-navigation-stack";
const DrawNav = createStackNavigator(
  {
    Profile: { screen: Profile },
    EditScreenOne: { screen: EditScreenOne },
    EditScreenTwo: { screen: EditScreenTwo }
  },
  {
    initialRouteName: "Profile"
  }
)

export default DrawNav;

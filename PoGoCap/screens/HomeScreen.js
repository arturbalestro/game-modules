import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import homeStyles from '../styles/home';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let logo = require("../assets/images/pogologo.png");

    return (
      <View style={homeStyles.container}>
        {/* <View style={homeStyles.tabBarInfoContainer}>
          <Text style={homeStyles.tabBarInfoText}>Saving this for notifications</Text>
        </View> */}

        <ScrollView style={homeStyles.container} contentContainerStyle={homeStyles.contentContainer}>
          <View style={homeStyles.welcomeContainer}>
            {/* <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={homeStyles.welcomeImage}
            /> */}

            <Image source={logo} style={homeStyles.welcomeImage} />
            <Text style={homeStyles.getStartedText}>PoGoCap</Text>
          </View>

          <View style={homeStyles.getStartedContainer}>
            {/* {this.renderDevelopmentModeWarning()} */}

            {this.renderSubtitle()}

            {/* <MainMenu /> */}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderSubtitle() {
    return(
      <View>
        <Text style={homeStyles.developmentModeText}>
          You play Pokémon Go, but find it hard to get your friends together to play?
        </Text>
        <Text style={homeStyles.developmentModeText}> 
          PoGoCap can help you with that!
        </Text>

        <Text style={homeStyles.developmentModeText}>PoGoCap allows you to:</Text>

        <Text>* Register nearby Raids and Pokémon.</Text>
        <Text>* Add your trainer info to share with other players, including pokémon for trade and friends list.</Text>
        <Text>* Connect to friends (from your list or not) and form raid lists that can be shared with anyone.</Text>
        <Text>* Help organize your trades and battles easily by checking player availability and pokémon roster.</Text>
      </View>
    )
  }

  renderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={homeStyles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={homeStyles.developmentModeText}>
          This is the development mode of PoGoCap. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={homeStyles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

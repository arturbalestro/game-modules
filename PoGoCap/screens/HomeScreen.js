import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import MainMenu from '../components/MainMenu';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let logo = require("../assets/images/pogologo.png");

    return (
      <View style={styles.container}>
        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Saving this for notifications</Text>
        </View> */}

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {/* <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            /> */}

            <Image source={logo} style={styles.welcomeImage} />
            <Text style={styles.getStartedText}>PoGoCap</Text>
          </View>

          <View style={styles.getStartedContainer}>
            {/* {this.renderDevelopmentModeWarning()} */}

            {this.renderSubtitle()}

            <MainMenu />
          </View>
        </ScrollView>
      </View>
    );
  }

  renderSubtitle() {
    return(
      <View>
        <Text style={styles.developmentModeText}>
          You play Pokémon Go, but find it hard to get your friends together to play?
        </Text>
        <Text style={styles.developmentModeText}> 
          PoGoCap can help you with that!
        </Text>

        <Text style={styles.developmentModeText}>PoGoCap allows you to:</Text>

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
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          This is the development mode of PoGoCap. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'scroll'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    minHeight: 600
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

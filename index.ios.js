/**
 * This is a starting place for RollCall.
 * It is adapted from the react-native IMDB list tutorial - https://facebook.github.io/react-native/docs/tutorial.html
 * Right now, it just makes a call to our backend as soon as the app starts. it then displayes this info in a shitty list view.
 *
 * Note: all IOS functionality is in this 1 file, which is okay for now becuase the program is so small.
 *       As it grown we need a solid directory structure.
 */
import React, {
    AppRegistry,
    Component,
    Image,
    ListView,
    StyleSheet,
    TextInput,
    Text,
    View,
} from 'react-native';


/**
 * Urls that are endpoints on the backend
 */
var BACKEND_URL = 'http://localhost:5000/',
    MOCK_FRIENDS_URL = BACKEND_URL + 'mockFriends',
    ALL_USERS_ENDPOINT = BACKEND_URL + 'getAllFriends';

/**
 * RollCall front end
 * Displays the rcfront client
 */
class rcfront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * Handles the http get request, puts the result into the state
   */
  fetchData() {
    fetch(ALL_USERS_ENDPOINT)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
          });
        })
        .done();
  }

  /**
   * This function is the render function for rcfront. This is the views entrypoint.
   * @returns {XML}
     */
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    if (!this.state.loggedIn) {
      return (
        <View>
          <View style={styles.listView}>
            <Text>Log in ya bitch.</Text>
          </View>
          <View style={styles.listView}>
            <TextInput style={styles.input} type="TextInput" name="someName" />
          </View>
        </View>
    );
    }
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderFriend}
            style={styles.listView}
        />
    );
  }

  /**
   * Displayed while network request is loading
   * @returns {XML}
     */
  renderLoadingView() {
    return (
        <View style={styles.container}>
          <Text>Loading friends...</Text>
        </View>
    );
  }

  /**
   * View for a friend row
   * @param friend
   * @returns {XML}
     */
  renderFriend(friend) {
    return (
        <View style={styles.container}>
          <View>
            <Image
              style={styles.thumbnail}
              source={{uri: 'https://scontent-lga3-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/971626_10153295432192680_895592458353613198_n.jpg?oh=5d2b7e301e7b692bf84f17fe9b389a92&oe=574F91E2'}}
            />
          </View>
          <View>
            <Text style={styles.thumbnail}>{friend.mood}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.plansTonight}>{friend.schedule}</Text>
          </View>
        </View>
    );
  }
}

/**
 * Styles are all in one object
 */
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: '#000000'
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  plansTonght: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#00FF00',
  }
});

AppRegistry.registerComponent('rcfront', () => rcfront);

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  console.log('hello')
  return (


        <View style={styles.container}>
          <HomeScreen />
          <Text>Hello world! This is my first app stfrrrrrartup!!! React!</Text>
          <StatusBar style="auto" />
        </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import ComponentsScreen from './src/screens/ComponentsScreen';

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Components: ComponentsScreen,
//   },
//   {
//     initialRouteName: 'Components',
//     defaultNavigationOptions: {
//       title: 'App',
//     },
//   }
// );

// export default createAppContainer(navigator);
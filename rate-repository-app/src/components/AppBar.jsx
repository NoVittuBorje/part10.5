import { View, StyleSheet,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import {Link ,} from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    display:"flex",
    rowGap: 16,
    paddingTop: Constants.statusBarHeight*2,
    paddingBottom:Constants.statusBarHeight /2,
    paddingLeft:Constants.statusBarHeight/2,
    backgroundColor:'#00000099',
  },
  text:{
    color:"white",
    padding:1,
  },
});

const AppBar = () => {
  return( 
  <View style={styles.container}>
    <ScrollView contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: "space-evenly",
          
        }} horizontal>
    <Link to="/"><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Repositories</Text></Link>
    <Link to="/login"><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Sign in</Text></Link>
    </ScrollView> 
    </View>
  )
};

export default AppBar;
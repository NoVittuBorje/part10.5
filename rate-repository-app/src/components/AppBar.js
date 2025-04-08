import { View, StyleSheet,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import {Link ,} from 'react-router-native';
import useME from './hooks/useMe';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from './hooks/useAuthStorage';
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
  const {data} = useME();
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage();
  const me = data
  ? data.me
  : null;
  const Loginstate = () => {
    if(me == null){
      return <Link to="/login"><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Sign in</Text></Link>
    }else{
      return <Link onPress={() => {LogOut()}} ><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Log out</Text></Link>
    }
  }
  const Review = () => {
    if (me == null){
      return <Link to="/signup"><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Sign up</Text></Link>
    }
    else{
      return <Link to="/review"><Text fontWeight="bold" fontSize="subheading" style={styles.text}>Create review</Text></Link>
    }
  }
  const LogOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
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
    {Review()}
    {Loginstate()}
    </ScrollView> 
    </View>
  )
};

export default AppBar;
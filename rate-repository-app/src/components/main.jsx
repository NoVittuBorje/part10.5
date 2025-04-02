import {  StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes ,useParams} from 'react-router-native';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/:repoId" element={<SingleRepo />} />
      </Routes>
      
    </View>
  );
};

export default Main;
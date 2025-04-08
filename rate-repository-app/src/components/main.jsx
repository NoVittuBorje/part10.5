import {  StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

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
        <Route path='/review' element={<CreateReview/>} />
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
      
    </View>
  );
};

export default Main;
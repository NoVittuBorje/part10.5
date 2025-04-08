import { FlatList, View, StyleSheet,TouchableHighlight } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from './hooks/useRepositories';
import { useNavigate } from "react-router";
import { useState } from 'react';
import Text from './Text';
import {  Menu, Divider, PaperProvider } from 'react-native-paper';
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor:"#00000033",
  },
  buttontext:{
    fontSize:20,
    alignItems:"center",
    fontWeight:"bold",
},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({setorderBy,setorderDirection,repositories,currentOrder,setCurrentOrder}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  console.log(repositories)
  let navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={{zIndex:20,overflow:"visible",elevation:10}}
      ListHeaderComponent={
        <PaperProvider>
          <View>
            <Menu
              visible={visible}
              style={{width:"100%",alignContent:"center",alignItems:"center"}}
              onDismiss={closeMenu}
              anchor={<TouchableHighlight onPress={openMenu} style={{borderStyle:"solid",borderWidth:1,margin:1, padding:20,alignItems:"center"}}><Text style={styles.buttontext}>{currentOrder}</Text></TouchableHighlight>}>
              
              <Menu.Item onPress={() => {setorderBy("CREATED_AT");setorderDirection("DESC");setCurrentOrder("Latest repositories")}} title="Latest repositories" />
              <Divider />
              <Menu.Item  onPress={() => {setorderBy("RATING_AVERAGE");setorderDirection("DESC");setCurrentOrder("Highest ranked repositories")}} title="Highest ranked repositories" />
              <Divider />
              <Menu.Item  onPress={() => {setorderBy("RATING_AVERAGE");setorderDirection("ASC");setCurrentOrder("Lowest ranked repositories")}} title="Lowest ranked repositories" />
            </Menu>
          </View>
        </PaperProvider>}
      renderItem={({item, index, separators}) => (
        <TouchableHighlight  onPress={()=> navigate(`/${item.id}`)}>
        <RepositoryItem
          item={item}>
        </RepositoryItem>
        </TouchableHighlight>
        )}
    />
  );
};
  
const RepositoryList = () => {
  const [orderBy , setorderBy] = useState("CREATED_AT")
  const [orderDirection, setorderDirection] = useState("DESC")
  const [currentOrder ,setCurrentOrder] = useState("Latest Repositories")
  const direction = {
    orderBy: orderBy,
     orderDirection: orderDirection 
    }
  const { repositories,loading } = useRepositories(direction);
  console.log(repositories)
  if (!loading){
  return(
  <RepositoryListContainer  setorderBy={setorderBy} currentOrder={currentOrder} setorderDirection={setorderDirection} setCurrentOrder={setCurrentOrder} repositories={repositories.repositories}/>
  )
}
return <Text>loading</Text>
}
  


export default RepositoryList;
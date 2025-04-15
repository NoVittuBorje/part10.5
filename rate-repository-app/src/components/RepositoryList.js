import { FlatList, View, StyleSheet,TouchableHighlight } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from './hooks/useRepositories';
import { useNavigate } from "react-router";
import React, { useState ,useRef} from 'react';
import Text from './Text';

import {  Searchbar,Divider } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';
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
  searchbar: {
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    borderCurve:10,
    margin: 6,
    borderRadius:5
  },
  searchbarinput:{minHeight:0},
  headercontainer:{backgroundColor:"#00000033"},
  listheadercontainer:{zIndex:9,elevation:10},

});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View style={styles.headercontainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={(e) => {props.setSearchQuery(e);props.handleSearch(e)}}
        value={props.searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchbarinput}
      />
      <Divider></Divider>
      <Picker
        selectedValue={props.currentOrder}
        onValueChange={(itemvalue,itemindex) => {
          props.setCurrentOrder(itemvalue)
          if (itemindex === 0){
            props.setorderBy("CREATED_AT");props.setorderDirection("DESC")
          }
          if(itemindex === 1){
            props.setorderBy("RATING_AVERAGE");props.setorderDirection("DESC");
          }
          if(itemindex === 2){
            props.setorderBy("RATING_AVERAGE");props.setorderDirection("ASC");
          }
          }}>
          <Picker.Item value="Latest repositories" label="Latest repositories" />
          <Picker.Item value="Highest ranked repositories" label="Highest ranked repositories" />
          <Picker.Item value="Lowest ranked repositories" label="Lowest ranked repositories" />
    </Picker>
    </View>
    );
  };
  renderItem({item}){
    const props = this.props
    return(
      <View >
      <TouchableHighlight onPress={()=> props.navigate(`/${item.id}`)}>
      <RepositoryItem
        item={item}>
      </RepositoryItem>
      </TouchableHighlight>
      </View>
    )
  }
  render() {
    const props = this.props
    return (
      <FlatList
      data={props.repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={styles.listheadercontainer}
      ListHeaderComponent={this.renderHeader}
      onEndReachedThreshold={0.5}
      onEndReached={({ distanceFromEnd }) => {
        if (distanceFromEnd === 0) return;
        props.onEndReach()
      }}
      renderItem={({item, index, separators}) => {
        return (this.renderItem({item}))
      }}
    />
    );
  }
}


const RepositoryList = () => {
  const [orderBy , setorderBy] = useState("CREATED_AT")
  const [orderDirection, setorderDirection] = useState("DESC")
  const [currentOrder ,setCurrentOrder] = useState("Latest Repositories")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")
  let navigate = useNavigate();
  const onEndReach = () => {
    fetchMore()
  };
  const handleSearch = useDebouncedCallback(
    // function
    (value) => {
      setSearchKeyword(value);
    },
    // delay in ms
    1000
  );
  const variables = {
    orderBy: orderBy,
    orderDirection: orderDirection,
    searchKeyword:searchKeyword
  }
  const { repositories, fetchMore } = useRepositories({
    first: 8,
    variables
  });
  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];
  return(
    <RepositoryListContainer onEndReach={onEndReach} navigate={navigate} handleSearch={handleSearch} setSearchQuery={setSearchQuery} searchQuery={searchQuery} setorderBy={setorderBy} currentOrder={currentOrder} setorderDirection={setorderDirection} setCurrentOrder={setCurrentOrder} repositoryNodes={repositoryNodes}/>
  )
}
  


export default RepositoryList;
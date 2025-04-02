import { FlatList, View, StyleSheet,TouchableHighlight } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from './hooks/useRepositories';
import { useNavigate } from "react-router";
import Text from './Text';
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor:"#00000033",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  let navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index, separators}) => (
        <TouchableHighlight onPress={()=> navigate(`/${item.id}`)}>
        <RepositoryItem
          item={item}>
        </RepositoryItem>
        </TouchableHighlight>
        )}
    />
  );
};

const RepositoryList = () => {
  const { repositories,loading } = useRepositories();
  if (!loading){
  return <RepositoryListContainer repositories={repositories.repositories} />;
}
  return <Text>loading</Text>
};

export default RepositoryList;
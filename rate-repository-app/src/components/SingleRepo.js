import { TouchableHighlight, View ,StyleSheet,FlatList} from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem"
import useRepo from "./hooks/useRepo"
import {useParams} from 'react-router-native';
import { Linking } from "react-native";
const styles = StyleSheet.create({
    container:{
        display:"flex",
        alignItems:"center",
        flexDirection: 'column',
        margin:0,
        paddingBottom:10,
    },
    reviewRating:{
        height: 35,
        width: 35,
        borderStyle:"solid",
        borderRadius: 1000,
        borderColor:"blue",
        borderWidth:2,
        alignContent:"center",
        textAlign:"center",
        color:"blue",
        textAlignVertical:"center",
    },
    reviewcontainer:{
        display:"flex",
        margin:0,
        paddingBottom:10,
    },
    reviewHeadRow:{
        flexDirection:"row",
        paddingBottom:10,
        marginLeft:10,
        marginTop:10,
        columnGap:5,
    },
    reviewHeadcolumn:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        paddingLeft:10,
        paddingRight:20,
        rowGap:4,
    },
    separator: {
        height: 10,
        backgroundColor:"#00000033",
      },
    button:{
        width:"60%",
        borderWidth: 1,
        borderColor:'#00000099',
        borderRadius:3,
        margin:3,
        padding: 10,
        fontSize:15,
        alignItems:"center",
        backgroundColor:"#0366d6",
      },
    buttontext:{
        fontSize:15,
        color:"white",
        fontWeight:"bold",}
})
const RepositoryInfo = ({repository}) => {
    return (
        <View style={{width:"100%",flex:1,}}>
        <View style={styles.container}>
            <View style={{width:"100%"}}>
                <RepositoryItem item={repository} />
            </View>
            <TouchableHighlight style={styles.button} onPress={()=>{Linking.openURL(repository.url)}}><Text style={styles.buttontext}>Open in GitHub</Text></TouchableHighlight>
        </View>
        <View style={styles.separator}></View>
        </View>
        
        
    )
}
const ReviewItem = ({review}) => {
    const date = new Date(review.createdAt).toLocaleDateString('en-GB').replace("/",".")
    return (
        <View style={styles.reviewcontainer}>
            <View style={styles.reviewHeadRow}>
                <Text style={styles.reviewRating} fontWeight="bold" fontSize="subheading" >{review.rating}</Text>
            <View style={styles.reviewHeadcolumn}>
                <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                <Text color="textSecondary" >{date}</Text>
                <Text>{review.text}</Text>
            </View>
            </View>
        </View>
    )
}
const ItemSeparator = () => <View style={styles.separator} />;
const SingleRepo = () => {
    const id = useParams()
    const { repo,loading } = useRepo(id.repoId);
    if (!loading){
        const reviewNodes = repo.repository.reviews
    ? repo.repository.reviews.edges.map((edge) => edge.node)
    : [];
    return (
        <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={ItemSeparator}
        
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repo.repository} />}
        
      />
      
    );
  }
    return <Text>loading</Text>

}
export default SingleRepo
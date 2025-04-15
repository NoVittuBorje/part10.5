import { View ,Image,StyleSheet,FlatList, Button,TouchableHighlight, Alert} from "react-native"
import Text from "./Text"
import React, { useState ,useRef} from 'react';
import useME from "./hooks/useMe";
import { useNavigate } from "react-router";
import useDeleteReview from "./hooks/useDeleteReview";

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
    buttonrow: {
        flexDirection:"row",
        width:"100%",
        justifyContent:"center",
        paddingLeft:30,
        paddingRight:30,
    },
    button:{
        borderWidth: 1,
        borderColor:'#00000099',
        borderRadius:3,
        margin:3,
        padding: 10,
        alignItems:"center",
        alignSelf:"center",
        backgroundColor:"#0366d6",
        width:"50%"
      },
      buttontext:{
        alignItems:"center",
        color:"white",
        fontWeight:"bold",
    },
    redbutton:{
        borderWidth: 1,
        borderColor:'#00000099',
        borderRadius:3,
        margin:3,
        padding: 10,
        alignItems:"center",
        alignSelf:"center",
        backgroundColor:"#e01010",
        width:"50%"
      }
})

const ItemSeparator = () => <View style={styles.separator} />;

export class ReviewListContainer extends React.Component {
    renderItem({item}){
        const props = this.props
        const date = new Date(item.createdAt).toLocaleDateString('en-GB').replace("/",".")
        return (
        <View>
            <View key={item.id} style={styles.reviewcontainer}>
                <View style={styles.reviewHeadRow}>
                    <Text style={styles.reviewRating} fontWeight="bold" fontSize="subheading" >{item.rating}</Text>
                <View style={styles.reviewHeadcolumn}>
                    <Text fontWeight="bold" fontSize="subheading">{item.repository.fullName}</Text>
                    <Text color="textSecondary" >{date}</Text>
                    <Text>{item.text}</Text>
                </View>
                </View>
                <View style={styles.buttonrow} >
            <TouchableHighlight style={styles.button} onPress={()=> props.navigate(`/${item.repository.id}`)}><Text style={styles.buttontext}>View repository</Text></TouchableHighlight>
            <TouchableHighlight style={styles.redbutton} onPress={() => this.alert({id:item.id})} ><Text style={styles.buttontext}>Delete review</Text></TouchableHighlight>
            </View>
            </View>
        </View>
        )
    }
    alert({id}){
        const props = this.props
        Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
              {text: 'Delete', 
                onPress: () => {
                    console.log("delete");
                    props.delete_review(id)
                    console.log(props.result,"result")
                    props.refetch()
                }},
        ]);
    }
    render() {
        const props = this.props
        return (
        <FlatList
        data={props.ReviewData}
        renderItem={({item, index, separators}) => {
            return (this.renderItem({item}))
        }}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
      />
        );
      }
}

const MyReviews = () => {
    const {data, error, loading,refetch} = useME(true)
    const navigate = useNavigate()
    const [delete_review,result] = useDeleteReview()
    let ReviewData = []
    if (loading){
        ReviewData = []
    }else{
        ReviewData = data.me.reviews
        ? data.me.reviews.edges.map((edge) => edge.node)
        : [];
      }
    return(
        <ReviewListContainer ReviewData={ReviewData} navigate={navigate} delete_review={delete_review} refetch={refetch} result={result}/>
    )
    
}
export default MyReviews
import { View ,Image,StyleSheet,TouchableHighlight} from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        backgroundColor: 'white',
        
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5,
        
    },
    headerrow:{
        flexDirection:"row",
        paddingBottom:10,
        marginLeft:10,
        marginTop:10,
        columnGap:5,
    },
    row:{
        flexDirection:"row",
        rowGap:10,
        justifyContent:"space-evenly",
    },
    boldtext:{
        fontWeight:"bold",
    },
    headcolumn:{
        display:"flex",
        flexDirection:"column",
        paddingLeft:10,
        maxWidth:"fit-content",
        maxHeight:"fit-content",
    },
    column:{
        flexDirection:"column",
        alignItems:"center",
        paddingRight:10,
        marginBottom:10,
    },
    bg:{
        alignSelf: 'flex-start',
        backgroundColor:"#0366d6",
        borderRadius:2,
    },
    whitetext:{
        color:"white",
        padding:3,
    }

})

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

const RepositoryItem = ({item}) => {
    let numbers = {stars:item.stargazersCount,forks:item.forksCount,reviews:item.reviewCount,ratings:item.ratingAverage}
    if (numbers.stars > 1000 | numbers.forks > 1000 | numbers.ratings > 1000 | numbers.reviews > 1000){
        numbers.stars = formatNumber(numbers.stars)
        numbers.forks = formatNumber(numbers.forks)
        numbers.ratings = formatNumber(numbers.ratings)
        numbers.reviews = formatNumber(numbers.reviews)
    }

    return (
    
    <View style={styles.container} testID="repositoryItem">
        <View style={styles.headerrow}>
        <Image style={styles.tinyLogo}
        source={{
            uri: item.ownerAvatarUrl,
        }}></Image>
        <View style={styles.headcolumn}>
        <Text fontWeight="bold" fontSize="subheading" testID='fullName'>{item.fullName}</Text>
        <Text testID='description'>{item.description}</Text>
        
        <View style={styles.bg}>
        <Text testID='language' style={styles.whitetext}>{item.language}</Text> 
        </View>
        </View>
        </View>
        <View style={styles.row}>
            <View style={styles.column}>
                <Text testID='stars' style={styles.boldtext}>{numbers.stars}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.column}>
                <Text testID='forks' style={styles.boldtext}>{numbers.forks}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.column}>
                <Text testID='reviews' style={styles.boldtext}>{numbers.reviews}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.column}>
                <Text testID='ratings' style={styles.boldtext}>{numbers.ratings}</Text>
                <Text>Ratings</Text>
            </View>
        </View>
      </View>
    )
}
export default RepositoryItem
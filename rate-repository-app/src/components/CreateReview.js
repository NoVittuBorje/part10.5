import Text from "./Text"
import { View,TextInput ,StyleSheet,TouchableHighlight} from "react-native"
import { useFormik } from "formik"
import * as yup from 'yup';
import { useNavigate } from "react-router";
import useCreateReview from "./hooks/useCreateReview";
const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  input:{
    width:"90%",
    borderWidth: 2,
    borderColor: "#00000099",
    borderRadius:3,
    margin:3,
    padding: 10,
    fontSize:15,
    color:'#00000099',
  },
  invalidInput:{
    width:"90%",
    borderWidth: 2,
    borderColor: "#d73a4a",
    borderRadius:3,
    margin:3,
    padding: 10,
    fontSize:15,
    color:'#00000099',
  },
  submitbutton:{
    width:"90%",
    borderWidth: 1,
    borderColor:'#00000099',
    borderRadius:3,
    margin:3,
    padding: 10,
    fontSize:15,
    alignItems:"center",
    backgroundColor:"#0366d6",
  },
  submittext:{
    fontSize:15,
    alignItems:"center",
    color:"white",
    fontWeight:"bold",}
})
function getStyle(errors) {
    if (errors) {
      return styles.invalidInput
    }else{
      return styles.input
    }
  }
const validationSchema = yup.object().shape({
    OwnerName: yup.string().required("Repository owner name is required"),
    RepositoryName: yup.string().required("Repository name is required"),
    Rating: yup.number().min(1,"Has to be 1 or over").max(100,"Has to be under 100").required("Rating is required"),
    Text:yup.string().optional()
})

const CreateReview = () => {
  const [create,result] = useCreateReview()
  let Navigate = useNavigate();
  const onSubmit = async (values) => {
    try{
      const {data} = await create(values)
      if (data.createReview.repositoryId){
        Navigate(`/${data.createReview.repositoryId}`)
        }
      } catch (e) {
        console.log(e);
      }
    }
  if (!result.loading){
    return<CreateReviewContainer onSubmit={onSubmit}></CreateReviewContainer>
  }else{
    return <Text>loading...</Text>
  }
  }
const CreateReviewContainer = ({onSubmit}) => {
  const formik = useFormik({
    initialValues:{
      OwnerName:"",
      RepositoryName:"",
      Rating:"",
      Text:"",
    },
    onSubmit: values => {
      onSubmit(values)
    },
    validationSchema,
  })
  return (
    <View style={styles.container}>
      {formik.touched.OwnerName && formik.errors.OwnerName && (<Text style={{ color: "#d73a4a" }}>{formik.errors.OwnerName}</Text>)}
      <TextInput  style={getStyle(formik.errors.OwnerName)} value={formik.values.OwnerName}  placeholder='Repository owner name' onChangeText={formik.handleChange("OwnerName")}/>

      {formik.touched.RepositoryName && formik.errors.RepositoryName && (<Text style={{ color: '#d73a4a', }}>{formik.errors.RepositoryName}</Text>)}
      <TextInput style={getStyle(formik.errors.RepositoryName)} value={formik.values.RepositoryName}  placeholder='Repository name' onChangeText={formik.handleChange("RepositoryName")} />
        
      {formik.touched.Rating && formik.errors.Rating && (<Text style={{ color: '#d73a4a', }}>{formik.errors.Rating}</Text>)}
      <TextInput style={getStyle(formik.errors.Rating)} value={formik.values.Rating}  placeholder='Rating between 0 and 100' onChangeText={formik.handleChange("Rating")} />
        
      {formik.touched.Text && formik.errors.Text && (<Text style={{ color: '#d73a4a', }}>{formik.errors.Text}</Text>)}
      <TextInput multiline={true} style={getStyle(formik.errors.Text)} value={formik.values.Text} placeholder='Review' onChangeText={formik.handleChange("Text")} />
      <TouchableHighlight testID='button' style={styles.submitbutton} onPress={formik.handleSubmit} ><Text style={styles.submittext}>Create a Text</Text></TouchableHighlight>
  </View>
  )
}


export default CreateReview
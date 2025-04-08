import Text from "./Text"
import { View,TextInput ,StyleSheet,TouchableHighlight} from "react-native"
import { useFormik } from "formik"
import * as yup from 'yup';
import { useNavigate } from "react-router";
import useSignUp from "./hooks/useSignUp";
import useSignIn from "./hooks/useSignIn";
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
const validationSchema = yup.object().shape({
    username: yup.string().min(5,"Has to be 5 or over characters").max(50,"Has to be under 50 characters").required("Username is required"),
    password: yup.string().min(5,"Has to be 5 or over characters").max(50,"Has to be under 50 characters").required("Password is required"),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null],"Passwords must match"),
})
function getStyle(errors) {
    if (errors) {
      return styles.invalidInput
    }else{
      return styles.input
    }
  }
const SignUp = () => {
    let navigate = useNavigate();
    const [SignUp,result] = useSignUp()
    const [signIn,userResult] = useSignIn();
    const onSubmit = async (values) => {
        try{
            const {data} = await SignUp({values})
            const username = values.username
            const password = values.password
        if (data.createUser.id){
            const userdata  = await signIn({ username, password });
            if (userdata.data.authenticate.accessToken){
                navigate("/")
            }
          }
        } catch (e) {
          console.log(e);
        }
    }
    if (result.loading || userResult.loading){
        return <Text>loading...</Text>
    }else{
        return <SignUpContainer onSubmit={onSubmit}></SignUpContainer>
    }
}
const SignUpContainer = ({onSubmit}) => {
    const formik = useFormik({
        initialValues:{
          username:"",
          password:"",
          passwordConfirm:"",
        },
        onSubmit: values => {
          onSubmit(values)
        },
        validationSchema,
      })
    return (
        <View style={styles.container}>
        {formik.touched.username && formik.errors.username && (<Text style={{ color: "#d73a4a" }}>{formik.errors.username}</Text>)}
        <TextInput  style={getStyle(formik.errors.username)} value={formik.values.username} textContentType="username" placeholder='Username' onChangeText={formik.handleChange("username")}/>
        {formik.touched.password && formik.errors.password && (<Text style={{ color: '#d73a4a', }}>{formik.errors.password}</Text>)}
        <TextInput style={getStyle(formik.errors.password)} value={formik.values.password} secureTextEntry={true} placeholder='Password' onChangeText={formik.handleChange("password")} />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (<Text style={{ color: '#d73a4a', }}>{formik.errors.passwordConfirm}</Text>)}
        <TextInput style={getStyle(formik.errors.passwordConfirm)} value={formik.values.passwordConfirm} secureTextEntry={true} placeholder='Confirm password' onChangeText={formik.handleChange("passwordConfirm")} />
        <TouchableHighlight testID='button' style={styles.submitbutton} onPress={formik.handleSubmit} ><Text style={styles.submittext}>Sign in</Text></TouchableHighlight>
    </View>
    )
}
export default SignUp
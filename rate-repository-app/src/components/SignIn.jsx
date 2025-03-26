import Text from './Text';
import { useFormik } from 'formik';
import { View ,TextInput,Pressable, StyleSheet,TouchableHighlight,} from 'react-native';
import * as yup from 'yup';
import useSignIn from './hooks/useSignIn'
import { useState } from 'react';
import { useNavigate } from "react-router";
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
  loginbutton:{
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
  logintext:{
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
  username: yup.string().min(6,"Username has to be longer than 6").required("Username is required"),
  password: yup.string().min(8,"Password has to be longer than 8").required("Password required")
})
const SignIn = () => {
  const [signIn,result] = useSignIn();
  let navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      if (data.authenticate.accessToken){
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };
  const formik = useFormik({
    initialValues:{
      username:"",
      password:"",
    },
    onSubmit: values => {
      onSubmit(values)
    },
    validationSchema,
  })

  return(
    <View style={styles.container}>
      {formik.touched.username && formik.errors.username && (<Text style={{ color: "#d73a4a" }}>{formik.errors.username}</Text>)}
      <TextInput  style={getStyle(formik.errors.username)} value={formik.values.username} textContentType="username" placeholder='Username' onChangeText={formik.handleChange("username")}/>
      {formik.touched.password && formik.errors.password && (<Text style={{ color: '#d73a4a', }}>{formik.errors.password}</Text>)}
      <TextInput style={getStyle(formik.errors.password)} value={formik.values.password} textContentType="password" secureTextEntry={true} placeholder='Password' onChangeText={formik.handleChange("password")} />
      <TouchableHighlight style={styles.loginbutton} onPress={formik.handleSubmit} ><Text style={styles.logintext}>Sign in</Text></TouchableHighlight>
  </View>
)
};

export default SignIn;
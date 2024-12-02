import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";


 import { useDispatch, useSelector } from 'react-redux';
 import {signup}  from '../../API/action/auth'

function SignUp({ navigation }) {

  const dispatch = useDispatch()
  const [formData,setFormData] = useState({email:'',name:'',password:''})

  function handleSignUp () {
    dispatch(signup(formData));
  }

  function handleBackToLogin() {

     navigation.goBack("SignUp");


  }
  return (
    <View style={styles.container}>
      <PlaceHolderIcon />

      <AuthTitle>Create Account</AuthTitle>

      <AuthTextInput placeholder="Email" 
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <AuthTextInput placeholder="Name" 
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <AuthTextInput placeholder="Password" secureTextEntry 
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <AuthTextInput placeholder="Confirm Password" secureTextEntry
   
      />

      <AuthButton onPress={handleSignUp}>Sign Up</AuthButton>

      <AuthRedirectButton onPress={handleBackToLogin}>
        Already have an account? {<BoldText>Log In</BoldText>}
      </AuthRedirectButton>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

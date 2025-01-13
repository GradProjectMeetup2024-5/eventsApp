import { useContext, useState } from "react";

import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";
import AuthLayout from "../../components/ui/AuthUi/AuthLayout";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../API/action/auth";

function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [displayEmail, setDisplayEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  function handleSignUp() {
    dispatch(signup(formData));
  }

  function handleBackToLogin() {
    navigation.goBack("SignUp");
  }

  return (
    <AuthLayout message="Ready to join the fun? Let's get you started!">
      <AuthTextInput
        placeholder="Email"
        value={displayEmail}
        onChangeText={(text) => {
          setDisplayEmail(text);
          setFormData({ ...formData, email: text.toLowerCase().trim() });
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AuthTextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <AuthTextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <AuthTextInput placeholder="Confirm Password" secureTextEntry />

      <AuthButton onPress={handleSignUp}>Sign Up</AuthButton>

      <AuthRedirectButton onPress={handleBackToLogin}>
        Already have an account? {<BoldText>Log In</BoldText>}
      </AuthRedirectButton>
    </AuthLayout>
  );
}

export default SignUp;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../API/action/auth";

import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";
import AuthLayout from "../../components/ui/AuthUi/AuthLayout";

function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [displayEmail, setDisplayEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignUp() {
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    dispatch(signup(formData))

  }

  function handleBackToLogin() {
    navigation.goBack();
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
      <AuthTextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {errorMessage ? <BoldText style={{ color: "red" }}>{errorMessage}</BoldText> : null}

      <AuthButton onPress={handleSignUp}>Sign Up</AuthButton>

      <AuthRedirectButton onPress={handleBackToLogin}>
        Already have an account? {<BoldText>Log In</BoldText>}
      </AuthRedirectButton>
    </AuthLayout>
  );
}

export default SignUp;

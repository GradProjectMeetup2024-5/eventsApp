import { useState } from "react";

import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import AuthLayout from "../../components/ui/AuthUi/AuthLayout";
import BoldText from "../../components/ui/BoldText";

function ForgotPass({ navigation }) {
  const [displayEmail, setDisplayEmail] = useState("");

  function handleBackToLogin() {
    navigation.goBack("SignUp");
  }
  return (
    <AuthLayout message="Need a reset? Enter your email, and we'll guide you back in no time!">
      <AuthTextInput
        placeholder="Email"
        value={displayEmail}
        onChangeText={(text) => {
          setDisplayEmail(text);
          // setFormData({ ...formData, email: text.toLowerCase().trim() });
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AuthButton>Send</AuthButton>

      <AuthRedirectButton onPress={handleBackToLogin}>
        Already have an account? <BoldText>Log In</BoldText>
      </AuthRedirectButton>
    </AuthLayout>
  );
}

export default ForgotPass;

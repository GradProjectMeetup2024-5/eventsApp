import React from "react";
import { Text } from "react-native";
import Colors from "../../src/constants/Colors";

const BoldText = ({ children, style }) => (
  <Text style={[style, { fontWeight: "bold", color: Colors.gray.light }]}>
    {children}
  </Text>
);

export default BoldText;

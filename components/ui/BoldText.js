import React from "react";
import { Text } from "react-native";

const BoldText = ({ children, style }) => (
  <Text style={[style, { fontWeight: "bold" }]}>{children}</Text>
);

export default BoldText;

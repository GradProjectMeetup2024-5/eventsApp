import { View, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";

const { height } = Dimensions.get("window");

function PlaceHolderIcon() {
  return (
    <View style={styles.placeholderIcon}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
          fill="#61646B"
        />
      </Svg>
    </View>
  );
}

export default PlaceHolderIcon;

const styles = StyleSheet.create({
  placeholderIcon: {
    position: "absolute",
    top: height * 0.2,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    backgroundColor: "#D9D9D9",
    borderRadius: 28,
  },
});

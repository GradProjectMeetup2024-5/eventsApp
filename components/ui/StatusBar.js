import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Colors from "../../src/constants/Colors";

function StatusBarComponent({ children }) {
  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{
          backgroundColor: Colors.background.elevated,
        }}
      >
        <StatusBar style="dark" />
      </SafeAreaView>
      {children}
    </>
  );
}

export default StatusBarComponent;

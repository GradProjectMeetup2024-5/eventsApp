import { Shadow } from "react-native-shadow-2";

function CustomShadow({ children }) {
  return (
    /*<Shadow
      sides={{ bottom: true, top: false, start: false, end: true }}
      corners={{
        topStart: false,
        topEnd: false,
        bottomStart: true,
        bottomEnd: true,
      }}
      offset={[0, 0]}
      distance={6}
      startColor="rgba(0, 0, 0, 0.20)"
      endColor="rgba(0, 0, 0, 0.05)"
    >
      {children}
     </Shadow> */
    <>{children}</>
  );
}

export default CustomShadow;

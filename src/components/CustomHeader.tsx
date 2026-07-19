import { View, Text, StyleSheet, Image } from "react-native";

type Props = {
  title?: string;
};

export default function CustomHeader({ title = "Owe Me" }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});

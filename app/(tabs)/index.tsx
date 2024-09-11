import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Touchable,
} from "react-native";
import React from "react";
import itemList from "@/data/item.json";
import { ItemType } from "@/type/itemsType";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        keyExtractor={(_, index) => `item-${index}`}
        renderItem={({ item }) => (
          <Link href={`/listing/${String(item.id)}`} asChild>
            <TouchableOpacity>
              <Item item={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default HomeScreen;

export const Item = ({ item }: { item: any }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.resortImage }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item?.category}</Text>
        <Text style={styles.itemTitle}>{item?.name}</Text>
        <Text style={styles.itemSourceName}>{item?.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: "scroll",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  itemSourceInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: "#666",
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: "400",
    color: "#666",
  },
});

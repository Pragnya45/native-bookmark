import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ItemType } from "@/type/itemsType";
import itemList from "@/data/item.json";
import { useState, useEffect } from "react";
import { FlatList, Image, Touchable } from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Item } from "./index";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const bookmarkScreen = (props: Props) => {
  const [bookmarkItem, setBookmarkItem] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then((token: any) => {
      const res = JSON.parse(token);
      let item: ItemType[] = [];
      if (res) {
        res.forEach((element: any) => {
          let data: any = itemList.find((val: any) => val.id == element);
          item.push(data);
        });
        setBookmarkItem(item);
        setIsLoading(false);
      } else {
        setBookmarkItem([]);
        setIsLoading(false);
      }
    });
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={bookmarkItem}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={({ item }) => (
            <Link href={`/listing/${String(item.id)}`} asChild>
              <TouchableOpacity>
                <Item item={item} />
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
};

export default bookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: "scroll",
  },
});

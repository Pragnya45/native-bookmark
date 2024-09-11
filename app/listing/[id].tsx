import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ItemList from "@/data/item.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const itemDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookmark, setBookmark] = useState<boolean>(false);
  useEffect(() => {
    getItem();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      renderBookmark(item?.id);
    }
  }, [isLoading]);

  const getItem = () => {
    const result = ItemList?.find((item: any) => item?.id == id);
    setIsLoading(false);
    setItem(result);
  };
  const saveBookmark = async (itemId: string) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token: any) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val: string) => val === itemId);
        if (data == null) {
          res.push(itemId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("Item Saved");
        }
      } else {
        let bookmark = [];
        bookmark.push(itemId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("Item Saved");
      }
    });
  };
  const removeBookmark = async (itemId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then(
      (token: any) => {
        const res = JSON.parse(token);
        return res.filter((id: string) => id !== itemId);
      }
    );
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("Item unsaved");
  };
  const renderBookmark = async (itemId: string) => {
    await AsyncStorage.getItem("bookmark").then((token: any) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val: string) => val === itemId);
        if (data == null) {
          setBookmark(false);
        } else {
          setBookmark(true);
        }
      }
    });
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} style={{ margin: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookmark ? removeBookmark(item?.id) : saveBookmark(item?.id)
              }
            >
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={22}
                style={{ margin: 20 }}
                color={bookmark ? "red" : "#333"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>{item?.name}</Text>
        <View style={styles.newsInfoWrapper}>
          <Text style={styles.newsInfo}>{item?.location}</Text>
          <Text style={styles.newsInfo}>{item?.category}</Text>
        </View>
        <Image source={{ uri: item?.resortImage }} style={styles.newImg} />
        <Text style={styles.newsContent}>{item?.description}</Text>
      </ScrollView>
    </>
  );
};

export default itemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newImg: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: "#666",
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});

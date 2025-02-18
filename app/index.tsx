import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "@/components/Themed";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const ITEM_HEIGHT = 200;
const defaultCategory = { id: "1", label: "Any" };
const categoriesList = [
  defaultCategory,
  { id: "2", label: "Miscellaneous" },
  { id: "3", label: "Dark" },
  { id: "4", label: "Pun" },
  { id: "5", label: "Spooky" },
  { id: "6", label: "Christmas" },
];

// Add dark mode
export default function HomeScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    defaultCategory.id,
  ]);

  const [isFocus, setIsFocus] = useState(false);
  // MOVE TO SEPARATE COMPONENT
  const [inputValue, setInputValue] = useState("");
  const onChangeCategory = (items: string[]) => {
    // When we have selected "Any" category and trying to select other categories, the "Any" should be unselected
    if (
      items.includes(defaultCategory.id) &&
      selectedCategories.includes(defaultCategory.id)
    ) {
      const newValue = items.filter((item) => item !== defaultCategory.id);
      setSelectedCategories(newValue);
      return;
    }
    // When we have selected other categories and trying to select the "Any", the other categories should be unselected
    if (
      items.includes(defaultCategory.id) &&
      !selectedCategories.includes(defaultCategory.id)
    ) {
      setSelectedCategories([defaultCategory.id]);
      return;
    }
    setSelectedCategories(items);
  };
  return (
    // MOVE TO STYLES
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <View>
        <Link href="/scanner" style={{ marginTop: 20, marginBottom: 20 }}>
          <Text>Go to scanner screen</Text>
        </Link>
        <Text style={{ marginBottom: 10 }}>Categories</Text>
        {/* MOVE TO SEPARATE COMPONENT */}
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={categoriesList}
          value={selectedCategories}
          alwaysRenderSelectedItem
          maxSelect={5}
          labelField="label"
          valueField="id"
          placeholder="Select category"
          searchPlaceholder="Search..."
          onChange={onChangeCategory}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "grey" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />

        <TextInput
          style={{
            height: 20,
            width: "100%",
            borderColor: "black",
            borderWidth: 1,
          }}
          onChangeText={setInputValue}
          value={inputValue}
        />
        {/* <FlatList
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

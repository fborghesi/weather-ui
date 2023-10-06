import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, ListRenderItem, ListRenderItemInfo} from "react-native";
import { useEffect, useState } from "react";

interface CheckBoxListItem {
    id: string;
    text: string;
    checked: boolean;
}

type CheckBoxListItemChangedHandler = (item: CheckBoxListItem) => {};

interface CheckBoxListProperties {
    items: CheckBoxListItem[];
    onListItemChange?: CheckBoxListItemChangedHandler;
}

const CheckBoxList = (props: CheckBoxListProperties) => {
    const [listItems, setListItems] = useState<CheckBoxListItem[]>(props.items);

    const checkboxValueChanged = (newValue, index: number) => {
        const newItems = [...listItems];
        newItems[index].checked = newValue;
        setListItems(newItems);
        if (props.onListItemChange) {
            props.onListItemChange(newItems[index]);
        }
    };

    useEffect(() => {setListItems([...props.items])}, [props.items]);

    const _renderItem = (item: ListRenderItemInfo<CheckBoxListItem>) => {
        const listItem = item.item;
        const index = item.index;
        return (
            <View style={styles.section} key={`checkbox-item-${listItem.id}`}>
                <Checkbox
                    testID={`checkbox-item-${listItem.id}`}
                    style={styles.checkbox}
                    value={listItem.checked}
                    onValueChange={() =>
                        checkboxValueChanged(!listItems[index].checked, index)
                    }
                />
                <Text 
                    style={styles.paragraph}
                    testID={`text-item-${listItem.id}`}
                    >
                    {listItem.text}
                </Text>
            </View>
        );
    };

    //return <ScrollView style={styles.container}><View style={styles.innerView}>{listItems.map(_renderItem)}</View></ScrollView>
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={listItems} renderItem={_renderItem}  keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
        height: '100%',
    },
    innerView: {
        height: 500,
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});

export { CheckBoxList, CheckBoxListItem };


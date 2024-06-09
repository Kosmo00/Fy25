import { Text, TouchableOpacity } from "react-native";

export function MainButton({
    handlePress,
    color,
    txt
}: {
    handlePress: () => void;
    color: string;
    txt: string;
}) {
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ backgroundColor: color, flex: 1, alignItems: 'center', borderRadius: 10, marginHorizontal: 5, marginBottom: 20 }}
        >
            <Text style={{ color: 'white', padding: 20 }}>
                {txt}
            </Text>
        </TouchableOpacity>
    )
}
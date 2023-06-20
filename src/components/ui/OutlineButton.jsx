import { View, Text,StyleSheet,Pressable } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from 'react'
import Colors from '../../utlis/colors';

const OutlineButton = ({
    title,onPress,iconName
}) => {
  return (
    <Pressable onPress={onPress}
     style={({pressed}) => [styles.button,pressed && styles.pressed]}>
        <Ionicons name={iconName} size={18 } color={Colors.primary500}
        style={styles.icon}
        />
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    button: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        borderWidth:1,
        borderColor:Colors.primary500,
    },
    pressed: {
        opacity:0.7,
    },
    icon:{
        marginRight:6,

    },
    text: {
        color:Colors.primary500,
    },
});

export default OutlineButton
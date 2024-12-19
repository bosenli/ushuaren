import React from 'react';
import { Text, StyleSheet} from 'react-native'

const HomeScreen = ()=>{
    return <Text style={style.text}>HomeScreen</Text>
}

const style = StyleSheet.create({
    text:{
        fontSize: 30
    }
});

export default HomeScreen;
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine"
import { ScreenProp } from "../utils/DataTypes";

export default function Colibri({fadeAnim, scale, isDarkMode}: ScreenProp) {
    return (<Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
        <SafeAreaView className="bg-fl-bg dark:bg-neutral-900">
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View
            className="h-[100vh]"
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            
          ><GameEngine style={styles.container} >
         
  
          
  
        </GameEngine></View></SafeAreaView></Animated.View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F3E0"
    }
  });
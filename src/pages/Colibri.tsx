import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { GameEngine } from "react-native-game-engine"
import { COLIBRI, ScreenProp } from "../utils/Types";
import Bird from "../components/Bird";
import Matter from 'matter-js'
import Floor from "../components/Floor";

const Physics = (entities: any, { time }: any) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default function Colibri({fadeAnim, scale, isDarkMode}: ScreenProp) {
  console.log(COLIBRI)
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  const floor = Matter.Bodies.rectangle(0, COLIBRI.MAX_HEIGHT - COLIBRI.FLOOR_WIDTH, COLIBRI.MAX_WIDTH, COLIBRI.FLOOR_WIDTH, { isStatic: true });
  const bird = Matter.Bodies.rectangle(COLIBRI.MAX_WIDTH / 2, COLIBRI.MAX_HEIGHT / 2, COLIBRI.FLOOR_WIDTH, COLIBRI.FLOOR_WIDTH, { isStatic: false });
  Matter.World.add(world, [bird, floor])
    return (<Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
        <SafeAreaView className="bg-fl-bg dark:bg-neutral-900">
          <StatusBar hidden barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View
            className="h-[100vh]"
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            
          ><GameEngine systems={[Physics]} style={styles.container} entities={{physics: { 
            engine: engine, 
            world: world 
      },bird: {body: bird, color: "#ff00ff", size: {x: COLIBRI.FLOOR_WIDTH, y: COLIBRI.FLOOR_WIDTH}, renderer: (props: any) =>  <Bird {...props} />}, floor: {body: floor, size: {x: COLIBRI.MAX_WIDTH, y: COLIBRI.FLOOR_WIDTH}, color: "#ee0000", renderer: (props: any) => <Floor {...props} />}}} >
          
  
        </GameEngine></View></SafeAreaView></Animated.View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F3E0"
    }
  });
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {COLIBRI, ScreenProp} from '../utils/Types';
import Bird from '../components/Bird';
import Matter, {Body, Collision} from 'matter-js';
import Floor from '../components/Floor';
import { createRef } from 'react';



export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, (COLIBRI.MAX_HEIGHT / 2) - 100);
  let bottomPipeHeight = COLIBRI.MAX_HEIGHT - topPipeHeight - COLIBRI.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight]

  if (Math.random() < 0.5) {
      sizes = sizes.reverse();
  }

  return sizes;
}

export default function Colibri({fadeAnim, scale, isDarkMode}: ScreenProp) {
  console.log(COLIBRI);
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;
  const gameEngineRef = createRef<GameEngine>();
  const floor = Matter.Bodies.rectangle(
    COLIBRI.MAX_WIDTH / 2,
    COLIBRI.MAX_HEIGHT,
    COLIBRI.MAX_WIDTH,
    COLIBRI.FLOOR_WIDTH,
    {isStatic: true},
  );
  const ceiling = Matter.Bodies.rectangle(
    COLIBRI.MAX_WIDTH / 2,
    0,
    COLIBRI.MAX_WIDTH,
    COLIBRI.FLOOR_WIDTH,
    {isStatic: true},
  );
  const bird = Matter.Bodies.rectangle(
    COLIBRI.MAX_WIDTH / 4,
    COLIBRI.MAX_HEIGHT / 2,
    COLIBRI.FLOOR_WIDTH,
    COLIBRI.FLOOR_WIDTH,
  );
  let pipeHeights = generatePipes().concat(generatePipes());
  let pipes = {
    pipe0: Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH + (COLIBRI.PIPE_WIDTH / 2), pipeHeights[0] / 2, COLIBRI.PIPE_WIDTH, pipeHeights[0], { isStatic: true }),
    pipe1: Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH + (COLIBRI.PIPE_WIDTH / 2), COLIBRI.MAX_HEIGHT - (pipeHeights[1] / 2), COLIBRI.PIPE_WIDTH, pipeHeights[1], { isStatic: true }),
    pipe2: Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH * 2 - (COLIBRI.PIPE_WIDTH / 2), pipeHeights[2] / 2, COLIBRI.PIPE_WIDTH, pipeHeights[2], { isStatic: true }),
    pipe3: Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH * 2 - (COLIBRI.PIPE_WIDTH / 2), COLIBRI.MAX_HEIGHT - (pipeHeights[3] / 2), COLIBRI.PIPE_WIDTH, pipeHeights[3], { isStatic: true })
  }
  
  Matter.World.add(world, [floor, ceiling, bird, ...Object.values(pipes)]);
  const Physics = (entities: any, {touches, time}: any) => {
  touches
    .filter((t: any) => t.type === 'press')
    .forEach((t: any) => {
      Matter.Body.applyForce(bird, bird.position, {x: 0.0, y: -0.1});
    });

    for(let i=0; i<4; i++) {
      if (entities["pipe" + i].body.position.x <= -1 * (COLIBRI.PIPE_WIDTH / 2)) {
        const generatedHeights = generatePipes()
          pipeHeights[i] = generatedHeights[0]
          pipeHeights[(i % 2==0 ? i+1 : i-1)] = generatedHeights[1]
          console.log(pipeHeights, i)
          Matter.Body.setPosition( entities["pipe" + i].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: pipeHeights[i] / 2});
          entities["pipe" + i].size = {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[i]}
          Matter.Body.setPosition( entities["pipe" + (i % 2==0 ? i+1 : i-1)].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: COLIBRI.MAX_HEIGHT - (pipeHeights[(i % 2==0 ? i+1 : i-1)] / 2)});
          entities["pipe" + (i % 2==0 ? i+1 : i-1)].size = {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[(i % 2==0 ? i+1 : i-1)]}
          Matter.World.clear(world, false)  
          console.log(Object.values(entities))
          Matter.World.add(world, [floor, ceiling, bird, ...Object.values(entities).filter((v, i) => Object.keys(entities)[i].includes("pipe")).map((e: any) => e.body)]);
          // if (gameEngineRef.current) gameEngineRef.current.swap(entities)
          // Matter.Body.setPosition( entities["pipe" + i].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: entities["pipe" + i].body.position.y});
      } else {
          Matter.Body.translate( entities["pipe" + i].body, {x: -1, y: 0});
      }
  }
  Matter.Engine.update(engine, time.delta);

  return entities;
};
  return (
    <Animated.View style={{opacity: fadeAnim, transform: [{scale}]}}>
      <SafeAreaView className="bg-fl-bg dark:bg-neutral-900">
        <StatusBar
          hidden
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View
          className="h-[100vh]"
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          <GameEngine
            systems={[Physics]}
            style={styles.container}
            ref={gameEngineRef}
            entities={{
              physics: {
                engine: engine,
                world: world,
              },
              bird: {
                body: bird,
                color: '#551A8B',
                size: {x: COLIBRI.FLOOR_WIDTH, y: COLIBRI.FLOOR_WIDTH},
                renderer: Bird,
              },
              floor: {
                body: floor,
                size: {x: COLIBRI.MAX_WIDTH, y: COLIBRI.FLOOR_WIDTH},
                color: '#ee0000',
                renderer: Floor,
              },
              ceiling: {
                body: ceiling,
                size: {x: COLIBRI.MAX_WIDTH, y: COLIBRI.FLOOR_WIDTH},
                color: '#ee0000',
                renderer: Floor,
              },
              pipe0: {
                body: pipes.pipe0,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[0]},
                color: '#00FF00',
                renderer: Floor
              },
              pipe1: {
                body: pipes.pipe1,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[1]},
                color: '#00FF00',
                renderer: Floor
              },
              pipe2: {
                body: pipes.pipe2,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[2]},
                color: '#00FF00',
                renderer: Floor
              },
              pipe3: {
                body: pipes.pipe3,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipeHeights[3]},
                color: '#00FF00',
                renderer: Floor
              },
            }}></GameEngine>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3E0',
  },
});

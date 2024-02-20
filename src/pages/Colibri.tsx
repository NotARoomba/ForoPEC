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
import Matter, {Collision} from 'matter-js';
import Floor from '../components/Floor';

const Physics = (entities: any, {touches, time}: any) => {
  const engine = entities.physics.engine;
  const bird = entities.bird.body;

  touches
    .filter((t: any) => t.type === 'press')
    .forEach((t: any) => {
      Matter.Body.applyForce(bird, bird.position, {x: 0.0, y: -0.1});
    });

    for(let i=1; i<=4; i++){
      if (entities["pipe" + i].body.position.x <= -1 * (COLIBRI.PIPE_WIDTH / 2)){
        let [pipe1Height, pipe2Height] = generatePipes();
          // Matter.Body.setPosition( entities["pipe" + i].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: pipe1Height / 2});
          // entitkies["pipe" + i].size = {x: COLIBRI.PIPE_WIDTH, y: pipe1Height}
          // Matter.Body.setPosition( entities["pipe" + (i % 2==1 ? i+1 : i-1)].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: COLIBRI.MAX_HEIGHT - (pipe2Height / 2)});
          // entities["pipe" + (i % 2==1 ? i+1 : i-1)].size = {x: COLIBRI.PIPE_WIDTH, y: pipe2Height}
          Matter.Body.setPosition( entities["pipe" + i].body, {x: COLIBRI.MAX_WIDTH * 1.5 - (COLIBRI.PIPE_WIDTH / 2), y: entities["pipe" + i].body.position.y});
      } else {
          Matter.Body.translate( entities["pipe" + i].body, {x: -1, y: 0});
      }
  }
  Matter.Engine.update(engine, time.delta);

  return entities;
};

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
  let [pipe1Height, pipe2Height] = generatePipes();
  let pipe1 = Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH + (COLIBRI.PIPE_WIDTH / 2), pipe1Height / 2, COLIBRI.PIPE_WIDTH, pipe1Height, { isStatic: true });
        let pipe2 = Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH + (COLIBRI.PIPE_WIDTH / 2), COLIBRI.MAX_HEIGHT - (pipe2Height / 2), COLIBRI.PIPE_WIDTH, pipe2Height, { isStatic: true });

        let [pipe3Height, pipe4Height] = generatePipes();

        let pipe3 = Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH * 2 - (COLIBRI.PIPE_WIDTH / 2), pipe3Height / 2, COLIBRI.PIPE_WIDTH, pipe3Height, { isStatic: true });
        let pipe4 = Matter.Bodies.rectangle( COLIBRI.MAX_WIDTH * 2 - (COLIBRI.PIPE_WIDTH / 2), COLIBRI.MAX_HEIGHT - (pipe4Height / 2), COLIBRI.PIPE_WIDTH, pipe4Height, { isStatic: true });
  
  Matter.World.add(world, [floor, ceiling, bird, pipe1, pipe2, pipe3, pipe4]);
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
              pipe1: {
                body: pipe1,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipe1Height},
                color: '#00FF00',
                renderer: Floor
              },
              pipe2: {
                body: pipe2,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipe2Height},
                color: '#00FF00',
                renderer: Floor
              },
              pipe3: {
                body: pipe3,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipe3Height},
                color: '#00FF00',
                renderer: Floor
              },
              pipe4: {
                body: pipe4,
                size: {x: COLIBRI.PIPE_WIDTH, y: pipe4Height},
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

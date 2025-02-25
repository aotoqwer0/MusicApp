import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_SIZE = 300; // レコードサイズを大きく
const RADIUS = width * 0.75;
const Y_OFFSET = 10;  // 手前のY軸オフセットを減らす
const BACK_Y_OFFSET = -10; // 奥のY軸オフセットも同じ量に調整

// レコードデータを14個に変更
const records = Array.from({ length: 14 }).map((_, index) => ({
  id: `${index + 1}`,
  title: `Record ${index + 1}`,
}));

export default function CircularCarousel() {
  const rotation = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = rotation.value;
    },
    onActive: (event, ctx) => {
      // 回転の感度を調整
      rotation.value = ctx.startX + event.translationX / 4;
    },
    onEnd: (event) => {
      // スナップ角度を調整（14個に合わせて）
      const snapPoint = Math.round(rotation.value / 25.7) * 25.7;  // 360/14 ≈ 25.7度
      rotation.value = withSpring(snapPoint, {
        damping: 20,
        stiffness: 90,
      });
    },
  });

  const handleAlbumPress = (recordId: string) => {
    console.log(`Album ${recordId} pressed`);
    router.push(`/select_music/record/${recordId}`);  // 音楽再生画面へ遷移
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.carousel}>
          {records.map((record, index) => {
            const angle = (2 * Math.PI * index) / records.length;
            
            const animatedStyle = useAnimatedStyle(() => {
              const rotateAngle = (rotation.value / 180) * Math.PI + angle;
              
              // 基本的な位置計算
              const x = Math.sin(rotateAngle) * RADIUS;
              const z = Math.cos(rotateAngle) * RADIUS;
              
              // 手前と奥の判定
              const isFront = z > 0;
              
              // 手前と奥で異なる半径を使用
              const adjustedRadius = isFront 
                ? RADIUS * 2.0  // 手前のレコードは外側に
                : RADIUS * 0.9; // 奥のレコードは内側に
              
              // 調整後の位置計算
              const adjustedX = Math.sin(rotateAngle) * adjustedRadius;
              const adjustedZ = Math.cos(rotateAngle) * adjustedRadius;
              
              // Y座標の計算（より水平な視点に）
              const y = interpolate(
                adjustedZ,
                [-RADIUS, 0, RADIUS],
                [Y_OFFSET * 0.2, 0, BACK_Y_OFFSET * 0.2]  // Y軸の移動量を減らす
              );

              const distanceFromCenter = Math.sqrt(adjustedX * adjustedX + adjustedZ * adjustedZ);
              const normalizedDistance = distanceFromCenter / RADIUS;
              
              // 基本スケールの計算（より極端な遠近感）
              const baseScale = interpolate(
                normalizedDistance,
                [0, 0.3, 0.6, 1],
                [1.3, 1, 0.7, 0.4],
                'clamp'
              );
              
              // 手前と奥でスケールを調整
              const frontScale = isFront ? baseScale * 2 : baseScale * 0.6; // 奥をより小さく
              
              // 不透明度の調整
              const opacity = interpolate(
                normalizedDistance,
                [0, 0.5, 1],
                isFront ? [1, 1, 1] : [0.8, 0.6, 0.4], // 奥をより透明に
                'clamp'
              );

              // zIndexの計算（既存のコード）
              const zIndex = Math.round(interpolate(adjustedZ, [-RADIUS, RADIUS], [20, 0]));

              return {
                transform: [
                  { translateX: adjustedX },
                  { translateY: y },
                  { scale: frontScale },
                  { perspective: 1200 },
                  { rotateY: `${(rotation.value + index * 25.7)}deg` },
                  { rotateX: isFront ? '-5deg' : '5deg' },
                ],
                opacity,
                zIndex,
                // 奥のレコードのタッチイベントを無効化
                pointerEvents: adjustedZ > 0 ? 'auto' : 'none',
              };
            });

            return (
              <Animated.View key={record.id} style={[styles.record, animatedStyle]}>
                <TouchableOpacity 
                  activeOpacity={0.3}
                  onPress={() => handleAlbumPress(record.id)}
                  style={styles.touchable}
                >
                  <View style={[styles.recordInner, styles.recordShadow]}>
                    <View style={styles.albumArt} />
                    <View style={styles.albumShadow} />
                  </View>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  carousel: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  record: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    alignItems: 'center',
  },
  recordInner: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6F61',
    overflow: 'hidden',
    borderRadius: 10,
  },
  albumArt: {
    width: ITEM_SIZE * 0.9,
    height: ITEM_SIZE * 0.9,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
  },
  recordTitle: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    opacity: 0.8,
    fontWeight: 'bold',
  },
  recordShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  albumShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_SIZE * 0.1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  touchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
}); 
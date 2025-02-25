import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image, 
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

// サンプルデータを更新
const shortClips = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Cyber Entity',
    duration: '0:30',
    coverImage: 'https://example.com/cover1.jpg',
    plays: '2.5M',
    likes: '156K',
    comments: '2.3K',
    isPlaying: false,
    color: '#00ff9d', // ネオングリーン
  },
  {
    id: '2',
    title: 'Digital Pulse',
    artist: 'Neural Network',
    duration: '0:30',
    coverImage: 'https://example.com/cover1.jpg',
    plays: '1.8M',
    likes: '120K',
    comments: '1.9K',
    isPlaying: false,
    color: '#ff00ff', // ネオンピンク
  },
  {
    id: '3',
    title: 'Synthetic Rain',
    artist: 'Binary Ghost',
    duration: '0:30',
    coverImage: 'https://example.com/cover1.jpg',
    plays: '1.2M',
    likes: '100K',
    comments: '1.5K',
    isPlaying: false,
    color: '#00ffff', // ネオンシアン
  },
  {
    id: '4',
    title: 'Cyber Echo',
    artist: 'Digital Phantom',
    duration: '0:30',
    coverImage: 'https://example.com/cover1.jpg',
    plays: '3.1M',
    likes: '200K',
    comments: '2.8K',
    isPlaying: false,
    color: '#ff3300', // ネオンオレンジ
  },
];

export default function ShortScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollY = new Animated.Value(0);

  const renderShortClip = (clip: any, index: number) => {
    const inputRange = [
      (index - 1) * height,
      index * height,
      (index + 1) * height
    ];

    //スクロール毎の大きさを設定
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1],
      extrapolate: 'clamp'
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp'
    });

    // 背景画像のアニメーションのみに適用
    const backgroundTranslateY = scrollY.interpolate({
      inputRange,
      outputRange: [height * 0.05, 0, -height * 0.05],
      extrapolate: 'clamp'
    });

    // 背景色のアニメーション
    const backgroundColor = index % 2 === 0 
      ? 'rgba(255, 255, 255, 1)' 
      : 'rgba(0, 0, 0, 1)';

    return (
      <View 
        key={clip.id} 
        style={[
          styles.clipContainer,
          { backgroundColor }
        ]}
      >
        <Animated.View 
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateY: backgroundTranslateY }]
            }
          ]}
        >
          <LinearGradient
            colors={[
              index % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0)',
              index % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.8)',
              index % 2 === 0 ? 'rgba(255,255,255,0.1)' : '#0a0a0f'
            ]}
            locations={[0, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
          
          <Image
            source={{ uri: clip.coverImage }}
            style={[
              styles.backgroundImage,
              {
                opacity: 0.5
              }
            ]}
            defaultSource={require('@/assets/images/adaptive-icon.png')}
          />
        </Animated.View>

        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity,
              transform: [{ scale }] // translateYを削除
            }
          ]}
        >
          <View style={styles.infoContainer}>
            <Text style={[styles.title, { color: clip.color }]}>{clip.title}</Text>
            <Text style={styles.artist}>{clip.artist}</Text>
            <View style={[styles.statsContainer, { borderColor: clip.color }]}>
              <View style={styles.statItem}>
                <Ionicons name="play-circle-outline" size={20} color={clip.color} />
                <Text style={[styles.statsText, { color: clip.color }]}>{clip.plays}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={20} color={clip.color} />
                <Text style={[styles.statsText, { color: clip.color }]}>{clip.duration}</Text>
              </View>
            </View>

            <View style={styles.interactionContainer}>
              <TouchableOpacity 
                style={[styles.interactionButton, { borderColor: clip.color }]}
                activeOpacity={0.7}
              >
                <Ionicons name="heart-outline" size={24} color={clip.color} />
                <Text style={[styles.interactionText, { color: clip.color }]}>{clip.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.interactionButton, { borderColor: clip.color }]}
                activeOpacity={0.7}
              >
                <Ionicons name="chatbubble-outline" size={22} color={clip.color} />
                <Text style={[styles.interactionText, { color: clip.color }]}>{clip.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.interactionButton, { borderColor: clip.color }]}
                activeOpacity={0.7}
              >
                <Ionicons name="share-social-outline" size={24} color={clip.color} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  };

  const renderSeparator = () => {
    return (
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <View style={styles.separatorDot} />
        <View style={styles.separatorLine} />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView 
        style={styles.container}
        edges={['right', 'left']}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <PanGestureHandler>
          <Animated.ScrollView
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {shortClips.map((clip, index) => (
              <React.Fragment key={clip.id}>
                {renderShortClip(clip, index)}
                {index < shortClips.length - 1 && renderSeparator()}
              </React.Fragment>
            ))}
          </Animated.ScrollView>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  clipContainer: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    backgroundColor: '#0a0a0f',
  },
  contentContainer: {
    position: 'absolute',
    bottom: height * 0.1,
    width: '100%',
    paddingHorizontal: 20,
    height: 'auto',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'SpaceMono',
    color: '#ffffff',
    letterSpacing: 2,
  },
  artist: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'SpaceMono',
    opacity: 0.8,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsText: {
    fontSize: 16,
    fontFamily: 'SpaceMono',
    color: '#ffffff',
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 3,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    gap: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  interactionText: {
    fontSize: 14,
    fontFamily: 'SpaceMono',
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  separatorContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  separatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

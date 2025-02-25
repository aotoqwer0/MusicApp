import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';

// ジャンルごとの背景グラデーションとネオンカラーの定義を更新
const genreGradients: { [key: string]: { gradient: [string, string], neon: string } } = {
  'Rock': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#FF6B6B'  // ネオンレッド
  },
  'Jazz': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#4ECDC4'  // ネオンターコイズ
  },
  'Pop': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#FFD93D'  // ネオンイエロー
  },
  'Hip-Hop': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#6C5B7B'  // ネオンパープル
  },
  'Electronic': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#45B7D1'  // ネオンブルー
  },
  'Classical': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#FF9A9E'  // ネオンピンク
  },
  'Reggae': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#84FAB0'  // ネオングリーン
  },
  'Blues': {
    gradient: ['#1a1a1a', '#2a2a2a'],
    neon: '#4B79A1'  // ネオンブルー
  }
};

// サンプルデータを拡充
const rankingData = [
  {
    id: 1,
    rank: 1,
    title: "Midnight Dreams",
    artist: "Luna Sky",
    plays: "1.2M",
    image: "https://example.com/album1.jpg",
    change: "+2",
    duration: "3:45"
  },
  {
    id: 2,
    rank: 2,
    title: "Summer Breeze",
    artist: "Ocean Wave",
    plays: "980K",
    image: "https://example.com/album2.jpg",
    change: "-1",
    duration: "4:12"
  },
  {
    id: 3,
    rank: 3,
    title: "City Lights",
    artist: "Urban Beat",
    plays: "875K",
    image: "https://example.com/album3.jpg",
    change: "+4",
    duration: "3:58"
  },
  {
    id: 4,
    rank: 4,
    title: "Neon Nights",
    artist: "Cyber Dreams",
    plays: "750K",
    image: "https://example.com/album4.jpg",
    change: "0",
    duration: "3:30"
  },
  {
    id: 5,
    rank: 5,
    title: "Desert Wind",
    artist: "Sand Storm",
    plays: "620K",
    image: "https://example.com/album5.jpg",
    change: "+1",
    duration: "4:05"
  }
];

// 型定義を追加
interface RankingItem {
  id: number;
  rank: number;
  title: string;
  artist: string;
  plays: string;
  image: string;
  change: string;
  duration: string;
}

export default function GenreRankingScreen() {
  const params = useLocalSearchParams();
  const genreName = params.id as string;
  const scrollY = new Animated.Value(0);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={genreGradients[genreName]?.gradient || ['#1a1a1a', '#2a2a2a']}
        style={[StyleSheet.absoluteFill]}
      />
      
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/ranking')}
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.genreTitle}>{genreName}</Text>
            </View>
            <Text style={styles.subtitle}>Top Charts</Text>
          </View>

          <View style={styles.rankingContainer}>
            {rankingData.map((item: RankingItem, index: number) => {
              const scale = scrollY.interpolate({
                inputRange: [-1, 0, (index * 100), (index * 100) + 1],
                outputRange: [1, 1, 1, 0.98]
              });

              const opacity = scrollY.interpolate({
                inputRange: [-1, 0, (index * 100), (index * 100) + 1],
                outputRange: [1, 1, 1, 0.8]
              });

              return (
                <Animated.View 
                  key={item.id}
                  style={[
                    styles.rankingItem,
                    { 
                      transform: [{ scale }],
                      opacity,
                      borderColor: genreGradients[genreName]?.neon,
                      shadowColor: genreGradients[genreName]?.neon,
                    }
                  ]}
                >
                  <View style={styles.itemGradient}>
                    <View style={[
                      styles.rankNumber,
                      {
                        borderColor: genreGradients[genreName]?.neon,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      }
                    ]}>
                      <Text style={[
                        styles.rankText,
                        {
                          color: genreGradients[genreName]?.neon,
                          textShadowColor: genreGradients[genreName]?.neon,
                        }
                      ]}>
                        #{item.rank}
                      </Text>
                    </View>

                    <Image
                      source={{ uri: item.image }}
                      style={[
                        styles.albumArt,
                        {
                          borderColor: genreGradients[genreName]?.neon,
                        }
                      ]}
                      defaultSource={require('@/assets/images/adaptive-icon.png')}
                    />

                    <View style={styles.songInfo}>
                      <Text style={[
                        styles.songTitle,
                        {
                          textShadowColor: genreGradients[genreName]?.neon,
                        }
                      ]}>
                        {item.title}
                      </Text>
                      <Text style={styles.artistName}>{item.artist}</Text>

                      <View style={styles.statsContainer}>
                        <View style={[
                          styles.stat,
                          {
                            borderColor: genreGradients[genreName]?.neon,
                          }
                        ]}>
                          <Ionicons 
                            name="time-outline" 
                            size={16} 
                            color={genreGradients[genreName]?.neon}
                          />
                          <Text style={[
                            styles.statText,
                            {
                              color: genreGradients[genreName]?.neon,
                            }
                          ]}>
                            {item.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 12,
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  genreTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
    flex: 1,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rankingContainer: {
    padding: 20,
  },
  rankingItem: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 4,
  },
  itemGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
  },
  rankNumber: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    borderWidth: 2,
    marginRight: 12,
  },
  rankText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'SpaceMono',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  albumArt: {
    width: 65,
    height: 65,
    borderRadius: 14,
    marginRight: 14,
    borderWidth: 1,
  },
  songInfo: {
    flex: 1,
    height: 65,
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
    marginBottom: 2,
    letterSpacing: 0.5,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  artistName: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'SpaceMono',
    letterSpacing: 0.3,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: 80,
  },
  statText: {
    marginLeft: 4,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontFamily: 'SpaceMono',
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingBottom: 40, // スクロール時の下部余白
  },
});
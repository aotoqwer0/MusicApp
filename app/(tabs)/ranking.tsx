import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CategorySection from '../../components/rank/CategorySection';
import TopRankingSection from '../../components/rank/TopRankingSection';

const { width } = Dimensions.get('window');
const GENRE_CARD_WIDTH = (width - 60) / 2; // 2列のグリッド用（左右マージン20px + 中央スペース20px）

// ジャンルを8つに更新
const genres = [
  { id: 1, name: 'Rock', color: ['#FF6B6B', '#4ECDC4'] as [string, string] },
  { id: 2, name: 'Jazz', color: ['#A8E6CF', '#DCEDC1'] as [string, string] },
  { id: 3, name: 'Pop', color: ['#FFD93D', '#FF6B6B'] as [string, string] },
  { id: 4, name: 'Hip-Hop', color: ['#95E1D3', '#EAFFD0'] as [string, string] },
  { id: 5, name: 'Electronic', color: ['#6C5B7B', '#C06C84'] as [string, string] },
  { id: 6, name: 'Classical', color: ['#FF9A9E', '#FAD0C4'] as [string, string] },
  { id: 7, name: 'Reggae', color: ['#84FAB0', '#8FD3F4'] as [string, string] },
  { id: 8, name: 'Blues', color: ['#A8CABA', '#5D4157'] as [string, string] },
];

// Top10のランキングデータ
const rankingData = [
  { 
    id: 1, 
    rank: 1,
    title: "Midnight Dreams",
    artist: "Luna Sky",
    plays: "1.2M",
    image: "https://example.com/album1.jpg"
  },
  { 
    id: 2, 
    rank: 2,
    title: "Summer Breeze",
    artist: "Ocean Wave",
    plays: "980K",
    image: "https://example.com/album2.jpg"
  },
  { 
    id: 3, 
    rank: 3,
    title: "City Lights",
    artist: "Urban Beat",
    plays: "875K",
    image: "https://example.com/album3.jpg"
  },
  // ... 4位から10位まで同様に追加 ...
];

export default function RankingScreen() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const scrollY = new Animated.Value(0);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Monthly Ranking</Text>
        </View>

        <CategorySection
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        <TopRankingSection
          rankingData={rankingData}
          scrollY={scrollY}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  mainScroll: {
    flex: 2,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,  // 下の余白を少し増やす
  },
  title: {
    fontSize: 34,  // サイズを大きく
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
    letterSpacing: 1,  // 文字間隔を追加
    textShadowColor: 'rgba(255, 111, 97, 0.5)',  // #FF6F61のシャドウ
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    // グラデーションのような効果を影で表現
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // 下線効果
    borderBottomWidth: 2,
    borderBottomColor: '#FF6F61',
    paddingBottom: 5,
    alignSelf: 'flex-start',  // テキストの幅に合わせる
  },
  genreContainer: {
    padding: 20,
  },
  genreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genreCard: {
    width: GENRE_CARD_WIDTH,
    height: 60, // 高さを少し小さく
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedGenreCard: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  genreGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreText: {
    color: '#ffffff',
    fontSize: 16, // フォントサイズを少し小さく
    fontWeight: '600',
    fontFamily: 'SpaceMono',
  },
  rankingContainer: {
    paddingBottom: 20, // スクロール時の下部余白
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  rankNumber: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    color: '#FF6F61',
    fontSize: 20,
    fontWeight: 'bold',
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  playsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playsText: {
    color: '#FF6F61',
    marginLeft: 5,
    fontSize: 14,
  },
  categoryHeader: {
    paddingHorizontal: 20,
    paddingTop: 5,  // 余白を調整
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
    marginBottom: 15,
  },
  rankingHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
  },
});

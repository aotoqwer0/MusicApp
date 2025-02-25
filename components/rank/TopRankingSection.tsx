import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RankingItem {
  id: number;
  rank: number;
  title: string;
  artist: string;
  plays: string;
  image: string;
}

interface TopRankingSectionProps {
  rankingData: RankingItem[];
  scrollY: Animated.Value;
}

export default function TopRankingSection({ 
  rankingData, 
  scrollY 
}: TopRankingSectionProps) {
  const renderRankingItem = (item: RankingItem, index: number) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, (index * 100), (index * 100) + 1],
      outputRange: [1, 1, 1, 0.95]
    });

    return (
      <Animated.View 
        key={item.id}
        style={[styles.rankingItem, { transform: [{ scale }] }]}
      >
        <View style={styles.rankNumber}>
          <Text style={styles.rankText}>#{item.rank}</Text>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.albumArt}
        />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
        <View style={styles.playsContainer}>
          <Ionicons name="play-circle-outline" size={20} color="#FF6F61" />
          <Text style={styles.playsText}>{item.plays}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <View style={styles.rankingHeader}>
        <Text style={styles.rankingTitle}>All Genres Top 10</Text>
      </View>
      <View style={styles.rankingContainer}>
        {rankingData.map((item, index) => renderRankingItem(item, index))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  rankingContainer: {
    paddingBottom: 20,
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
}); 
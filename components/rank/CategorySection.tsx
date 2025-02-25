import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const GENRE_CARD_WIDTH = (width - 60) / 2;

// ジャンルごとの背景とネオンカラーの定義
const genres = [
  { 
    id: 1, 
    name: 'Rock', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#FF6B6B'  // ネオンレッド
  },
  { 
    id: 2, 
    name: 'Jazz', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#4ECDC4'  // ネオンターコイズ
  },
  { 
    id: 3, 
    name: 'Pop', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#FFD93D'  // ネオンイエロー
  },
  { 
    id: 4, 
    name: 'Hip-Hop', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#6C5B7B'  // ネオンパープル
  },
  { 
    id: 5, 
    name: 'Electronic', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#45B7D1'  // ネオンブルー
  },
  { 
    id: 6, 
    name: 'Classical', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#FF9A9E'  // ネオンピンク
  },
  { 
    id: 7, 
    name: 'Reggae', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#84FAB0'  // ネオングリーン
  },
  { 
    id: 8, 
    name: 'Blues', 
    color: ['#1a1a1a', '#2a2a2a'],
    neonColor: '#4B79A1'  // ネオンブルー
  }
];

export default function CategorySection({ selectedGenre, onSelectGenre }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.genreGrid}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => router.push(`/genre/ranking/${genre.name}`)}
            style={styles.genreCardWrapper}
          >
            <View
              style={[
                styles.genreCard,
                {
                  borderColor: genre.neonColor,
                  shadowColor: genre.neonColor,
                }
              ]}
            >
              <View style={styles.genreContent}>
                <Text style={[
                  styles.genreText,
                  {
                    color: genre.neonColor,
                    textShadowColor: genre.neonColor,
                  }
                ]}>
                  {genre.name}
                </Text>
                <View style={[
                  styles.vinylEffect,
                  { 
                    borderColor: genre.neonColor,
                    shadowColor: genre.neonColor,
                  }
                ]} />
                <View style={[
                  styles.vinylInner,
                  { 
                    borderColor: genre.neonColor,
                    shadowColor: genre.neonColor,
                  }
                ]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreCardWrapper: {
    width: GENRE_CARD_WIDTH,
    marginBottom: 20,
    borderRadius: 12,  // より丸みを減らす
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  genreCard: {
    height: 85,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedGenreCard: {
    transform: [{ scale: 1.02 }],  // スケールを控えめに
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  genreContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SpaceMono',
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  vinylEffect: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.6,
    borderWidth: 2,
  },
  vinylInner: {
    position: 'absolute',
    right: -25,
    top: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.4,
    borderWidth: 1,
  },
}); 
// src/components/GenreGrid.tsx
import React, { FC, useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

type GenreGridProps = {
  genres?: string[];
};

const GenreGrid: FC<GenreGridProps> = ({ genres = [] }) => {
  // デフォルトは8ジャンルの例
  const genreList = genres.length
    ? genres
    : ['Rock', 'Jazz', 'Pop', 'Hip-Hop', 'Electronic', 'Classical', 'Reggae', 'Blues'];

  // 2アイテムずつの配列に変換（横スクロール時、各列が縦2段となる）
  const columns = useMemo(() => {
    const result = [];
    for (let i = 0; i < genreList.length; i += 2) {
      result.push(genreList.slice(i, i + 2));
    }
    return result;
  }, [genreList]);

  const getGenreGradient = (genre: string): [string, string] => {
    const gradients: { [key: string]: [string, string] } = {
      'Rock': ['#D35400', '#E67E22'],      // マットなオレンジ
      'Jazz': ['#5B2C6F', '#6C3483'],      // ディープパープル
      'Pop': ['#C0392B', '#E74C3C'],       // マットなレッド
      'Hip-Hop': ['#2C3E50', '#34495E'],   // ダークブルーグレー
      'Electronic': ['#1ABC9C', '#16A085'], // マットなターコイズ
      'Classical': ['#8E44AD', '#9B59B6'],  // ソフトパープル
      'Reggae': ['#27AE60', '#2ECC71'],    // マットなグリーン
      'Blues': ['#2980B9', '#3498DB'],     // ソフトブルー
    };
    return gradients[genre] || ['#34495E', '#2C3E50'];
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {columns.map((column, colIndex) => (
        <View key={colIndex} style={styles.column}>
          {column.map((genre, index) => (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.8} 
              style={styles.buttonContainer}
              onPress={() => router.push(`/select_music/genre/${genre}`)}
            >
              <LinearGradient
                colors={getGenreGradient(genre)}
                style={styles.genreButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.contentContainer}>
                  <Text 
                    style={styles.genreText}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {genre}
                  </Text>
                  <Text style={styles.subText}>
                    {`${Math.floor(Math.random() * 100) + 50} Playlists`}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  column: {
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 24,
  },
  genreButton: {
    width: width * 0.38,
    height: width * 0.38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRightColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  genreText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 1,
    numberOfLines: 1,
    adjustsFontSizeToFit: true,
    width: '100%',
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 'auto',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
});

export default GenreGrid;

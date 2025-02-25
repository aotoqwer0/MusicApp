// src/components/GenreGrid.tsx
import React, { FC, useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type GenreGridProps = {
  genres?: string[];
};

const GenreGrid: FC<GenreGridProps> = ({ genres = [] }) => {
  // デフォルトは8ジャンルの例
  const genreList = genres.length
    ? genres
    : ['Weekly Mix', 'Daily Mix', 'Chill Mix', 'Energy Mix'];

  // 2アイテムずつの配列に変換（横スクロール時、各列が縦2段となる）
  const columns = useMemo(() => {
    const result = [];
    for (let i = 0; i < genreList.length; i += 1) {
      result.push(genreList.slice(i, i + 1));
    }
    return result;
  }, [genreList]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {columns.map((column, colIndex) => (
        <View key={colIndex} style={styles.column}>
          {column.map((genre, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} style={styles.buttonContainer}>
              <LinearGradient
                colors={getGradientColors(index)}
                style={styles.genreButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.contentContainer}>
                  <Text style={styles.genreText}>{genre}</Text>
                  <Text style={styles.subText}>Based on your listening</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// エレガントなグラデーションの組み合わせを返す関数
const getGradientColors = (index: number) => {
  const gradients = [
    ['#614385', '#516395'], // ロイヤルパープル
    ['#5C258D', '#4389A2'], // パープルブルー
    ['#134E5E', '#71B280'], // エメラルド
    ['#2C3E50', '#3498DB'], // ミッドナイトブルー
  ];
  return gradients[index % gradients.length];
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
  },
  genreButton: {
    width: width * 0.38,
    height: width * 0.38,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 15,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  genreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default GenreGrid;

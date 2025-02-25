import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MusicAlbumArtProps {
  recordId: string;
  onInfoPress: () => void;
}

const MusicAlbumArt: React.FC<MusicAlbumArtProps> = ({ recordId, onInfoPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.albumArtWrapper}>
        {/* ジャケット写真（仮の正方形オブジェクト） */}
        <View style={styles.albumArt} />
        {/* Record名を見栄え良くオーバーレイ表示 */}
        <View style={styles.recordOverlay}>
          <Text style={styles.recordText}>Record {recordId}</Text>
        </View>
        {/* 右上に情報ボタン */}
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.infoButton}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={30} 
            color={isFavorite ? "#ff4081" : "#ffffff"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArtWrapper: {
    width: '90%',
    aspectRatio: 1,
    position: 'relative',
  },
  albumArt: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  recordOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  recordText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default MusicAlbumArt;
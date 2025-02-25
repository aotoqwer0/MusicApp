import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import MusicAlbumArt from '../../../../components/music/MusicAlbumArt';
import MusicToolbar from '../../../../components/music/MusicToolbar';
import MusicContent from '../../../../components/music/MusicContent';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function MusicDetailScreen() {
  const { recordId } = useLocalSearchParams<{ recordId: string }>();

  return (
    <View style={styles.container}>
      {/* ヘッダー部分 */}
      <BlurView intensity={90} tint="dark" style={styles.headerBackground}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={30} color="#ffffff" />
          </TouchableOpacity>
        </SafeAreaView>
      </BlurView>

      {/* メインコンテンツ */}
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.mainContent}>
        <ScrollView style={styles.scrollContent}>
          {/* ジャケ写コンポーネント */}
          <View style={styles.albumContainer}>
            <MusicAlbumArt recordId={recordId} onInfoPress={() => {}} />
          </View>

          {/* スクロール可能なコンテンツ */}
          <View style={styles.scrollableContent}>
            {/* ツールバーコンポーネント */}
            <MusicToolbar />
            
            {/* 歌詞・コメントコンポーネント */}
            <MusicContent />
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
  headerBackground: {
    width: '100%',
    backgroundColor: 'rgba(20, 20, 20, 0.98)',
  },
  headerSafeArea: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 12,
    marginLeft: 8,
  },
  mainContent: {
    marginTop: 30,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  albumContainer: {
    marginTop: 0,
  },
  scrollableContent: {
    marginTop: 0,
    backgroundColor: '#121212',
  },
});
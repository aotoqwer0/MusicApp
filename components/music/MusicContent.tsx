import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MusicContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lyrics' | 'comments' | 'single'>('lyrics');
  // シングル（アルバム内の楽曲）のデモ用リスト
  const tracks = [
    { id: 1, title: "Song A", duration: "3:45", liked: false },
    { id: 2, title: "Song B", duration: "4:20", liked: true },
    { id: 3, title: "Song C", duration: "3:30", liked: false },
    { id: 4, title: "Song D", duration: "5:15", liked: true },
    { id: 5, title: "Song E", duration: "4:10", liked: false },
    { id: 6, title: "Song F", duration: "3:55", liked: false },
  ];
  const [likedTracks, setLikedTracks] = useState<number[]>([2, 4]); // 初期でいくつかLike済

  const toggleLike = (trackId: number) => {
    setLikedTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleShare = (trackId: number) => {
    console.log(`Share track ${trackId}`);
    // シェア機能の実装
  };

  return (
    <View style={styles.container}>
      {/* タブ切替ボタン */}
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'single' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('single')}
        >
          <Text style={styles.tabButtonText}>シングル</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'lyrics' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('lyrics')}
        >
          <Text style={styles.tabButtonText}>歌詞</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'comments' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('comments')}
        >
          <Text style={styles.tabButtonText}>コメント</Text>
        </TouchableOpacity>
      </View>

      {/* タブの内容 */}
      <View style={styles.contentContainer}>
        {activeTab === 'lyrics' && (
          <Text style={styles.contentText}>
            ここに歌詞が表示されます。{"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{"\n\n"}
            // ... 長い歌詞テキスト ...
          </Text>
        )}
        {activeTab === 'comments' && (
          <Text style={styles.contentText}>
            ここにコメントが表示されます。{"\n\n"}
            例: 「素晴らしい曲です！」{"\n"}
            「とても感動しました」{"\n\n"}
            // ... 長いコメントリスト ...
          </Text>
        )}
        {activeTab === 'single' && (
          <View style={styles.trackListContainer}>
            {tracks.map((track) => (
              <View key={track.id} style={styles.trackRow}>
                <TouchableOpacity 
                  style={styles.trackInfo}
                  onPress={() => console.log(`Play track ${track.id}`)}
                >
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackDuration}>{track.duration}</Text>
                </TouchableOpacity>
                <View style={styles.trackActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => toggleLike(track.id)}
                  >
                    <Ionicons 
                      name={likedTracks.includes(track.id) ? "heart" : "heart-outline"} 
                      size={24} 
                      color={likedTracks.includes(track.id) ? "#FF6F61" : "#ffffff"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleShare(track.id)}
                  >
                    <Ionicons name="share-outline" size={24} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6F61',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6F61',
    backgroundColor: 'rgba(255, 111, 97, 0.8)',
    borderRadius: 0,
    marginHorizontal: 0,
    paddingVertical: 15,
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  contentText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
  },
  trackListContainer: {
    marginHorizontal: -20, // contentContainer のパディングを打ち消して画面幅いっぱいに
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  trackInfo: {
    flex: 1,
    marginRight: 15,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    marginBottom: 4,
  },
  trackDuration: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  trackActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default MusicContent; 
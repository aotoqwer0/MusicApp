import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import CircularCarousel from '@/components/music/CircularCarousel';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function GenreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <BlurView intensity={90} tint="dark" style={styles.headerBackground}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.genreLabel}>NOW PLAYING</Text>
              <View style={styles.genreTitleWrapper}>
                <Text style={styles.genreTitle}>{id.toUpperCase()}</Text>
                <View style={styles.glowDot} />
              </View>
            </View>
          </View>
          <View style={styles.headerLine} />
        </SafeAreaView>
      </BlurView>

      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.mainContent}>
        <View style={styles.carouselContainer}>
          <CircularCarousel />
        </View>
      </SafeAreaView>
      
      <TouchableOpacity 
        style={styles.reload} 
        onPress={() => console.log('reload')} 
        activeOpacity={0.7}
      >
        <Ionicons name="sync" size={24} color="#fff" />
      </TouchableOpacity>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  mainContent: {
    flex: 1,
  },
  backButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleContainer: {
    flex: 1,
  },
  genreLabel: {
    fontSize: 11,
    color: '#FF6B6B',
    letterSpacing: 4,
    fontFamily: 'SpaceMono',
    marginBottom: 6,
    fontWeight: '600',
  },
  genreTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'SpaceMono',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  glowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginLeft: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  headerLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  reload: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
}); 
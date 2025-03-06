import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MusicGenres from '../../components/music/MusicGenres';
import Recommendation from '../../components/music/Recommendation';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 111, 97, 0.4)', 'transparent']}
        style={styles.topGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(108, 91, 123, 0.6)']}
        style={styles.bottomGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <SafeAreaView edges={['top','left', 'right']} style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greetingText}>WELCOME BACK</Text>
            <Text style={styles.welcomeText}>Discover Music</Text>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <LinearGradient
                colors={['rgba(255, 111, 97, 0.3)', 'rgba(255, 111, 97, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.headerLine}
              />
            </View>
            <View style={styles.sectionContent}>
              <MusicGenres />
            </View>
          </View>

          {/* <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>FEATURED</Text>
              <LinearGradient
                colors={['rgba(255, 111, 97, 0.3)', 'rgba(255, 111, 97, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.headerLine}
              />
            </View>
            <View style={styles.sectionContent}>
              <Recommendation />
            </View>
          </View> */}
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
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    opacity: 0.8,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 600,
    opacity: 0.85,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 15,
    color: '#FF6F61',
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(255, 111, 97, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  welcomeText: {
    fontSize: 44,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
    lineHeight: 50,
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(255, 111, 97, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  sectionContainer: {
    marginBottom: 40,
  },
  sectionHeader: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#ffffff',
    marginBottom: 12,
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(255, 111, 97, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  headerLine: {
    height: 2,
    borderRadius: 1,
  },
  sectionContent: {
    flex: 1,
  },
});

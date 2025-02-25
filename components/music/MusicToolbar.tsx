import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MusicToolbar: React.FC = () => {

  return (
    <View style={styles.container}>
      <View style={styles.controlButtons}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-circle" size={60} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
  },
  progressBarFill: {
    width: '40%', // 進捗状況に合わせて調整してください
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default MusicToolbar;
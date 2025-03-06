import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerBackground: () => (
              <LinearGradient
                colors={['#FF6F61', '#FFD700']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackVisible: true,
            headerLeft: ({ canGoBack }) => 
              canGoBack ? (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
              ) : null,
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity
                  // onPress={() => router.push('/search')}
                  style={styles.headerButton}
                >
                  <Ionicons name="search" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => router.push('/messages')}
                  style={styles.headerButton}
                >
                  <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            ),
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              title: 'Music',
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -3,
    gap: 7,
  },
  headerButton: {
    padding: 5,
  },
});

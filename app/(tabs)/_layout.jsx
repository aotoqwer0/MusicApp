import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
// Colors の使用は統一した色設定に置き換えのため、一旦コメントアウトまたは削除
import { useColorScheme } from '@/hooks/useColorScheme';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const activeTintColor = '#FFFFFF'; // 選択中は白に変更
  const inactiveTintColor = isDark ? '#AAAAAA' : '#666666';
  const backgroundColor = isDark ? '#121212' : '#FFFFFF';
  const borderTopColor = isDark ? '#2a2a2a' : '#eaeaea';
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#FF6F61', '#FFD700']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: borderTopColor,
          display: route.name === 'short' ? 'none' : 'flex',
        },
        tabBarInactiveTintColor: inactiveTintColor,
        headerLeft: ({ canGoBack }) => 
          canGoBack ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 16}}
            >
              <Icon name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          ) : null,
      })}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="short"
        options={{
          title: 'Short',
          tabBarIcon: ({ color }) => <Icon name="airplane" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <Icon name="trophy" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: 'My Page',
          tabBarIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="select_music/record/[recordId]"
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="select_music/genre/[id]"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="genre/ranking/[id]"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

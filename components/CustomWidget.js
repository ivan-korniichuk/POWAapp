import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Platform } from 'react-native';

const CustomWidget = ({ visible, status }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  const basePosition = 75;
  const finalPosition = Platform.select({
    ios: basePosition + 30,
    android: basePosition + 10,
    web: basePosition + 5,
  });

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: finalPosition,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getStatusIndicator = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="small" color="#fff" style={styles.statusIndicator} />;
      case 'online':
        return <View style={[styles.statusCircle, { backgroundColor: '#34ff61' }]} />;
      case 'offline':
        return <View style={[styles.statusCircle, { backgroundColor: '#f91839' }]} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        {getStatusIndicator()}
        <Text style={styles.message}>{status}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
  },
  container: {
    height: 60,
    backgroundColor: '#02077E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  statusIndicator: {
    marginRight: 10,
  },
  statusCircle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    marginRight: 10,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'JosefinSans_700Bold',
  },
});

export default CustomWidget;

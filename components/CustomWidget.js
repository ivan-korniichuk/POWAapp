import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Platform } from 'react-native';

const CustomWidget = ({ visible, status }) => {
  const translateY = useRef(new Animated.Value(-100)).current; // Use useRef to preserve the Animated.Value

  const basePosition = 75; // Adjust base position
  const finalPosition = Platform.select({
    ios: basePosition + 30,
    android: basePosition + 10,
    web: basePosition + 5,
  });

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: finalPosition, // Move to final position based on platform
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -100, // Retract above the header
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
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      {getStatusIndicator()}
      <Text style={styles.message}>{status}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 60,
    top: 0, // Ensures the widget starts at the top
    backgroundColor: '#02077E', // Blue background
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded borders
    zIndex: 1000,
    alignSelf: 'center', // Center horizontally
  },
  statusIndicator: {
    marginRight: 10, // Adds space between the indicator and the text
  },
  statusCircle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    marginRight: 10,
  },
  message: {
    color: '#fff', // White text color
    fontSize: 16,
    fontFamily: 'JosefinSans_700Bold',
  },
});

export default CustomWidget;

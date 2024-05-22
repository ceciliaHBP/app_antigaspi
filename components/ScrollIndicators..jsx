import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScrollIndicators = ({ dataLength, activeIndex }) => (
  <View style={styles.indicatorContainer}>
    {Array.from({ length: dataLength }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.indicator,
          i === activeIndex ? styles.activeIndicator : null,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 3,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
});

export default ScrollIndicators;

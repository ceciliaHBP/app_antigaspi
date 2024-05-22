import React from 'react'
import Svg, { Path, Rect} from 'react-native-svg';
import { colors } from '../styles/styles';

const Remove = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
        <Path fill={colors.color1} d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.499.499 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.499.499 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.499.499 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.499.499 0 0 0 0-.707z"/>
    </Svg>
    
  )
}

export default Remove
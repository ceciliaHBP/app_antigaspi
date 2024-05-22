import Svg, { Path } from 'react-native-svg';
import React from 'react'
import { colors } from '../styles/styles';

const Avatar = ({ fill }) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M10.5348 10C13.2962 10 15.5348 7.76142 15.5348 5C15.5348 2.23858 13.2962 0 10.5348 0C7.77337 0 5.53479 2.23858 5.53479 5C5.53479 7.76142 7.77337 10 10.5348 10Z" fill={colors.color6}/>
        <Path d="M20.5348 19.375C20.5348 22.4813 20.5348 25 10.5348 25C0.53479 25 0.53479 22.4813 0.53479 19.375C0.53479 16.2687 5.01229 13.75 10.5348 13.75C16.0573 13.75 20.5348 16.2687 20.5348 19.375Z" fill={colors.color6}/>
    </Svg>
  )
}

export default Avatar



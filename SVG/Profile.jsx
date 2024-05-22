import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';


const Profile = ({color}) => {
  return (
    <Svg width="31" height="35" viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M15.5349 15C18.2963 15 20.5349 12.7614 20.5349 10C20.5349 7.23858 18.2963 5 15.5349 5C12.7735 5 10.5349 7.23858 10.5349 10C10.5349 12.7614 12.7735 15 15.5349 15Z" fill={color}/>
    <Path d="M25.5349 24.375C25.5349 27.4813 25.5349 30 15.5349 30C5.53491 30 5.53491 27.4813 5.53491 24.375C5.53491 21.2687 10.0124 18.75 15.5349 18.75C21.0574 18.75 25.5349 21.2687 25.5349 24.375Z" fill={color}/>
    </Svg>
  )
}

export default Profile
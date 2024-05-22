import React from 'react'
import Svg, { Path } from 'react-native-svg';
import {colors} from '../styles/styles'

const InfoProduct = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <Path fill={colors.color3} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </Svg>
  )
}

export default InfoProduct



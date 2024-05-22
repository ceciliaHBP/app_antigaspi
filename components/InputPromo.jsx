import { View, Text } from 'react-native'
import React from 'react'

const InputPromo = () => {
  return (
    <View>
        <Text>Code Promo</Text>
    </View>
    /* <View
                  style={{
                    width: '100%',
                    marginVertical: 15,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      justifyContent: 'center',
                      marginVertical: 10,
                    }}>
                    <TextInput
                      value={promoCode}
                      onChangeText={value => setPromoCode(value)}
                      placeholder="Code promo"
                      style={{
                        width: 150,
                        borderWidth: 1,
                        borderColor: colors.color3,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5,
                        color: colors.color1,
                        fontWeight: 'bold',
                        fontSize: 14,
                        textAlignVertical: 'center',
                        backgroundColor: colors.color6,
                      }}
                    />
                    <TouchableOpacity
                      onPress={handleApplyDiscount}
                      disabled={isCartEmpty}>
                      <ApplyCode
                        color={isCartEmpty ? colors.color3 : colors.color9}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleRemoveDiscount}
                      disabled={isCartEmpty}>
                      <DeleteCode
                        color={isCartEmpty ? colors.color3 : colors.color5}
                      />
                    </TouchableOpacity>
                  </View>
                  {appliedPromo && !isCartEmpty && (
                    <Text style={{color: colors.color2, fontSize: 12}}>
                      Réduction de{' '}
                      {appliedPromo.type === 'percentage'
                        ? `${appliedPromo.value}%`
                        : `${appliedPromo.value}€`}{' '}
                      sur votre panier
                    </Text>
                  )}
                  <View>
                    {erreurCodePromo && promoCode && (
                      <Text style={{color: colors.color8}}>
                        Code promo non valide !
                      </Text>
                    )}
                    {erreurCodePromoUsed && promoCode && (
                      <Text style={{color: colors.color8}}>
                        Code promo déja utilisé !{' '}
                      </Text>
                    )}
                  </View>
                </View> */
  )
}

export default InputPromo
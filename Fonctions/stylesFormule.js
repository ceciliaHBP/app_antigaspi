import { fonts, colors} from '../styles/styles'


export const getStyle = (selectedItem, product) => {
    return [
        { width: 180, marginHorizontal: 15 },
        selectedItem?.productId === product.productId ? {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'white',
            ...Platform.select({
                android: {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    elevation: 10
                },
                ios: {
                    shadowColor: colors.color1,
                    shadowOpacity: 0.3,
                    shadowOffset: {
                        width: 5,
                        height: 4,
                    },
                }
            })
        } : {}
    ];
}

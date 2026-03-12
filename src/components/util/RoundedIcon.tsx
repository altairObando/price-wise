import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper'

export interface RoundedIconProps {
    source: string
    color?: string
    size?: number
}
export const RoundedIcon =({ source, color, size} : RoundedIconProps)=>{
    const backgroundColor = color || '#663399',
          opacityColor = `${backgroundColor}20`,
          iconSize = size || 24;
    return <View style={[ style.container, { backgroundColor: opacityColor, borderRadius: iconSize / 2}]}>
        <Icon source={source} color={backgroundColor} size={iconSize} />
    </View>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 8,
    }
})
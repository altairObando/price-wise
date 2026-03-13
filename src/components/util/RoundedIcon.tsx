import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-paper'

export interface RoundedIconProps {
    source: string
    color?: string
    size?: number
    onPress?: ()=>void
}
export const RoundedIcon =({ source, color, size, onPress } : RoundedIconProps)=>{
    const backgroundColor = color || '#663399',
          opacityColor = `${backgroundColor}20`,
          iconSize = size || 24;
    const onIconPress = ()=> {
        if( typeof onPress === 'function') onPress()
    }
    return <TouchableOpacity style={[ style.container, { backgroundColor: opacityColor, borderRadius: iconSize / 2 }]} onPress={onIconPress} >
        <Icon source={source} color={backgroundColor} size={iconSize} />
    </TouchableOpacity>
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 8,
    }
})
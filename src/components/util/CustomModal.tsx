import React, { useEffect } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { RoundedIcon } from './RoundedIcon';

interface CustomModalProps extends React.PropsWithChildren {
    isOpen: boolean,
    onClose: ()=>void,
    title: string
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = 300; 
const MAX_HEIGHT = SCREEN_HEIGHT - 50;

export const CustomModal:React.FC<CustomModalProps> =({ isOpen, onClose, title, children }) =>{
    const height = useSharedValue(MIN_HEIGHT);
    const isFullHeight = useSharedValue(false);

    const toggleHeight = () => {
        const targetHeight = isFullHeight.value ? MIN_HEIGHT : MAX_HEIGHT;

        height.value = withTiming(targetHeight, {
            duration: 300, // Duración en milisegundos
            easing: Easing.out(Easing.exp), // Esto hace que empiece rápido y termine suave
        });

        isFullHeight.value = !isFullHeight.value;
    };

    const animatedSurfaceStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    useEffect(() => {
        if (!isOpen) {
            height.value = MIN_HEIGHT;
            isFullHeight.value = false;
        }
    }, [isOpen]);



    return <Modal visible={ isOpen } onRequestClose={ onClose } transparent={true}>
        <View style={ styles.container }>
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            <Animated.View style={[styles.animatedWrapper, animatedSurfaceStyle]}>
                <Surface style={[ styles.content ]} elevation={2}>
                <Pressable onPress={toggleHeight} style={styles.draggableArea}>
                    <View style={styles.draggableItem} />
                </Pressable>
                <View style={ styles.titleContainer }>
                    <Text variant='titleMedium'>{ title }</Text>
                    <RoundedIcon source='close' onPress={onClose} />
                </View>
                <Divider />
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </Surface>
            </Animated.View>
        </View>        
    </Modal>
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  animatedWrapper: {
    width: '100%',
  },
  content: { 
    flex: 1, // El Surface ocupa todo el alto que le de el Animated.View
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    paddingHorizontal: 20,
    overflow: 'hidden'
  },
  draggableArea: {
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  draggableItem: { 
    width: 50, 
    height: 5, 
    backgroundColor: 'gray', 
    borderRadius: 5 
  },
  titleContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10
  },
  divider: {
    marginBottom: 10
  },
  childrenContainer: {
    flex: 1, // Para que el contenido interno pueda hacer scroll si es necesario
  }
});
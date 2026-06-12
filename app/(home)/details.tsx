import { useAppContext } from '@/src/hooks/AppContext';
import { View } from 'react-native';
import { Button, Card, Icon, Surface, Text } from 'react-native-paper';

export default function ProductDetails(){
    const { product } = useAppContext();
    if( !product ){
        return <Surface style={{ flex: 1, padding: 10, gap: 8, alignItems:'center', justifyContent:'center' }}>
            <Surface style={{ borderRadius: 30, padding: 8, backgroundColor:'#2b5ada20'}} elevation={3}>
                <Icon source='cloud-alert' size={120} color='#2b5ada'/>
            </Surface>
            <Text variant='headlineMedium' style={{ fontWeight:'bold'}}> Producto no encontrado</Text>
            <Button mode='contained-tonal' icon='reload'>
                Intentar Nuevamente
            </Button>
        </Surface>
    }
    return <Surface style={{ flex: 1, padding: 10 }}>
        <Card>
            <Card.Cover 
                source={ product.image_url ? { uri: product.image_url } : require('@/assets/images/react-logo.png') } 
                resizeMode='cover'/>
            <Card.Content style={{ gap: 10,padding: 10 }}>
                <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>
                    { product.name }
                </Text>
                <Text variant='bodyMedium'>
                    { product.description ?? 'Descripciòn no disponible'}
                </Text>
            </Card.Content>
        </Card>
        <View style={{ flexDirection:'row', alignItems:'center', padding: 10, gap: 5}}>
            <Icon source='tag' size={30} color='#3a57ca' />
            <Text style={{ fontWeight: 'bold' }}>Compare precios</Text>
        </View>
    </Surface>
}
import { Product } from '@/src/lib/dto/Product';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text, useTheme } from 'react-native-paper';

interface ProductCardProps {
  item: Product;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  const theme = useTheme();
  return (
    <Card contentStyle={ styles.cardContainer } style={{ backgroundColor: theme.colors.background }}>
      <Image 
        source={item.image_url}
        placeholder={require('@/assets/images/react-logo.png') }
        contentFit='cover'
        transition={500}
        cachePolicy={'disk'}
        style={ styles.image }/>
      
      <View style={ styles.columnContainer }>
        <View style={ styles.innerRow }>
          <Button 
            compact 
            mode='text' 
            style={{ backgroundColor: `${theme.colors.primary}20` }}>
            {item.market_code}
          </Button>
          <Icon source='heart-outline' color={theme.colors.primary } size={24} />
        </View>
        <Text variant='titleMedium' numberOfLines={2}>{item.name}</Text>
        
        {!!item.description && <Text variant="bodySmall" numberOfLines={1}>{item.description}</Text>}

        <View style={ styles.priceContainer }>
          <Text style={{ color: theme.colors.primary }} variant='headlineLarge'>C$ {item.price}</Text>
          {!!item.old_price && (
            <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}> Antes: C$ {item.old_price}</Text>
          )}
        </View>

        <Button mode='contained-tonal' icon='compare-horizontal'>
          Detalles
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    cardContainer: { flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center' },
    image: { width: 120, height: 120, resizeMode: 'contain', borderRadius: 15 },
    columnContainer: { flex: 1, gap: 5, padding: 5 },
    innerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    priceContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' }
})
export default ProductCard;
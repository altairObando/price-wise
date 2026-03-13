import { Product } from '@/src/lib/dto/Product';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text, useTheme } from 'react-native-paper';

interface ProductCardProps {
  item: Product;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  const theme = useTheme();
  const imageSource = item.image_url ? { uri: item.image_url } : require('@/assets/images/react-logo.png') 
  return (
    <Card contentStyle={ styles.cardContainer }>
      <Image source={imageSource}  style={ styles.image }/>
      
      <View style={ styles.columnContainer }>
        <View style={ styles.innerRow }>
          <Button 
            compact 
            mode="text" 
            style={{ backgroundColor: `${theme.colors.primary}20` }}
          >
            {item.market_code}
          </Button>
          <Icon source='heart-outline' color='#e15c8f' size={24} />
        </View>
        <Text variant='titleMedium' numberOfLines={2}>{item.name}</Text>
        
        {!!item.description && <Text variant="bodySmall" numberOfLines={1}>{item.description}</Text>}

        <View style={ styles.priceContainer }>
          <Text style={{ color: theme.colors.primary }} variant='titleLarge'>C$ {item.price}</Text>
          {!!item.old_price && (
            <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>C$ {item.old_price}</Text>
          )}
        </View>

        <Button mode='contained' icon='compare-horizontal'>
          Detalles
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    cardContainer: { flexDirection: 'row', gap: 8, padding: 8, alignItems: 'center' },
    image: { width: 120, height: 120, resizeMode: 'cover', borderRadius: 15 },
    columnContainer: { flex: 1, gap: 5, padding: 5 },
    innerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    priceContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' }
})
export default ProductCard;
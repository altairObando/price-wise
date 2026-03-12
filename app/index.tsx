import { RoundedIcon } from '@/src/components/util/RoundedIcon';
import { AppContext } from '@/src/hooks/AppContext';
import { Product, StoreProduct } from '@/src/lib/dto/Product';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Card, Icon, Searchbar, Surface, Text, useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  const { searchProduct, loading, getRecomendations } = useContext(AppContext);
  const [ stores, setStores  ] = useState<string[]>([]);
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ searchText, setSearchText ] = useState('');
  const onSearchSubmit = ()=>{
    searchProduct(searchText).then( response => console.log(response))
  }
  useEffect(()=>{
    getRecomendations().then( (response: StoreProduct[])  => {
      const store_names = response.map<string>((item : StoreProduct) => item.store_name),
            product_items = response.flatMap( store => store.products);
      setStores(store_names);
      setProducts(product_items);
    })
  },[])
  return <Surface
      style={{flex: 1, padding: 8, gap: 10 }}>
        <View style={{ display: 'flex', flexDirection:'row', gap: 8, alignItems:'center' }}>
          <Searchbar style={{ flex: 1 }}placeholder='Search products' value={ searchText } onChangeText={ setSearchText } onSubmitEditing={onSearchSubmit} />
          <TouchableOpacity>
            <RoundedIcon source='tune-variant' />
          </TouchableOpacity>
        </View>
        <Text variant='headlineMedium' > Ofertas </Text>
        { loading && <ActivityIndicator /> }
        
        <FlatList
          data={ products }
          key='product-offers'
          keyExtractor={ (item : Product, index) => `${index} - ${item.url} - ${ item.market_code}` }
          ItemSeparatorComponent={ ()=> <View style={{ paddingHorizontal: 10, height: 12, borderColor: 'red' }} />}
          renderItem={({ item }) => <Card contentStyle={{ display:'flex', flexDirection:'row', gap: 8}}>
            <Image source={{ uri: item.image_url }} style={{ width: 120, height: 120, resizeMode: 'cover' }} />
            <View style={{ display: 'flex',flexDirection: 'column', flex: 1, gap: 5, padding: 5 }}>
              <View style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Button style={{ backgroundColor:`${theme.colors.primary}20`}}>{item.market_code}</Button>
                <Icon source='heart' size={24} />
              </View>
              <Text variant='titleMedium'>{ item.name }</Text>
              <Text> Product Description</Text>
            </View>
          </Card>
          }
          />
    </Surface>
}

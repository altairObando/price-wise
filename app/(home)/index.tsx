import { ProductCard } from '@/src/components/Home/ProductCard';
import { SearchBarHeader } from '@/src/components/Home/SearchBarHeader';
import { AppContext, Store } from '@/src/hooks/AppContext';
import { Product, StoreProduct } from '@/src/lib/dto/Product';
import { normalizeText } from '@/src/lib/misc';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';

export default function Index() {
  const router = useRouter();
  const { loading, getRecomendations, setStores, setProduct } = useContext(AppContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getRecomendations().then((response: StoreProduct[]) => {
      const store_names = response.map<Store>(item => ({ code: item.store_name, name: normalizeText(item.store_name), enabled: true}));
      const product_items = response.flatMap(store => store.products);
      
      setStores(store_names);
      setProducts(product_items.map(item => ({
        ...item, 
        market_code: normalizeText(item.market_code ?? '')
      })));
    });
  }, []);
  const onSearchProduct=()=>{
    if(!searchText) return;
    router.push({ pathname: '/(home)/search', params: { search: searchText }})
  }
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => (a.discount ?? '') > (b.discount ?? '') ? -1 : 1);
  }, [products]);

  const onProductPress = ( product: Product )=>{
    setProduct(product);
    router.push({ pathname: '/(home)/details', params: { offer: '1' }})
  }

  return (
    <Surface style={{ flex: 1, padding: 8, gap: 10 }}>
      <SearchBarHeader 
        value={searchText}
        onChange={setSearchText}
        onSubmit={() => onSearchProduct()}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      <Text variant='headlineMedium'>Ofertas</Text>
      
      {loading && <ActivityIndicator animating={true} style={{ marginVertical: 10 }} />}
      
      <FlatList
        data={sortedProducts}
        keyExtractor={(item, index) => `${index}-${item.market_code}-${item.url}`}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ProductCard item={item} onPress={ onProductPress } />}
      />
    </Surface>
  );
}
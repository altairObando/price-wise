import { ProductCard } from '@/src/components/Home/ProductCard';
import { SearchBarHeader } from '@/src/components/Home/SearchBarHeader';
import { AppContext } from '@/src/hooks/AppContext';
import { Product, StoreProduct } from '@/src/lib/dto/Product';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';

export default function Index() {
  const { searchProduct, loading, getRecomendations, stores, setStores } = useContext(AppContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getRecomendations().then((response: StoreProduct[]) => {
      const store_names = response.map(item => normalizeText(item.store_name));
      const product_items = response.flatMap(store => store.products);
      
      setStores(store_names);
      setProducts(product_items.map(item => ({
        ...item, 
        market_code: normalizeText(item.market_code ?? '')
      })));
    });
  }, []);
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => (a.discount ?? '') > (b.discount ?? '') ? -1 : 1);
  }, [products]);

  return (
    <Surface style={{ flex: 1, padding: 8, gap: 10 }}>
      <SearchBarHeader 
        value={searchText}
        onChange={setSearchText}
        onSubmit={() => searchProduct(searchText)}
        stores={stores}
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
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </Surface>
  );
}

function normalizeText(name: string) {
  if (!name?.trim()) return '';
  let baseName = name.replace(/_/g, ' ');
  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}
import { ProductCard } from '@/src/components/Home/ProductCard';
import { AppContext, Store } from '@/src/hooks/AppContext';
import { Product } from '@/src/lib/dto/Product';
import { normalizeText } from '@/src/lib/misc';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, SegmentedButtons, Surface, Text } from 'react-native-paper';

export default function SearchView(){
    const params = useLocalSearchParams();
    const { searchProduct, searchInAllStores, loading, stores, setLoading, setStores } = useContext(AppContext);
    const enabledStores = stores.filter( item => item.enabled)
    const [ products, setProducts ] = useState<Product[]>([]);
    
    const [ filters, setFilters ] = useState<string[]>([]);
    
    const processedProducts = useMemo(() => {
        let result = [...products];
        if (filters.length > 0) {
            result = result.filter(p => filters.map(item => normalizeText(item)).includes(p.market_code ?? ''));
        }
        return result;

    }, [ products, filters ]);
    useEffect(()=>{
        if(!params || !params.search) return;
        async function searchProducts(){
            try {
                setLoading(true);
                const productName = params.search as string;
                if(stores.length === 0 ){
                    const response = await searchInAllStores(productName);
                    const stores = response.map<Store>(item => ({ code: item.store_name, name: normalizeText(item.store_name), enabled: true }));
                    const product_items = response.flatMap(store => store.products);                    
                    setStores(stores);
                    setProducts(product_items.map(item => ({...item, market_code: normalizeText(item.market_code ?? '')})));
                } else{
                    await Promise.all(
                        stores.filter( item => item.enabled).map(store => 
                            searchProduct(productName, store.code)
                            .then(response => {
                                setProducts(prev => [...prev, ...response.map(item => ({...item, market_code: store.name }))])
                            })));
                }
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false);
            }
        }
        searchProducts();
    },[ params.search ])
    useEffect(()=>{
        if(enabledStores.length === 0) return;
        setFilters(enabledStores.map(item => item.code))
    },[ stores ]);
    if( loading )
        return <ActivityIndicator />
    return <Surface style={{ display: 'flex', flex: 1, padding: 8, gap: 8 }}>
        <Text variant='headlineLarge'>Resultados: { params.search as string }</Text>
        {
            enabledStores.length > 1 ? <SegmentedButtons
            value={ filters }
            onValueChange={ setFilters }
            multiSelect
            buttons={[ ...enabledStores.map(item => ({ value: item.code, label: item.name, showSelectedCheck: true })) ]} /> : null
        }
        <FlatList
            data={ processedProducts }
            keyExtractor={(item, index) => `${index}-${item.market_code}-${item.url}`}
            contentContainerStyle={{ paddingBottom: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => <ProductCard item={item} />}
        />

    </Surface>
}
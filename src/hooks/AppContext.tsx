import { AxiosError } from 'axios';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { Product, StoreProduct } from '../lib/dto/Product';
import StoreService from '../lib/StoreService';

export interface AppContextProps {
    stores: string[],
    setStores: React.Dispatch<React.SetStateAction<string[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getRecomendations: () => Promise<StoreProduct[]>
    searchProduct: (name: string, store_name?:string) => Promise<Product[]  | StoreProduct[]>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const AppContextProvider:React.FunctionComponent<PropsWithChildren>=({ children })=>{
    const [ stores, setStores ] = useState<string[]>([]);
    const [ loading, setLoading]=useState<boolean>(false)
    async function getRecomendations(): Promise<StoreProduct[]>{
        try {
            setLoading(true)
            const uri = 'all_recomendations/';
            return await StoreService.getInstance().getData(uri);
        } catch (error) {
            if( error instanceof AxiosError){
                console.log(error.cause)
            }
            return []
        } finally {
            setLoading(false)
        }
    }
    async function searchProduct(name: string, store_name?:string): Promise<Product[] | StoreProduct[]>{
        try {
            setLoading(true)
            const uri = store_name && store_name != null ? `search/${store_name.trim()}?q=${ name.trim() }`: `search_all_supermarkets?query=${ name.trim() }`;
            return await StoreService.getInstance().getData(uri);
        } catch (error) {
            console.log(error);
            return []
        }finally{
            setLoading(false)
        }
    }
    const contextValue = {
        stores, setStores,
        loading, setLoading,
        getRecomendations, searchProduct
    }
    return <AppContext.Provider value={contextValue}>
        { children }
    </AppContext.Provider>
}



import { AxiosError } from 'axios';
import React, { createContext, PropsWithChildren, useState } from 'react';
import { Product, StoreProduct } from '../lib/dto/Product';
import StoreService from '../lib/StoreService';

export interface Store {
    code: string;
    name: string;
    enabled: boolean
}
export interface AppContextProps {
    stores: Store[],
    setStores: React.Dispatch<React.SetStateAction<Store[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getRecomendations: () => Promise<StoreProduct[]>
    searchProduct: (name: string, store_name:string) => Promise<Product[]>
    searchInAllStores(name: string): Promise<StoreProduct[]>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const AppContextProvider:React.FunctionComponent<PropsWithChildren>=({ children })=>{
    const [ stores, setStores ] = useState<Store[]>([]);
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
    async function searchProduct(name: string, store_name:string): Promise<Product[]>{
        try {
            const uri = `search/${store_name.trim()}?q=${ name.trim() }`;
            return await StoreService.getInstance().getData(uri);
        } catch (error) {
            console.log(error);
            return []
        }
    }
    async function searchInAllStores(name: string): Promise<StoreProduct[]>{
        try{
            const response = await StoreService.getInstance().getData(`search_all_supermarkets?query=${ name }`);
            return response;
        } catch (error) {
            console.log(error);
            return []
        }
    }
    const contextValue = {
        stores, setStores,
        loading, setLoading,
        getRecomendations, searchProduct, searchInAllStores
    }
    return <AppContext.Provider value={contextValue}>
        { children }
    </AppContext.Provider>
}



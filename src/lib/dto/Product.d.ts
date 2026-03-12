export interface Product {
    name:        string;
    price:       number;
    old_price?:   number;
    discount?:    string;
    url:         string;
    image_url?:   string;
    image_alt?:   string;
    market_code?: string;
    description?: string;
}

export interface StoreProduct {
    store_name: string,
    products: Product[]
}
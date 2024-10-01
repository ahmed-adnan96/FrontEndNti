export interface ProductInr {
    _id: string
    name: string
    description: string
    image: Image[]
    price: number
    quantity: number
    reviews: any[]
    numReviews: number
    Subcategory: Subcategory
    averageRating:number;
    slug:string;
}
export interface Image {
    _id: string
    name: string
    path: string
}

export interface Subcategory {
    _id: string
    name: string
    image: string
    category: string
}

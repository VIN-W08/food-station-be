export interface IFoodResource {
    _id: string
    name: string
    description: string | null
    image: string | null
    price: number
    foodCategories: IFoodCategoryResource[]
    created_at: Date
    updated_at: Date
}

export interface IFoodCategoryResource {
    _id: string,
    key: string,
    label: string
}
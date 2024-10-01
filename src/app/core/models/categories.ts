export interface Categories {
    _id: string
    name: string
    description: string
    image: Image[]
    deleted: boolean
    createdBy: string
    createdAt: string
    updatedAt: string
    slug: string
    __v: number
}
export interface Image {
    _id: string
    name: string
    path: string
    __v: number
  } 
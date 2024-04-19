export interface result<T> {
    code: number
    msg: string
    data: T
}

export interface page<T>{
    records: T[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: string
    maxLimit: number
    searchCount: boolean
    pages: number
}
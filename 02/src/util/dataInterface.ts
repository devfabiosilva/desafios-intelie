export interface DATA_COORDINATE  {
    x: number,
    y: number
}

export interface GRAPHIC_DATA {
    id: string|number,
    color: string,
    data: DATA_COORDINATE[]
}

export interface GRAPHIC_DATA_ERROR {
    error: number,
    reason: string
}
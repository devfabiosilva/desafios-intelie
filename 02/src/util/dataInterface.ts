export interface DATA_COORDINATE  {
    x: string,
    y: number
}

export interface GRAPHIC_DATA {
    id: string|number,
    color: string,
    os: string,
    browser: string,
    select: string,
    data: DATA_COORDINATE[]
}

export interface GRAPHIC_DATA_ERROR {
    error: number,
    reason: string
}
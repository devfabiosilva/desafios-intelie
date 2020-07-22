/**
 * x and y coordinate in graphic
 */
export interface DATA_COORDINATE  {
    x: string,
    y: number
}

/**
 * Data structure returned on successfull convertion from codemirror text
 */
export interface GRAPHIC_DATA {
    id: string|number,
    os: string,
    browser: string,
    select: string,
    data: DATA_COORDINATE[]
}

/**
 * Data structure error when parsing data from text
 */
export interface GRAPHIC_DATA_ERROR {
    error: number,
    reason: string
}

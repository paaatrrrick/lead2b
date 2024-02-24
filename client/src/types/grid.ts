export interface Grid {
    headers: string[];
    items: GridItem[];
} 

export interface GridItem {
    value: string;
    r: number;
    c: string;
}
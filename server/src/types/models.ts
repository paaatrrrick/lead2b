export interface UserType {
    email: string,
    dateCreate: Date,
    name: string,
    profilePicture?: string,
    firebaseUID: string,
    sheetIDs: string[],
    _id: string,
}

interface GridItem {
    value: string,
    r: number,
    c: string,
}

export interface SheetType {
    sheetName: string,
    rows: number,
    prompt: string,
    columns: string[],
    gridItems: GridItem[],
}
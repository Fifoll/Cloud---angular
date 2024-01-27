export interface DialogData {
    heading?: string,
    body?: string,
    button?: ("login" | "close" | "confirm")[],
    editName?: string,
    addFile?: boolean
}

import { Booking } from "./bookings.d";
import { Guest } from "./guests.d";
import { Cabin } from './cabins.d';
import { ReactNode } from "react";

export type TableRow = {
    cells: ReactNode[]
}

export interface TableContextInterface {
    isLoading: boolean,
    headers: string[],
    rows: TableRow[],
    setHeaders: React.Dispatch<SetStateAction<string[]>> | null,
    setRows: React.Dispatch<SetStateAction<TableRow[]>> | null,
}

export interface TableFooterInterface {
    rows: Cabin[] | Guest[] | Booking[]
    pages: TableRow[][], currPage: number
}

export type TableComponent = React.FC<{ children: ReactNode, isLoading: boolean }> & {
    Head: React.FC<{ headers: string[] }>,
    Body: React.FC<{ renderRows:()=>JSX.Element }>,
    Footer: React.FC<TableFooterInterface>
}

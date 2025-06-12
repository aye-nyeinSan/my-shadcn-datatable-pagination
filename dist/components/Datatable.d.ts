import { ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    noCase?: string;
    itemsPerPage?: number;
}
export declare function DataTable<TData, TValue>({ columns, data, noCase, itemsPerPage, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};

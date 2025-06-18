import { ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    noCase?: string;
    itemsPerPage?: number;
    tableContainerClassName?: string;
    tableHeadClassName?: string;
    tableRowClassName?: string;
    tableCellClassName?: string;
    paginationWrapperClassName?: string;
    paginationButtonClassName?: string;
    paginationLinkActiveClassName?: string;
    paginationLinkInactiveClassName?: string;
}
export declare function DataTable<TData, TValue>({ columns, data, noCase, itemsPerPage, // Default items per page
tableContainerClassName, tableHeadClassName, tableRowClassName, tableCellClassName, paginationWrapperClassName, paginationButtonClassName, paginationLinkActiveClassName, paginationLinkInactiveClassName, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};

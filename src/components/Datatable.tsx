import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table.js"; 
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination.js"; 
import { useState, useMemo } from "react";
import { cn } from "../lib/utils.js";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noCase?: string; // Optional prop for no data case
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


export function DataTable<TData, TValue>({
  columns,
  data,
  noCase = "No data available",
  itemsPerPage = 3, // Default items per page
  tableContainerClassName,
  tableHeadClassName,
  tableRowClassName,
  tableCellClassName,
  paginationWrapperClassName,
  paginationButtonClassName,
  paginationLinkActiveClassName,
  paginationLinkInactiveClassName,
}: DataTableProps<TData, TValue>) {
  //Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //Slice the data for pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage; // 0
    return data.slice(startIndex, startIndex + itemsPerPage); //(0,3)=> [0,1,2]
  }, [data, currentPage, itemsPerPage]);

  //Table Setup
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //Function for changing page number
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else setCurrentPage(1);
  };

  //function to display page numbers
  const displayPage = () => {
    let pages = [];
    const maxPage = 3;
    if (totalPages <= maxPage) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i); //1,2,3
      }
      return pages;
    } else {
      const startPage = Math.max(1, currentPage - 1); //1
      const endPage = Math.min(totalPages, startPage + maxPage - 1); //3
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  };

  return (
    <div>
      <div className={cn("rounded-md border", tableContainerClassName)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-center w-[200px]",
                        tableHeadClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-b hover:bg-muted/50 data-[state=selected]:bg-muted",
                      tableRowClassName
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn("p-4", tableCellClassName)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24 text-center", tableCellClassName)}
                >
                  <span dangerouslySetInnerHTML={{ __html: noCase }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        className={cn("mt-5 flex justify-end mb-3", paginationWrapperClassName)}
      >
        <PaginationContent className="flex">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
              className={cn(
                "mr-2 px-3 py-1",
                currentPage === 1 , "pointer-events-none opacity-50" ,
                paginationButtonClassName
              )}
            />
          </PaginationItem>
          {displayPage().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => {
                  handlePageChange(page);
                }}
                className={cn(
                  currentPage === page ? paginationLinkActiveClassName || "bg-teal-600 text-white" :  paginationLinkInactiveClassName,
                 
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* Show ellipsis if there are more pages */}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
              className={cn(
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "", paginationButtonClassName
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

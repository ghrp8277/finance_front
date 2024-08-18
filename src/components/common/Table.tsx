import React from "react";

type TableProps<T> = {
  columns: {
    key: keyof T;
    header: string;
    hideHeader?: boolean;
    hideCell?: boolean;
  }[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  onCellClick?: (row: T, key: keyof T) => void;
};

const Table = <T extends object>({
  columns,
  data,
  className,
  onRowClick,
  onCellClick,
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map(
              (column) =>
                !column.hideHeader && (
                  <th
                    key={String(column.key)}
                    className="py-2 px-4 bg-gray-200 border-b"
                  >
                    {column.header}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map(
                (column) =>
                  !column.hideCell && (
                    <td
                      key={String(column.key)}
                      className="py-2 px-4 border-b text-center cursor-pointer"
                      onClick={(e) => {
                        if (onCellClick) {
                          e.stopPropagation();
                          onCellClick(row, column.key);
                        }
                      }}
                    >
                      {String(row[column.key])}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

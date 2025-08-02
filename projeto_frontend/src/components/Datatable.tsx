import React from "react";

interface DataTableProps {
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (id: any) => void;
}

export default function DataTable({ data, onEdit, onDelete }: DataTableProps) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Nenhum dado disponível.</p>;
  }

  // Pegando as chaves do primeiro item para usar como headers
  const headers = Object.keys(data[0]);

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-gray-300 px-4 py-2 text-center"
            >
              {header}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="border border-gray-300 px-4 py-2 text-center">
              Ações
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="hover:bg-gray-100"
          >
            {headers.map((key, colIndex) => (
              <td
                key={colIndex}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                {String(row[key])}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td className="border border-gray-300 px-4 py-2 text-center">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}






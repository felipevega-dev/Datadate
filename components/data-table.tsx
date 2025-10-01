interface DataTableProps {
  title?: string;
  columns: string[];
  rows: Record<string, any>[];
  className?: string;
}

export default function DataTable({ title, columns, rows, className = "" }: DataTableProps) {
  return (
    <div className={`overflow-hidden rounded-lg border-2 border-blue-200 my-6 ${className}`}>
      {title && (
        <div className="bg-blue-100 px-4 py-2 border-b-2 border-blue-200">
          <strong className="text-blue-900 text-sm font-semibold">{title}</strong>
        </div>
      )}
      <table className="w-full border-collapse">
        <thead className="bg-blue-50 border-b-2 border-blue-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left font-bold text-sm text-blue-900"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {columns.map((col) => (
                <td key={col} className="px-4 py-3 text-sm text-gray-700">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


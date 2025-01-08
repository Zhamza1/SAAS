import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
    <table className="w-full border-collapse border border-gray-300">{children}</table>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-100 border-b border-gray-300">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
    <tr className="hover:bg-gray-50">{children}</tr>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2 border border-gray-300">{children}</td>
);

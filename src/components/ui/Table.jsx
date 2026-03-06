import React from 'react';

export default function Table({ columns, data, onRowClick }) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#2D2D2D' }}>
                        {columns.map((col) => (
                            <th key={col.key} style={{
                                padding: '12px 20px', textAlign: col.className?.includes('text-right') ? 'right' : col.className?.includes('text-center') ? 'center' : 'left',
                                fontSize: '11px', fontWeight: 600, color: '#FFFFFF',
                                textTransform: 'uppercase', letterSpacing: '0.04em'
                            }}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={row.id || i}
                            onClick={() => onRowClick?.(row)}
                            style={{
                                borderBottom: i < data.length - 1 ? '1px solid #F0F0F0' : 'none',
                                cursor: onRowClick ? 'pointer' : 'auto',
                                transition: 'background-color 100ms'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {columns.map((col) => (
                                <td key={col.key} style={{
                                    padding: '14px 20px', color: '#333333',
                                    textAlign: col.className?.includes('text-right') ? 'right' : col.className?.includes('text-center') ? 'center' : 'left',
                                    fontFamily: col.className?.includes('font-mono') ? 'monospace' : 'inherit',
                                    fontSize: col.className?.includes('text-xs') ? '12px' : '13px'
                                }}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '40px 20px', textAlign: 'center', color: '#999999' }}>
                                No hay datos para mostrar
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

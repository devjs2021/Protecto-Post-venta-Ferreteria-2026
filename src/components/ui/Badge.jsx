import React from 'react';

const variantStyles = {
    success: { backgroundColor: '#DCFCE7', color: '#16A34A' },
    danger: { backgroundColor: '#FEE2E2', color: '#DC2626' },
    warning: { backgroundColor: '#FEF3C7', color: '#D97706' },
    info: { backgroundColor: '#FFF8E7', color: '#D4950A' },
    neutral: { backgroundColor: '#F5F5F5', color: '#666666' },
    primary: { backgroundColor: '#FFF8E7', color: '#D4950A' },
};

const dotColors = {
    success: '#16A34A', danger: '#DC2626', warning: '#D97706',
    info: '#F2A900', neutral: '#999999', primary: '#F2A900',
};

export default function Badge({ children, variant = 'neutral', dot, className = '' }) {
    const vs = variantStyles[variant] || variantStyles.neutral;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '3px 10px', fontSize: '11px', fontWeight: 500,
            borderRadius: '12px', ...vs
        }}>
            {dot && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dotColors[variant] || dotColors.neutral }} />}
            {children}
        </span>
    );
}

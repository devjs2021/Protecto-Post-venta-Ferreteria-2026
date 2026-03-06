import React from 'react';

export default function Input({
    label, error, icon: Icon, className = '', style = {}, ...props
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {label && (
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                {Icon && (
                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999999', display: 'flex' }}>
                        <Icon size={16} />
                    </div>
                )}
                <input
                    style={{
                        width: '100%', padding: '9px 12px', paddingLeft: Icon ? '36px' : '12px',
                        fontSize: '13px', backgroundColor: '#FFFFFF',
                        border: error ? '1px solid #DC2626' : '1px solid #E0E0E0',
                        borderRadius: '6px', outline: 'none', fontFamily: 'inherit',
                        transition: 'all 150ms', boxSizing: 'border-box',
                        ...style
                    }}
                    onFocus={e => { e.target.style.borderColor = '#F2A900'; e.target.style.boxShadow = '0 0 0 2px rgba(242,169,0,0.2)'; }}
                    onBlur={e => { e.target.style.borderColor = error ? '#DC2626' : '#E0E0E0'; e.target.style.boxShadow = 'none'; }}
                    {...props}
                />
            </div>
            {error && <p style={{ fontSize: '11px', color: '#DC2626' }}>{error}</p>}
        </div>
    );
}

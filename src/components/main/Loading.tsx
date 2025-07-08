import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(255, 255, 255)',
      zIndex: 9999
    }}>
      <div style={{
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #14a2ad',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{
        fontSize: '1rem',
        color: '#333',
        fontWeight: 500
      }}>Cargando...</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading; 
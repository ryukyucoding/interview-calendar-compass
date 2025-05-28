import React from 'react';

const MinimalIndex = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        面試行事曆系統
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '1rem'
      }}>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>
          系統正在載入中...
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          如果您看到這個頁面，表示React應用程式正常運作。
        </p>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>功能測試</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
          <li>✅ React 渲染功能</li>
          <li>⏳ 面試資料載入</li>
          <li>⏳ 行事曆顯示</li>
          <li>⏳ CSV 檔案匯入</li>
        </ul>
      </div>
    </div>
  );
};

export default MinimalIndex;

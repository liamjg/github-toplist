import React from 'react';

const RefreshableTable = ({
  headers,
  rows,
  doRefresh,
  loading,
  refreshButtonId,
}) => (
  <div className='refreshable-table'>
    {loading ? (
      <h2>Loading...</h2>
    ) : (
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={`${i}:${header}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {headers.map((header, i) => {
                if (header === 'avatar') {
                  return (
                    <td key={`${i}:${header}:${row.id}`}>
                      <img src={row['avatar_url']} alt='Avatar' />
                    </td>
                  );
                } else {
                  return (
                    <td key={`${i}:${header}:${row.id}`}>{row[header]}</td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <button onClick={doRefresh} disabled={loading} id={refreshButtonId}>
      Refresh
    </button>
  </div>
);

export default RefreshableTable;

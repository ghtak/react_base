import React from 'react';
import styles from './sample-table.module.scss';
import type { SampleData } from '../types';

interface SampleTableProps {
  data: SampleData[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: (ids: number[]) => void;
}

export const SampleTable: React.FC<SampleTableProps> = ({
  data,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(item.id));
  const someSelected = data.some((item) => selectedIds.includes(item.id));

  const handleHeaderCheckbox = () => {
    if (allSelected) {
      onToggleSelectAll([]);
    } else {
      onToggleSelectAll(data.map(d => d.id));
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                ref={input => {
                  if (input) {
                    input.indeterminate = !allSelected && someSelected;
                  }
                }}
                onChange={handleHeaderCheckbox}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                No data found.
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <tr
                  key={item.id}
                  className={isSelected ? styles.selected : ''}
                  onClick={() => onToggleSelect(item.id)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(item.id)}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.start_date}</td>
                  <td>{item.end_date}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

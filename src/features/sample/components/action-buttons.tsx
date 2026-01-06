import React from 'react';
import styles from './action-buttons.module.scss';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  selectedCount: number;
  onAdd: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  onCopy: () => void;
  onPaste: () => void;
  hasClipboard: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  selectedCount,
  onAdd,
  onDelete,
  onUpdate,
  onCopy,
  onPaste,
  hasClipboard,
}) => {
  return (
    <div className={styles.actionButtons}>
      <Button variant="secondary" onClick={onCopy} disabled={selectedCount === 0}>
        Copy ({selectedCount})
      </Button>
      <Button variant="secondary" onClick={onPaste} disabled={!hasClipboard}>
        Paste
      </Button>
      <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.5rem' }} />
      <Button variant="danger" onClick={onDelete} disabled={selectedCount === 0}>
        Delete ({selectedCount})
      </Button>
      <Button variant="secondary" onClick={onUpdate} disabled={selectedCount !== 1}>
        Edit
      </Button>
      <Button variant="primary" onClick={onAdd}>
        Add New
      </Button>
    </div>
  );
};

import { useEffect, useState, useMemo } from 'react';
import { useSampleStore } from '../store';
import type { SampleSearchParams, SampleData } from '../types';
import { SearchForm } from '../components/search-form';
import { ActionButtons } from '../components/action-buttons';
import { SampleTable } from '../components/sample-table';
import { Pagination } from '../components/pagination';
import { SampleModal } from '../components/sample-modal';

const ITEMS_PER_PAGE = 10;

export const SamplePage = () => {
  const {
    items,
    filteredItems,
    searchParams,
    initialize,
    setSearchParams,
    search,
    add,
    update,
    remove,
    clipboard,
    copyHelpers,
  } = useSampleStore();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');

  // Memoize pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems.length]);

  const handleSearch = (params: SampleSearchParams) => {
    setSearchParams(params);
    search();
    setSelectedIds([]); // Clear selection on search
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (ids: number[]) => {
    setSelectedIds(ids);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      remove(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleAdd = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setModalMode('update');
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: Omit<SampleData, 'id' | 'created_at' | 'updated_at'>) => {
    if (modalMode === 'create') {
      add(data);
    } else {
      // Update mode assumed single selection
      const idToUpdate = selectedIds[0];
      if (idToUpdate) {
        update(idToUpdate, data);
      }
    }
    setSelectedIds([]); // Clear selection after action
  };

  const handleCopy = () => {
    const itemToCopy = items.find(i => selectedIds.includes(i.id));
    if (itemToCopy) {
      copyHelpers.copyToClipboard(itemToCopy);
      alert('Copied to specific clipboard!');
    }
  };

  const handlePaste = () => {
    copyHelpers.pasteFromClipboard();
    alert('Pasted new item!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
        Sample Management
      </h1>

      <SearchForm initialValues={searchParams} onSearch={handleSearch} />

      <ActionButtons
        selectedCount={selectedIds.length}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onCopy={handleCopy}
        onPaste={handlePaste}
        hasClipboard={clipboard.length > 0}
      />

      <SampleTable
        data={paginatedItems}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        mode={modalMode}
        initialValues={
          modalMode === 'update'
            ? items.find((i) => i.id === selectedIds[0])
            : undefined
        }
      />
    </div>
  );
};


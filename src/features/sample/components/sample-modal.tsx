import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import type { SampleData } from '../types';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SampleData, 'id' | 'created_at' | 'updated_at'>) => void;
  initialValues?: Partial<SampleData>;
  mode: 'create' | 'update';
}

interface RunnableData {
  name: string;
  start_date: string;
  end_date: string;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RunnableData>({
    defaultValues: {
      name: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      ...initialValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  const onFormSubmit = (data: RunnableData) => {
    if (data.start_date > data.end_date) {
      setError('start_date', { message: 'Start date cannot be after end date' });
      setError('end_date', { message: 'End date cannot be before start date' });
      return;
    }
    onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New Sample' : 'Edit Sample'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onFormSubmit)}>Save</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Name"
          placeholder="Enter sample name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            maxLength: { value: 20, message: 'Name must be less than 20 characters' },
          })}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input
            label="Start Date"
            type="date"
            error={errors.start_date?.message}
            {...register('start_date', { required: 'Start date is required' })}
            style={{flex: 1}}
          />
          <Input
            label="End Date"
            type="date"
            error={errors.end_date?.message}
            {...register('end_date', { required: 'End date is required' })}
            style={{flex: 1}}
          />
        </div>
      </div>
    </Modal>
  );
};

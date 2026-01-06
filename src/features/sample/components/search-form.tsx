import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './search-form.module.scss';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SampleSearchParams } from '../types';

interface SearchFormProps {
  initialValues: SampleSearchParams;
  onSearch: (values: SampleSearchParams) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ initialValues, onSearch }) => {
  const { register, handleSubmit } = useForm<SampleSearchParams>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: SampleSearchParams) => {
    onSearch(data);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fieldGroup}>
        <Input
          label="Name"
          placeholder="Search by name"
          {...register('name')}
        />
        <Input
          label="Start Date"
          type="date"
          {...register('startDate')}
        />
        <Input
          label="End Date"
          type="date"
          {...register('endDate')}
        />
      </div>
      <Button type="submit" className={styles.searchButton}>Search</Button>
    </form>
  );
};

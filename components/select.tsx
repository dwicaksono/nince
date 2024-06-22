'use client';

import React, { memo, useMemo } from 'react';
import { SingleValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';

type props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};
const Select = ({
  value,
  onChange,
  onCreate,
  options,
  disabled,
  placeholder,
}: props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };
  const formattedValue = useMemo(() => {
    if (!value) return null;
    return options?.find((option) => option.value === value);
  }, [value, options]);
  return (
    <CreateableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};

export default Select;

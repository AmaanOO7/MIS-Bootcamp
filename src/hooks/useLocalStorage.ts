import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'mis-bootcamp-state-v1';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const fullKey = `${STORAGE_KEY}:${key}`;
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(fullKey);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [fullKey, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    try {
      localStorage.removeItem(fullKey);
    } catch {
      // ignore
    }
  }, [fullKey, initialValue]);

  return [value, setValue, reset] as const;
}

export function clearAllStorage() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_KEY))
    .forEach((k) => localStorage.removeItem(k));
}

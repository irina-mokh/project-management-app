import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    console.log('title', document.title);
  }, [title]);
};

import { renderHook, act } from '@testing-library/react';
import { useState, useEffect } from 'react';
//Code structure from ChatGPT
interface Media {
  id: number;
  name: string;
  genre: string;
  publishedate: string;
  mediatype: string;
}

const useMediaSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [filteredMediaItems, setFilteredMediaItems] = useState<Media[]>([]);

  useEffect(() => {
    const filtered = mediaItems.filter((media) =>
      media.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.mediatype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.publishedate.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMediaItems(filtered);
  }, [searchQuery, mediaItems]);

  return { searchQuery, setSearchQuery, mediaItems, setMediaItems, filteredMediaItems };
};

describe('Media Search Functionality', () => {
  it('should filter media items based on search query', () => {
    const { result } = renderHook(() => useMediaSearch());

    act(() => {
      result.current.setMediaItems([
        { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
        { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
        { id: 3, name: '1984', genre: 'Dystopian', publishedate: '1949', mediatype: 'Book' },
      ]);
    });

    act(() => {
      result.current.setSearchQuery('fiction');
    });

    expect(result.current.filteredMediaItems.length).toBe(2);
    expect(result.current.filteredMediaItems).toEqual([
      { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
      { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
    ]);
  });

  it('should perform case-insensitive search', () => {
    const { result } = renderHook(() => useMediaSearch());

    act(() => {
      result.current.setMediaItems([
        { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
        { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
      ]);
    });

    act(() => {
      result.current.setSearchQuery('GREAT');
    });

    expect(result.current.filteredMediaItems.length).toBe(1);
    expect(result.current.filteredMediaItems[0].name).toBe('The Great Gatsby');
  });

  it('should handle an empty search query by returning all media items', () => {
    const { result } = renderHook(() => useMediaSearch());

    act(() => {
      result.current.setMediaItems([
        { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
        { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
      ]);
    });

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.filteredMediaItems.length).toBe(2);
    expect(result.current.filteredMediaItems).toEqual([
      { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
      { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
    ]);
  });

  it('should filter media by genre or type', () => {
    const { result } = renderHook(() => useMediaSearch());

    act(() => {
      result.current.setMediaItems([
        { id: 1, name: 'The Great Gatsby', genre: 'Fiction', publishedate: '1925', mediatype: 'Book' },
        { id: 2, name: 'To Kill a Mockingbird', genre: 'Fiction', publishedate: '1960', mediatype: 'Book' },
        { id: 3, name: 'National Geographic', genre: 'Science', publishedate: '2023', mediatype: 'Journal' },
      ]);
    });


    act(() => {
      result.current.setSearchQuery('Science');
    });

    expect(result.current.filteredMediaItems.length).toBe(1);
    expect(result.current.filteredMediaItems[0].name).toBe('National Geographic');
  });
});

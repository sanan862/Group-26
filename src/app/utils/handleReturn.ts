export const handleReturn = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to return a book.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle API errors (server responded with error status)
        const errorMessage = data.error || 'Failed to return book';
        throw new Error(errorMessage);
      }
  
      alert('Book returned successfully!');
      return data;
    } catch (error: any) {
      // Handle network errors and API errors
      const errorMessage = error.message || 'Failed to return book';
      alert(errorMessage);
      throw error; // Re-throw if you want tests to catch it
    }
  };
export const handleBorrow = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to borrow media.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      alert('media borrowed successfully!');
      return data;
    } catch (error: any) {
      alert(error.message || 'Failed to borrow media.');
      throw error;
    }
  };
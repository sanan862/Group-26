import { handleReturn } from '../utils/handleReturn'

describe('handleReturn', () => {
  beforeEach(() => {
    // Clear all mocks and localStorage before each test
    jest.clearAllMocks();
    window.localStorage.clear();
    (global.fetch as jest.Mock).mockClear();
  });

  beforeAll(() => {
    // Mock global objects
    global.alert = jest.fn();
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;
  });

  it('should show alert when user is not logged in', async () => {
    await handleReturn(1);
    expect(global.alert).toHaveBeenCalledWith('Please log in to return a book.');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should make API call when user is logged in', async () => {
    window.localStorage.setItem('authToken', 'test-token');
    await handleReturn(1);
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/return', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token',
      },
      body: JSON.stringify({ id: 1 }),
    });
    expect(global.alert).toHaveBeenCalledWith('Book returned successfully!');
  });


  it('should handle network errors', async () => {
    window.localStorage.setItem('authToken', 'test-token');
    
    // Mock a network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(handleReturn(1)).rejects.toThrow('Network error');
    expect(global.alert).toHaveBeenCalledWith('Network error');
  });
});
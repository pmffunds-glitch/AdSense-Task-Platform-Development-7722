import Cookies from 'js-cookie';

// Mock authentication service - replace with your actual auth implementation
class AuthService {
  constructor() {
    // Initialize with default users if none exist
    this.initializeDefaultUsers();
    this.currentUser = null;
  }

  initializeDefaultUsers() {
    // Check if users exist in localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // If users array is empty or doesn't contain our demo users, add them
    if (users.length === 0 || !users.some(u => u.email === 'admin@taskearn.com')) {
      // Create default users if they don't exist
      const defaultUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@taskearn.com',
          password: 'admin123',
          role: 'admin',
          status: 'active',
          joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastLoginAt: new Date().toISOString(),
          totalEarnings: 150.75,
          tasksCompleted: 45,
          profilePicture: null
        },
        {
          id: '2',
          name: 'Demo User',
          email: 'demo@taskearn.com',
          password: 'demo123',
          role: 'user',
          status: 'active',
          joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          totalEarnings: 89.50,
          tasksCompleted: 23,
          profilePicture: null
        },
        {
          id: '3',
          name: 'Moderator User',
          email: 'mod@taskearn.com',
          password: 'mod123',
          role: 'moderator',
          status: 'active',
          joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          lastLoginAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          totalEarnings: 125.25,
          tasksCompleted: 67,
          profilePicture: null
        }
      ];
      
      // Merge with existing users or use default ones
      if (users.length > 0) {
        // Remove any existing demo users by email to avoid duplicates
        users = users.filter(user => 
          !['admin@taskearn.com', 'demo@taskearn.com', 'mod@taskearn.com'].includes(user.email)
        );
        // Add the default users
        users = [...users, ...defaultUsers];
      } else {
        users = defaultUsers;
      }
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Set users property
    this.users = users;
  }

  async getCurrentUser() {
    const token = Cookies.get('authToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
      this.currentUser = userData;
      return userData;
    }
    return null;
  }

  async login(email, password) {
    // Re-fetch users to ensure we have the latest data
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email and password
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Update last login time
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex].lastLoginAt = new Date().toISOString();
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    
    // Create user data object (without sensitive information)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
      joinedAt: user.joinedAt,
      totalEarnings: user.totalEarnings || 0,
      tasksCompleted: user.tasksCompleted || 0
    };
    
    // Set auth token
    Cookies.set('authToken', 'mock-token-' + user.id, { expires: 7 });
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUser = userData;
    
    return userData;
  }

  async register(email, password, name) {
    // Re-fetch users to ensure we have the latest data
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'user',
      status: 'active',
      joinedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      totalEarnings: 0,
      tasksCompleted: 0
    };
    
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    
    // Auto login after registration
    return this.login(email, password);
  }

  async logout() {
    Cookies.remove('authToken');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async updateProfile(updates) {
    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }
    
    // Re-fetch users to ensure we have the latest data
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(this.users));
    
    const updatedUser = {
      ...this.currentUser,
      ...updates
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUser = updatedUser;
    
    return updatedUser;
  }
}

export const authService = new AuthService();
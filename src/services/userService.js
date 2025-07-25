// Mock user service - replace with your actual user management API
class UserService {
  constructor() {
    this.initializeMockData();
  }

  initializeMockData() {
    // Get existing users or create initial data
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (existingUsers.length === 0) {
      const mockUsers = [
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

      // Generate additional mock users
      for (let i = 4; i <= 50; i++) {
        mockUsers.push({
          id: i.toString(),
          name: `User ${i}`,
          email: `user${i}@example.com`,
          password: 'password123',
          role: Math.random() > 0.8 ? 'moderator' : 'user',
          status: Math.random() > 0.1 ? 'active' : Math.random() > 0.5 ? 'suspended' : 'inactive',
          joinedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          lastLoginAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalEarnings: Math.random() * 200,
          tasksCompleted: Math.floor(Math.random() * 100),
          profilePicture: null
        });
      }
      
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  }

  async getAllUsers() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.map(user => ({
      ...user,
      password: undefined // Don't return passwords
    }));
  }

  async getUserById(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);
    if (user) {
      delete user.password;
    }
    return user;
  }

  async getUserStats() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      suspendedUsers: users.filter(u => u.status === 'suspended').length,
      inactiveUsers: users.filter(u => u.status === 'inactive').length,
      adminUsers: users.filter(u => u.role === 'admin').length,
      moderatorUsers: users.filter(u => u.role === 'moderator').length,
      regularUsers: users.filter(u => u.role === 'user').length,
      newUsersThisMonth: users.filter(u => {
        const joinDate = new Date(u.joinedAt);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return joinDate > thirtyDaysAgo;
      }).length,
      totalEarnings: users.reduce((sum, u) => sum + (u.totalEarnings || 0), 0),
      totalTasksCompleted: users.reduce((sum, u) => sum + (u.tasksCompleted || 0), 0)
    };

    return stats;
  }

  async updateUserRole(userId, newRole) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].role = newRole;
    users[userIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('users', JSON.stringify(users));
    
    return users[userIndex];
  }

  async updateUserStatus(userId, status) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].status = status;
    users[userIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('users', JSON.stringify(users));
    
    return users[userIndex];
  }

  async deleteUser(userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.id !== userId);
    
    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }

    localStorage.setItem('users', JSON.stringify(filteredUsers));
    return true;
  }

  async searchUsers(searchTerm, filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    let filteredUsers = users.filter(user => {
      const matchesSearch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort by join date (newest first)
    filteredUsers.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));

    return filteredUsers.map(user => ({
      ...user,
      password: undefined
    }));
  }

  async updateUserProfile(userId, updates) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    
    const updatedUser = { ...users[userIndex] };
    delete updatedUser.password;
    return updatedUser;
  }
}

export const userService = new UserService();
// Mock task service - replace with your actual API implementation
class TaskService {
  constructor() {
    this.initializeMockData();
  }

  initializeMockData() {
    if (!localStorage.getItem('tasks')) {
      const mockTasks = [
        {
          id: '1',
          title: 'Copy Product URL',
          description: 'Copy the product URL from the given page and paste it in the form',
          type: 'copy_paste',
          points: 10,
          estimatedTime: '2 minutes',
          targetUrl: 'https://example.com/product/123',
          instructions: [
            'Visit the product page',
            'Copy the URL from your browser',
            'Paste it in the submission form',
            'Click submit to complete'
          ],
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Visit and Review Link',
          description: 'Visit the provided link and provide a brief review',
          type: 'visit_review',
          points: 15,
          estimatedTime: '5 minutes',
          targetUrl: 'https://example.com/review-page',
          instructions: [
            'Click the provided link',
            'Spend at least 2 minutes on the page',
            'Write a brief review (50+ words)',
            'Submit your review'
          ],
          active: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Social Media Share',
          description: 'Share the given content on your social media',
          type: 'social_share',
          points: 20,
          estimatedTime: '3 minutes',
          targetUrl: 'https://example.com/share-content',
          instructions: [
            'Copy the provided content',
            'Share it on your social media platform',
            'Take a screenshot of the post',
            'Upload the screenshot as proof'
          ],
          active: true,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('tasks', JSON.stringify(mockTasks));
    }

    if (!localStorage.getItem('userTasks')) {
      localStorage.setItem('userTasks', JSON.stringify([]));
    }
  }

  async getTasks() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks.filter(task => task.active);
  }

  async getTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks.find(task => task.id === taskId);
  }

  async getUserTasks(userId) {
    const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
    return userTasks.filter(task => task.userId === userId);
  }

  async completeTask(taskId, userId, taskData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const task = await this.getTask(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    // Check if user already completed this task
    const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
    const existingTask = userTasks.find(ut => ut.taskId === taskId && ut.userId === userId);
    
    if (existingTask) {
      throw new Error('Task already completed');
    }

    const completedTask = {
      id: Date.now().toString(),
      taskId,
      userId,
      points: task.points,
      completedAt: new Date().toISOString(),
      data: taskData,
      status: 'completed'
    };

    userTasks.push(completedTask);
    localStorage.setItem('userTasks', JSON.stringify(userTasks));

    // Update user stats
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].tasksCompleted = (users[userIndex].tasksCompleted || 0) + 1;
      users[userIndex].totalEarnings = (users[userIndex].totalEarnings || 0) + (task.points * 0.01); // $0.01 per point
      localStorage.setItem('users', JSON.stringify(users));
    }

    return completedTask;
  }

  async createTask(taskData) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      active: true,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return newTask;
  }

  async updateTask(taskId, updates) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return tasks[taskIndex];
  }
}

export const taskService = new TaskService();
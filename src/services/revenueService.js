// Mock revenue service - replace with your actual revenue tracking implementation
class RevenueService {
  constructor() {
    this.initializeMockData();
  }

  initializeMockData() {
    if (!localStorage.getItem('adViews')) {
      localStorage.setItem('adViews', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('revenueData')) {
      const mockRevenueData = {
        totalRevenue: 1250.75,
        totalPageViews: 15420,
        totalAdClicks: 890,
        averageRPM: 4.32,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('revenueData', JSON.stringify(mockRevenueData));
    }
  }

  async getUserEarnings(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
    const userCompletedTasks = userTasks.filter(task => task.userId === userId);
    
    const totalPoints = userCompletedTasks.reduce((sum, task) => sum + task.points, 0);
    const totalEarnings = totalPoints * 0.01; // $0.01 per point
    
    const adViews = JSON.parse(localStorage.getItem('adViews') || '[]');
    const userAdViews = adViews.filter(view => view.userId === userId);
    
    const adRevenue = userAdViews.length * 0.05; // $0.05 per ad view
    
    return {
      totalEarnings: totalEarnings + adRevenue,
      taskEarnings: totalEarnings,
      adRevenue: adRevenue,
      totalPoints,
      tasksCompleted: userCompletedTasks.length,
      adViewsCount: userAdViews.length,
      pendingPayout: (totalEarnings + adRevenue) > 10 ? totalEarnings + adRevenue : 0,
      payoutThreshold: 10,
      earningsHistory: this.generateEarningsHistory(userId)
    };
  }

  async getRevenueStats(userId) {
    const revenueData = JSON.parse(localStorage.getItem('revenueData') || '{}');
    const userEarnings = await this.getUserEarnings(userId);
    
    return {
      ...revenueData,
      userShare: userEarnings.totalEarnings,
      userSharePercentage: ((userEarnings.totalEarnings / revenueData.totalRevenue) * 100).toFixed(2)
    };
  }

  async trackAdView(userId, adUnitId, pageUrl) {
    const adViews = JSON.parse(localStorage.getItem('adViews') || '[]');
    
    const adView = {
      id: Date.now().toString(),
      userId,
      adUnitId,
      pageUrl,
      timestamp: new Date().toISOString(),
      revenue: 0.05 // Mock revenue per view
    };

    adViews.push(adView);
    localStorage.setItem('adViews', JSON.stringify(adViews));

    return adView;
  }

  generateEarningsHistory(userId) {
    const history = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      history.push({
        date: date.toISOString().split('T')[0],
        earnings: Math.random() * 5 + 1, // Random earnings between $1-6
        tasks: Math.floor(Math.random() * 10) + 1,
        adViews: Math.floor(Math.random() * 20) + 5
      });
    }
    
    return history;
  }

  async requestPayout(userId, amount, paymentMethod) {
    // Simulate payout request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const payoutRequest = {
      id: Date.now().toString(),
      userId,
      amount,
      paymentMethod,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    const payouts = JSON.parse(localStorage.getItem('payouts') || '[]');
    payouts.push(payoutRequest);
    localStorage.setItem('payouts', JSON.stringify(payouts));

    return payoutRequest;
  }
}

export const revenueService = new RevenueService();
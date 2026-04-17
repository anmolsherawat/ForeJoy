// 100% working mock database - NO EXTERNAL DEPENDENCIES!
const crypto = require('crypto');

const generateId = () => crypto.randomUUID();

const mockData = {
  users: [],
  charities: [
    {
      id: generateId(),
      name: 'Youth Golf Foundation',
      description: 'Helping underprivileged youth learn golf and life skills',
      image_url: null,
      website: 'https://example.com/youth-golf',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: generateId(),
      name: 'Environmental Conservation Fund',
      description: 'Protecting golf courses and natural habitats',
      image_url: null,
      website: 'https://example.com/eco-fund',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: generateId(),
      name: 'First Responders Support',
      description: 'Supporting families of first responders through golf programs',
      image_url: null,
      website: 'https://example.com/first-responders',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  subscriptions: [],
  scores: [],
  draws: [],
  winnings: []
};

let sessions = {};

const mockDb = {
  query: async (text, params = []) => {
    console.log('DB Query:', text, params);
    let rows = [];

    if (text.includes('charities') && text.includes('SELECT')) {
      rows = [...mockData.charities];
    } 
    else if (text.includes('users') && text.includes('SELECT') && text.includes('email')) {
      rows = mockData.users.filter(u => u.email === params[0]);
    }
    else if (text.includes('users') && text.includes('INSERT')) {
      const newUser = {
        id: generateId(),
        email: params[0],
        password: params[1],
        first_name: params[2],
        last_name: params[3],
        charity_id: params[4] || null,
        charity_percentage: params[5] || 10,
        is_admin: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockData.users.push(newUser);
      const token = generateId();
      sessions[token] = newUser;
      console.log('New user created:', newUser);
      return { rows: [newUser], token };
    }
    else if (text.includes('users') && text.includes('SELECT') && text.includes('id')) {
      rows = mockData.users.filter(u => u.id === params[0]);
    }
    
    console.log('DB Result:', rows);
    return { rows };
  },
  
  // For mock auth
  sessions,
  mockData
};

module.exports = mockDb;

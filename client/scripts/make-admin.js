const { MongoClient } = require('mongodb');

async function makeAdmin() {
  try {
    const uri = "mongodb+srv://solidityanalyzerx:vex65535z@cluster0.fl2by.mongodb.net/";
    
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected successfully');

    const db = client.db();
    const users = db.collection('users');

    // First, let's check if the user exists
    const user = await users.findOne({ email: 'superalphadao@gmail.com' });
    if (!user) {
      throw new Error('User not found with email: superalphadao@gmail.com');
    }

    console.log('Current user role:', user.role);

    const result = await users.updateOne(
      { email: 'superalphadao@gmail.com' },
      { 
        $set: { 
          role: 'ADMIN',
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      console.log('User not found. Please check if the email is correct.');
    } else if (result.modifiedCount === 0) {
      console.log('User already has ADMIN role');
    } else {
      console.log('Successfully updated user role to ADMIN');
    }

    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

makeAdmin(); 
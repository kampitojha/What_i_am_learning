const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

async function checkConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 MongoDB Connection Test');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    try {
        console.log('⏳ Attempting to connect...');
        console.log(`📍 URI: ${uri}\n`);

        await client.connect();

        console.log('✅ Connection Status: CONNECTED');

        await client.db('admin').command({ ping: 1 });
        console.log('✅ Ping Test: SUCCESS');

        const admin = client.db().admin();
        const serverInfo = await admin.serverInfo();
        
        console.log('\n📊 Database Information:');
        console.log(`   Version: ${serverInfo.version}`);
        console.log(`   Platform: ${serverInfo.os?.type || 'N/A'}`);

        const dbs = await admin.listDatabases();
        console.log(`\n📁 Total Databases: ${dbs.databases.length}`);
        console.log('   Databases:');
        dbs.databases.forEach(db => {
            console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
        });

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ MongoDB is fully operational!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.log('❌ Connection Status: FAILED\n');
        console.log('🔴 Error Details:');
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('   Type: Connection Refused');
            console.log('   Reason: MongoDB is not running\n');
            console.log('💡 Solutions:');
            console.log('   1. Start MongoDB locally:');
            console.log('      → Run: mongod');
            console.log('   2. Use MongoDB Atlas (cloud):');
            console.log('      → https://www.mongodb.com/cloud/atlas');
        } else if (error.message.includes('authentication')) {
            console.log('   Type: Authentication Error');
            console.log('   Reason: Invalid username/password\n');
            console.log('💡 Solution:');
            console.log('   → Check your credentials in connection string');
        } else if (error.message.includes('timeout')) {
            console.log('   Type: Connection Timeout');
            console.log('   Reason: Cannot reach MongoDB server\n');
            console.log('💡 Solutions:');
            console.log('   → Check if MongoDB is running');
            console.log('   → Check your internet connection');
            console.log('   → Verify connection string');
        } else {
            console.log(`   Message: ${error.message}`);
        }
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('❌ Connection test failed!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
    } finally {
        await client.close();
    }
}

checkConnection();

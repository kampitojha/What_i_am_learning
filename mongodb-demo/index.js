const { MongoClient } = require('mongodb');

const atlasUri = 'mongodb+srv://username:password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority';
const localUri = 'mongodb://localhost:27017';
const dbName = 'myTestDatabase';

async function connectToMongoDB() {
    const client = new MongoClient(localUri);

    try {
        console.log('🔄 Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Successfully connected to MongoDB!');
        
        const database = client.db(dbName);
        const collection = database.collection('users');
        
        const count = await collection.countDocuments();
        console.log(`📊 Total documents in 'users' collection: ${count}`);
        
        return { client, database, collection };
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        throw error;
    }
}

async function performCRUDOperations() {
    let client;
    
    try {
        const { client: connectedClient, collection } = await connectToMongoDB();
        client = connectedClient;
        
        console.log('\n📝 Performing CRUD Operations...\n');
        
        console.log('1️⃣ INSERT Operation:');
        
        const insertResult = await collection.insertOne({
            name: 'John Doe',
            email: 'john@example.com',
            age: 25,
            city: 'Mumbai'
        });
        
        console.log(`   ✅ Inserted document with ID: ${insertResult.insertedId}`);
        
        const insertManyResult = await collection.insertMany([
            { name: 'Jane Smith', email: 'jane@example.com', age: 28, city: 'Delhi' },
            { name: 'Bob Johnson', email: 'bob@example.com', age: 32, city: 'Bangalore' }
        ]);
        
        console.log(`   ✅ Inserted ${insertManyResult.insertedCount} documents\n`);
        
        console.log('2️⃣ READ Operation:');
        
        const allUsers = await collection.find({}).toArray();
        console.log(`   📖 Total users: ${allUsers.length}`);
        console.log('   First user:', allUsers[0]);
        
        const mumbaiUsers = await collection.find({ city: 'Mumbai' }).toArray();
        console.log(`   📍 Users from Mumbai: ${mumbaiUsers.length}\n`);
        
        const oneUser = await collection.findOne({ name: 'John Doe' });
        console.log('   🔍 Found user:', oneUser?.name || 'Not found');
        
        console.log('\n3️⃣ UPDATE Operation:');
        
        const updateResult = await collection.updateOne(
            { name: 'John Doe' },
            { $set: { age: 26, city: 'Pune' } }
        );
        
        console.log(`   ✏️  Updated ${updateResult.modifiedCount} document`);
        
        const updateManyResult = await collection.updateMany(
            { age: { $gte: 25 } },
            { $set: { status: 'active' } }
        );
        
        console.log(`   ✏️  Updated ${updateManyResult.modifiedCount} documents\n`);
        
        console.log('4️⃣ DELETE Operation:');
        
        const deleteResult = await collection.deleteOne({ name: 'Bob Johnson' });
        console.log(`   🗑️  Deleted ${deleteResult.deletedCount} document`);
        
        const finalCount = await collection.countDocuments();
        console.log(`   📊 Remaining documents: ${finalCount}\n`);
        
    } catch (error) {
        console.error('❌ Error during operations:', error.message);
    } finally {
        if (client) {
            await client.close();
            console.log('🔒 Connection closed');
        }
    }
}

async function advancedExamples() {
    const client = new MongoClient(localUri);
    
    try {
        await client.connect();
        const database = client.db(dbName);
        const products = database.collection('products');
        
        console.log('\n🚀 Advanced MongoDB Operations:\n');
        
        await products.insertMany([
            { name: 'Laptop', price: 50000, category: 'Electronics', stock: 10 },
            { name: 'Phone', price: 20000, category: 'Electronics', stock: 25 },
            { name: 'Book', price: 500, category: 'Education', stock: 100 },
            { name: 'Headphones', price: 2000, category: 'Electronics', stock: 50 }
        ]);
        
        const electronics = await products.find({ category: 'Electronics' }).toArray();
        console.log('📱 Electronics:', electronics.length);
        
        const sortedByPrice = await products.find({}).sort({ price: -1 }).toArray();
        console.log('💰 Most expensive:', sortedByPrice[0].name);
        
        const namesOnly = await products.find({}, { projection: { name: 1, price: 1, _id: 0 } }).toArray();
        console.log('📋 Products with name and price only:', namesOnly);
        
        const avgPrice = await products.aggregate([
            { $group: { _id: null, averagePrice: { $avg: '$price' } } }
        ]).toArray();
        console.log(`📊 Average price: ₹${avgPrice[0].averagePrice}`);
        
        await products.drop();
        console.log('🧹 Products collection dropped');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.close();
    }
}

async function robustConnection() {
    const client = new MongoClient(localUri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    });
    
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('✅ Pinged your deployment. Successfully connected to MongoDB!');
        
    } catch (error) {
        if (error.message.includes('ECONNREFUSED')) {
            console.error('❌ MongoDB is not running. Please start MongoDB first.');
            console.log('   Run: mongod (on another terminal)');
        } else if (error.message.includes('authentication failed')) {
            console.error('❌ Authentication failed. Check username/password.');
        } else {
            console.error('❌ Connection error:', error.message);
        }
    } finally {
        await client.close();
    }
}

performCRUDOperations();

const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/your_database_name'; // Replace with your actual connection string

// Connect to MongoDB
connect(connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Connection successful
connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

// Connection error
connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// Connection disconnected
connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection when the Node process is terminated
process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

// Export the Mongoose connection for use in other parts of the application
module.exports = connection;

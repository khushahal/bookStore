const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = 'mongodb://khushahal:khs123@ds123963.mlab.com:23963/gql-booksinfo';

//allow cross origin  request
app.use(cors());

//connect to mlab database
mongoose.connect( process.env.MONGODB_URI || MONGODB_URI, {useNewUrlParser:true});
mongoose.connection.once('open',()=> {
  console.log("connected to database");
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.use(express.static('client/build'));


app.listen(PORT, ()=>  console.log(`Server started on port ${PORT}`));

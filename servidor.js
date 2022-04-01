const express = require('express');

const {buildSchema}= require('graphql');
const {graphqlHTTP}=require('express-graphql')


/*======================================================
schema containes a collection of type definitions
type is a collection of fields
the type define the shape of the data which wil be returned
=========================================================*/

const schema=buildSchema(`
  type Query{   
   description:String
   price: Float
  }
`);



/*======================================================
By using graphqlHTTP middleware we can make 
express respond to graphql queries
========================================================*/

// will hold the values corresponding to our schema 
const root={
 description: 'Red Shoe',
 price:42.12,
};

const app=express();

app.use(`/graphql`,graphqlHTTP({
    schema:schema,
    rootValue: root,
    graphiql:true,
    
}))


app.listen(3000, ()=>{
  console.log('ouvindo a porta 3000');
})
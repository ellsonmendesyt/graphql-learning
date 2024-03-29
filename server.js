const express = require('express');

const {buildSchema}= require('graphql');
const {graphqlHTTP}=require('express-graphql')




const schema=buildSchema(`
  type Query{   
   products:[Product]
   orders:[Order]   
  }

  type Product{
    id:ID!
    description:String!
    price:Float!
    reviews:[Review]
  }

  type Review{
    rating:Int!,
    comment:String
  }

  type Order{
    date:String!
    subtotal:Float!
    items:[OrderItem]
  }

  type OrderItem{
    product:Product!,
    quantity:Int!
  }
`);




const root={
  products:[
    {
      id:'redshoe',
      description:'Red shoe',
      price:42.12
    },
    {
      id:'bluejean',
      description:'Blue Jeans',
      price:55.55
    }
  ],
  orders:[
    {
      date:'2005-05-06',
      subtotal:90.22,
      items:[
        {
          product:{ id:'redshoe', description:'Old Red Shoe', price:45.11},
          quantity:2
        }
      ]
    }
  ]
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


/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      QUERIES THE SERVER SUPPORTS
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

products: [Product]
orders: [Order]





*/
// this file will give schema for ur data 
const {gql} = require('graphql-tag')
const typedefs = gql` 
type Product {
    id:ID! 
    description: String!
    price:Float!
    name:String!
}
type Query {
   getproducts : [Product!]!
   getproduct(id:ID!):Product
}    
type Mutation {
      createProduct(
    
    description: String!
    price:Float!
    name:String!
    ):Product
    delete(id:ID!):Boolean    
}   

    
`
module.exports = typedefs 
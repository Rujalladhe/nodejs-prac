const products = require('../data/product')
const resolvers =
{
    Query:{
        getproducts:()=>products,
        getproduct:(_,{id}) => products.find(item => item.id ==id) 
    },
     Mutation:{
        createProduct:(_, {description,price,category,name})=>{
            const newycreatedproduct={
                id:String(products.length +1),
                description,
                price,category,name
            }
            products.push(newycreatedproduct)
            return newycreatedproduct;
        },
         delete:(_,{id})=>{
            const index = products.findIndex(item => item.id==id)
            if(index == -1) return false 
            products.splice(index , 1 )
         }

         
        
     }
}
module.exports = resolvers
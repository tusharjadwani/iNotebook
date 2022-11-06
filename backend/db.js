const mongoose=require('mongoose');

const db=async()=>{
    mongoose.connect("mongodb://localhost/inote",()=>{
        console.log("mongodb connected");
    })
}

// export default db;
module.exports=db;
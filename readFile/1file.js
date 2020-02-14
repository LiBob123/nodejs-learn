let fs = require("fs")
let path = require("path")
fs.readFile(path.resolve(__dirname,'./static/test.js'),(err,data)=>{
  if(err){
    console.log(err);
    return;
  }
  fs.writeFile(path.resolve(__dirname,'./static/copyTest.js'),data,err=>{
    if(err){
      console.log('写入失败'+err)
    }else{
      console.log('写入成功')
    }
  })
})
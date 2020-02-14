const http = require('http')
const querystring = require('querystring')
var server = http.createServer(function(request,response){
  let arr = [];
  request.on('data',data=>{arr.push(data)})
  response.setHeader('cookie','asfa=1231')
  request.on('end',_=>{
    response.statusCode = 200;
    console.log(request.method)
    if(request.method === 'POST'){
      let str = Buffer.concat(arr).toString()
      console.log(str)
      var params = querystring.parse(str, '&', '=')
      console.log(params)
       response.end('post:'+JSON.stringify(params))
    }else{
      response.end('get')
    }
  })
})
server.listen(4000,function(){
  console.log('监听4000端口')
})
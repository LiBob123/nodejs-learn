let fs = require("fs");
let path = require("path");
let rs = fs.createReadStream(path.resolve(__dirname, './static/test.js'), {
  flags: 'r', // r  w
  highWaterMark: 3, //读取长度 //默认64k
  encoding: null,
  autoClose: true, //读取完毕自动关闭
})
let ws = fs.createWriteStream(path.resolve(__dirname, './static/streamFile.js'), {
  flags: 'w', // r  w
  highWaterMark: 1, //预计写入多少个  //默认16k
  encoding: 'utf8',
  autoClose: true, //读取完毕自动关闭
})

// rs.pipe(ws) //官方提供pipe方法
rs.on('data', function (chunk) {
  console.log(chunk)
  let fg = ws.write(chunk,function(err){
    if(err) rs.pause();
  })
  if(!fg) rs.pause();
})
rs.on('end', function () {
  console.log('读取完毕')
  ws.end()
})
//等待写入完成后恢复读取
ws.on('drain',function(){
  console.log(123)
  rs.resume();
})
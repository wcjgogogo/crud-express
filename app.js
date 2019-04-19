// 入口文件
// 做一些服务的祥光配置

// 加载模块
var express=require('express')
var router=require('./router')
var bodyParser=require('body-parser')

// 创建服务器
var app=express()

// 允许访问指定目录
app.use('/node_modules/',express.static('./node_modules/'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))

app.listen(5000,function(){
    console.log('running...')
})

// 把路由容器挂载到app服务上
app.use(router)
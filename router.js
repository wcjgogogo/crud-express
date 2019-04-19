// 路由模块
// 根据不同请求处理路由

// 加载数据
var Student=require('./student')

// 专门用来包装路由
var express=require('express')

// 创建路由容器
var router=express.Router()

// 根路径，渲染学生列表
router.get('/',function(req,res){
    //调用者
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
            students:students
        })
    })
})

// 添加学生的页面
router.get('/new',function(req,res){
    res.render('new.html')
})

// 处理添加学生
router.post('/new',function(req,res){
    // 1、获取表单数据
    // 2、处理 将数据保存到db.json
    // 3、发送响应
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })
})

// 渲染学生编辑页面
router.get('/edit',function(req,res){
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

//处理编辑学生
router.post('/edit',function(req,res){
    // 1‘获取表单数据
    // 2、更新
    // 3、发送响应
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })
}) 

// 处理删除学生
router.get('/delete',function(req,res){
    //1、 获取要删除的id
    // 2、根据id执行删除操作
    // 3、相应数据
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })
})


// 导出router
module.exports=router
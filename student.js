// 数据操作文件模块，只处理数据，不关心业务

var fs=require('fs')

// 获取数据
var dbPath='./db.json'

// 获取学生列表（封装）
exports.find=function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        // 执行调用者指定的事情
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

// 添加保存学生
exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        // 获取学生
        var students=JSON.parse(data).students
        // 添加学生id(获取前面同学的id基础上加1)
        student.id=students[students.length-1].id+1
        // 将用户传递的对象保存到数组
        students.push(student)
        // 把对象数据转换为字符串
        var fileData=JSON.stringify({students:students})
        
        // 把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

// 根据id获取学生对象
exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        // 获取对象数组
        var students=JSON.parse(data).students
        var ret=students.find(function(item){
            return item.id==parseInt(id)
        })
        callback(null,ret)
    })
}

// 更新学生
exports.updateById=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        // 获取对象数组
        var students=JSON.parse(data).students
        student.id=parseInt(student.id)
        // 通过id获取要修改的对象
        var stu=students.find(function(item){
            return item.id==student.id
        })
        // 遍历拷贝对象
        for(var key in student){
            stu[key]=student[key]
        }
        // 把数据对象转换为字符串
        var fileData=JSON.stringify({students:students})
        // 把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

// 删除学生
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            callback(err)
        }
        // 获取对象数组
        var students=JSON.parse(data).students
        // 根据条件查找元素下标
        var deleteId=students.findIndex(function(item){
            return item.id==parseInt(id)
        })
        // 根据下标删除相应对象
        students.splice(deleteId,1)
        // 把对象转换成字符串
        var fileDate=JSON.stringify({students:students})
        // 把字符串保存到文件中
        fs.writeFile(dbPath,fileDate,function(err){
            if(err){
                callback(err)
            }
            callback(null)
        })
    })
}

module.exports = function(app) {
    //prehandle user
    app.post('/api/v1/auth', function (req, res) {
        console.log('收到认证')
        res.json({
            "msg": "success",
            "status": 200,
            "access_token": "thisismytoken"
        })
    })

    app.get('/api/v1/tasksdata', function(req, res) {
      console.log('收到taskdata请求')
      res.json({
        "msg": "success",
        "status": 200,
        "data": [
          {
            "title": "紫领网项目",
            "_id": "fjafjafaf",
            "total": 20,
            "data": [
              {
                "title": "前端调试",
                "_id": "fjafjafaf",
                "content": "【设计】网站ico，logo，版权声明尾部all right，faf",
                "created": "2016-09-11T03:59:39.787Z",
                "deadline": "2016-09-12T03:59:39.787Z",
                "priority": 1,
                "status": 0
              },
              {
                "title": "后端开发",
                "_id": "fjafjafaffsf",
                "content": "【设计】网站ico，logo，版权声明尾部all right，fadfaf",
                "created": "2016-09-11T03:59:39.787Z",
                "deadline": "2016-09-12T03:59:39.787Z",
                "priority": 1,
                "status": 1
              },
              {
                "title": "这我就不懂了这是为什么啊哈哈哈",
                "_id": "fjafjafllaffsf",
                "content": "【设计】网站ico，logo，版权声明尾部all right，fadfaf",
                "created": "2016-09-11T03:59:39.787Z",
                "deadline": "2016-09-12T03:59:39.787Z",
                "priority": 1,
                "status": 2
              }
            ]
          },
          {
            "title": "日常生活",
            "_id": "fjafjaffafaf",
            "total": 20,
            "data": [
              {
                "title": "早起吃早餐",
                "_id": "fjafjafaf",
                "content": "",
                "created": "2016-09-11T03:59:39.787Z",
                "deadline": "2016-09-12T03:59:39.787Z",
                "priority": 1,
                "status": 0
              },
              {
                "title": "出门买牛奶",
                "_id": "fafa",
                "content": "",
                "created": "2016-09-11T03:59:39.787Z",
                "deadline": "2016-09-12T03:59:39.787Z",
                "priority": 2,
                "status": 1
              }
            ]
          },
        ]
      })
    })
}

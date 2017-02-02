
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
}

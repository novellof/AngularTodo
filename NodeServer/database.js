
let mysql = require('mysql');


module.exports = {
    
    connectToDatabase: function(){
        var connection = mysql.createConnection({
            host: "novellotestdb.cegmthjt6sm8.us-east-2.rds.amazonaws.com",
            user: "root",
            password: "novello2",
            database: "novelloTestDB"
        })
    
        connection.connect(function(err) {
            if (err) throw err;
                //console.log("CONNECTED")
          });

          return connection
    },

    getAllData: function() {
        var sql = "SELECT * FROM todos" 
        return new Promise((resolve, reject)=>{
            this.connectToDatabase().query(sql,(err,result)=>{
                if(err) throw reject("Error getting user data")
                resolve(JSON.stringify(result))
            })
        })
    },
    getDataById: function(id) {
        var sql = `SELECT * FROM todos WHERE id = ${id}`
        return new Promise((resolve, reject)=>{
            this.connectToDatabase().query(sql,(err,result)=>{
                if(err) throw reject("Error getting user data")
                resolve(JSON.stringify(result))
            })
        })
    },
    deleteDataByID: function(id) {
        var sql = `DELETE FROM todos WHERE id = ${id}`
        return new Promise((resolve, reject)=>{
            this.connectToDatabase().query(sql,(err,result)=>{
                if(err) throw reject("Error getting user data")
                resolve(JSON.stringify(result))
            })
        })
    },
    markCompleteByID: function(id,completed){
        var sql = `UPDATE todos SET completed = ${completed} WHERE id = ${id}`
        this.connectToDatabase().query(sql,(err,result)=>{
            if(err) throw err
            
        })
    }
}


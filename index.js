var mysql = require('mysql');

var m_connection = Symbol('connection');

class MySQL {
    constructor(connection) {
        this[m_connection] = connection;
    }

    query(sql) {
        var self = this;
        return new Promise((resolve, reject) => {
            self[m_connection].query(sql, (error, data, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }                
            });
        });
    }

    execute(sql) {
        return this.query(sql);
    }

    close() {
        var self = this;
        return new Promise((resolve, reject) => {
            self[m_connection].end((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = {
    open: function(connection) {
        let base = mysql.createConnection({
            host: connection.Hostname || 'localhost',
            port: parseInt(connection.Port) || 3306,
            user: connection.Username,
            password: connection.Password,
            database: connection.Database
        })
        return new MySQL(base);
    }
};
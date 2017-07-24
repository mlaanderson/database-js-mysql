# database-js-mysql
MySQL wrapper for database-js
## About
Database-js-mysql is a wrapper around the [mysql](https://github.com/mysqljs/mysql) package by Doug Wilson. It is intended to be used with the [database-js](https://github.com/mlaanderson/database-js) package. However it can also be used in stand alone mode. The only reason to do that would be to use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
## Usage
### Stand Alone
~~~~
var mysql = require('database-js-mysql');

(async () => {
    let connection, rows;
    connection = mysql.open({
        Hostname: localhost,
        Port: 3306,
        Username: 'my_secret_username',
        Password: 'my_secret_password',
        Database: 'my_top_secret_database'
    });
    
    try {
        rows = await connection.query("SELECT * FROM tablea WHERE user_name = 'not_so_secret_user'");
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        await connection.close();
    }
})();
~~~~
### With Database-js
~~~~
var Database = require('database-js2');

(async () => {
    let connection, statement, rows;
    connection = new Database('database-js-mysql://my_secret_username:my_secret_password@localhost:3306/my_top_secret_database');
    
    try {
        statement = await connection.prepareStatement("SELECT * FROM tablea WHERE user_name = ?");
        rows = await statement.query('not_so_secret_user');
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        await connection.close();
    }
})();
~~~~
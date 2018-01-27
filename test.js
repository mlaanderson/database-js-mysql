var MySQL = require('.');


var Connection = MySQL.open({
    Hostname: 'localhost',
    Port: 3306,
    Username: 'travis',
    Database: 'test'
});

var promises = [];
promises.push(Connection.execute('DROP TABLE IF EXISTS test1; CREATE TABLE test1 (fl_name varchar(32), fl_value varchar(32));').then(() => {
    promises.push(Connection.execute("INSERT INTO test1 VALUES('name', 'Michael Anderson');").then(() => {
        promises.push(Connection.query("SELECT * FROM test1 WHERE fl_name = 'name';").then(data => {
            if (data.length != 1) {
                console.error('Invalid data returned');
                Connection.execute('DROP TABLE test1;').then(() => {
                    Connection.close().then(() => {
                        process.exit(1);
                    });
                })
            }
        }).catch(error => {
            console.error(error);
            process.exit(1);
        }));
    }).catch(error => {
        console.error(error);
        process.exit(1);
    }));
}).catch(error => {
    console.error(error);
    process.exit(1);
}));

Promise.all(promises).then(() => {
    Connection.execute('DROP TABLE IF EXISTS test1;').then(() => {
        Connection.close().then(() => {
            process.exit(0);
        });
    });
});

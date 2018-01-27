var MySQL = require('.');


var Connection = MySQL.open({
    Hostname: 'localhost',
    Port: 3306,
    Username: 'travis',
    Database: 'test'
});

(async function() {
    try {
        await Connection.execute('DROP TABLE IF EXISTS test1;');
        await Connection.execute('CREATE TABLE test1 (fl_name varchar(32), fl_value varchar(32));');
        await Connection.execute("INSERT INTO test1 VALUES('name', 'Michael Anderson');");
        let data = await Connection.query("SELECT * FROM test1 WHERE fl_name = 'name';")
        if (data.length != 1) {
            throw new Error("Invalid data returned");
        }
    } catch (error) {
        console.log("ERROR", error);
        process.exit(1);
    } finally {
        await Connection.execute('DROP TABLE IF EXISTS test1;');
        await Connection.close();
        process.exit(0);
    }
})();

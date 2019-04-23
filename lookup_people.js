const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name = $1;", [process.argv[2]], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        let count = 0; 
        result.rows.forEach(function (person) {
            let firstName = person.first_name;
            let lastName = person.last_name;
            let birthdate = person.birthdate;
            birthdate = birthdate.toString().split(' ').slice(0, 4).join(' '); 
            count += 1 
            console.log('- ' + count + ": " + firstName  + " " +  lastName + ", " + "born" + " " + birthdate )  
            
        })
        client.end();
    });
});
# Setup

## What you need

- A running [MariaDB](https://mariadb.com/downloads/)-Server
- [node.js](https://nodejs.org/) installed

## Steps to get started

1. Copy the `config.example.json` to `config.json`
2. Change the `config.json` to fit your needs (database user, password, etc.)
3. (You may need to create a new database schema und user for this to work if you have problems with SQL I would recommend to use a [GUI](https://mariadb.com/kb/en/library/graphical-and-enhanced-clients/) such as phpMyAdmin)
4. Run the command `npm i` which installs all dependencies
5. Now you can start your project with `npm start`

## Config explained

```
{
	"host": "0.0.0.0",              Hostname or address the server should run on
	"port": 3000,                   Port the server should run on
	"ssl": {                        
		"enabled": false,           If you want to use ssl
		"cert": null,               path to your ssl certificate
		"key": null                 path to your ssl key file
	},                              
	"database": {                   
		"host": "0.0.0.0",          Database's hostname or address
		"port": 3306,               Database's port
		"user": "ak18b",            User to connect with
		"password": "",             User's password
		"database": "ak18b",        Name of the schema to connect to
		"prefix": "ak18b_"          Prefix that should be appended to all tables
	}
}
```

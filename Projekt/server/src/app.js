const express = require('express');
const path = require('path');
const logger = require('morgan');
const mariadb = require('mariadb');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

module.exports = class {
	constructor(config) {
		this.config = config;
		this.initializeExpress();
		this.initializeDatabase();
	}
	initializeExpress() {
		this.app = express();

		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'public')));
		
		this.app.use('/', indexRouter);
		this.app.use('/users', usersRouter);
	}
	initializeDatabase() {
		const database = this.config.database;
		this.dbPool = mariadb.createPool({
			host: database.host,
			port: database.port,
			user: database.user,
			password: database.password,
			database: database.database,
		});
	}
	close() {
		this.dbPool.end();
	}
};

const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

module.exports = class {
	constructor(config) {
		this.app = express();
		this.config = config;

		this.initializeExpress();
		this.initializeMongo();
	}
	initializeExpress() {
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'public')));
		
		this.app.use('/', indexRouter);
		this.app.use('/users', usersRouter);
	}
	initializeMongo() {
		mongoose.connect(this.config.mongo, {
			useNewUrlParser: true
		}).catch(error => {
			console.error(error);
			throw error;
		});
	}
	close() {
		mongoose.disconnect();
	}
};

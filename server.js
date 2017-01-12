import http from 'http';
import Express from 'express';
import CORS from 'cors';
import BodyParser from 'body-parser';
import Chokidar from 'chokidar';
import Mongoose from 'mongoose';

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import ApiRoutes from './server/ApiRoutes';

import iH from './global/IdlewildHelpers'

let apiServer, apiExpress, apiRouter, apiWatch;
let dbServer;

let webpackConfig = require('./webpack.config.js');
let compiledWebpackConfig, clientServer, clientWatch;


function startApp() {

	startAPI();

	startClientServer();
}

function startClientServer() {

	compiledWebpackConfig = Webpack(webpackConfig);
	clientServer = new WebpackDevServer(compiledWebpackConfig);

	clientWatch = Chokidar.watch('./client');

	clientWatch.on('ready', () => {
		clientWatch.on('all', () => {
			
			console.log("[reload] Clearing client cache...")
			
			Object.keys(require.cache).forEach(function(id) {
				if (/\/client\//.test(id)) delete require.cache[id]
			})
		});
	});

	let port = process.env.PORT || 8080;

	clientServer.listen(port);
}

function startAPI() {

	startAPIServer();

	connectToDb();
	ApiRoutes(apiRouter);
}

function restartAPI() {

	dbServer.disconnect(); // is this async?
	apiWatch.close();
	apiServer.close(() => {
		startAPI();
	});
}

function startAPIServer() {

	apiExpress = new Express();
	apiRouter = new Express.Router();

	apiWatch = Chokidar.watch()
							.add('./server')
							.add('./server.js');

	apiWatch.on('ready', () => {
		apiWatch.on('all', () => {
			
			console.log("[reload] Restarting API Server...")

			Object.keys(require.cache).forEach(function(id) {

				if (/\/server\//.test(id)
					||
					/\/server.js/.test(id)
					) 
				{
					console.log('deleting',id);
					delete require.cache[id];
				}
			})

			restartAPI();
		});
	});

	apiExpress.use(CORS());
	apiExpress.use(BodyParser.urlencoded({extended: true}));
	apiExpress.use(BodyParser.json());

	let port = process.env.PORT || 8081;

	apiExpress.use('/api', apiRouter);

	apiServer = http.createServer(apiExpress);
	apiServer.listen(port);

	console.log('Idlewild API running at http://localhost:' + port + '/api');	
}

function connectToDb() {

	dbServer = Mongoose.connect('mongodb://localhost:27017/');
	Mongoose.Promise = global.Promise;
}

startApp();
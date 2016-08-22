'use strict';

const fs = require('fs');
const electron = require('electron');
const {app, remote,	Menu,	BrowserWindow} = electron;

// prevent certain things from being garbage collected
let mainWindow;
let rpcServer;
let storage;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	var opts = {
		title: 'Cerebral Electron Boilerplate',
		width: 1200,
		height: 600,
		minWidth: 500,
		minHeight: 200,
		acceptFirstMouse: true,
		//titleBarStyle: 'default',
		backgroundColor: '#000000',
		resizable: true,
		webPreferences: {
			nodeIntegration: true,
			java: false,
			javascript: true,
			webSecurity: false,
			allowDisplayingInsecureContent: false,
			allowRunningUnsecureContent: false,
			experimentalFeatures: true,
			subpixelFontScaling: true
		}
	};

	const win = new BrowserWindow(opts);

	rpcServer = require('./scripts/rpcServer')(win.webContents);
	const template = require('./scripts/menu')(rpcServer);
	var menu = Menu.buildFromTemplate(template);

	if (process.env.DEV) {
		win.loadURL('http://localhost:8000/dev.html'); // no Node context
		//win.loadURL(`file://${__dirname}/index.html`); // Node
		win.openDevTools();
	} else {
		win.loadURL(`file://${__dirname}/index.html`); // Node context
	}

	win.on('closed', onClosed);

	win.webContents.on('did-finish-load', function() {
		//
	})

	//be aware that this is nested!
	win.on('close', () => {
		rpcServer.destroy()
	});

	if (menu) {
		Menu.setApplicationMenu(menu);
		menu = null;
	}

	return win;
}

app.on('window-all-closed', () => {
	app.quit()
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	//BrowserWindow.removeDevToolsExtension('Cerebral Debugger')
	if (process.env.NODE_ENV !== 'production') { //this might not be right
		let installer = require('electron-devtools-installer').default
		installer('ddefoknoniaeoikpgneklcbjlipfedbb')
			.then((name) => console.log(`Added Extension:  ${name}`))
	    .catch((err) => console.log('An error occurred: ', err));
	}

	mainWindow = createMainWindow();

	if (process.env.DEV) {
		const watcher = require('./scripts/watcher.js');
		watcher.watch(app, ['./index.js', './scripts']);
	}
});

/* global __dirname, process */
//Electron includes
const electron = require("electron");
const APP = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

/**
 * URL for index.html which will be our entry point.
 */
const indexURL = url.format({
    pathname: path.join(__dirname, "windows", "jitsi-meet", "index.html"),
    protocol: "file:",
    slashes: true
});

/**
 * The window object that will load the iframe with Jitsi Meet.
 * IMPORTANT: Must be defined as global in order to not be garbage collected
 * acidentally.
 */
let jitsiMeetWindow = null;

/**
 * Sets the APP object listeners.
 */
function setAPPListeners () {
    APP.on("ready", createJitsiMeetWindow);
    APP.on("window-all-closed", () => {
        // Don"t quit the application for Mac OS
        if (process.platform !== "darwin") {
            APP.quit();
        }
    });
    APP.on("activate", () => {
        if (jitsiMeetWindow === null) {
            createJitsiMeetWindow();
        }
    });
}

/**
 * Opens new window with index.html(Jitsi Meet is loaded in iframe there).
 */
function createJitsiMeetWindow () {
    jitsiMeetWindow = new BrowserWindow({width: 800, height: 600});
    jitsiMeetWindow.loadURL(indexURL);

    jitsiMeetWindow.on("closed", () => {
        jitsiMeetWindow = null;
    });
}

//Start the application:
setAPPListeners();

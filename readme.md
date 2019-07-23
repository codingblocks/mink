(Prototype) Simple web interface for common Docker commands.

It allows for (highly insecure) streaming between the xtermjs panes and processes running on the server.

This is super dangerous, and you should never use it...but it's kinda cool.

![Screenshot of Mink](https://github.com/codingblocks/mink/blob/master/screenshot.PNG?raw=true)

This project is still in it's infancy, so not bothering to open tickets yet. Here is a rough outline of known issues and undones:

* Tabbing is funky
  * Doesn't check if the tab is already open
	* Doesn't open up the next tab when one is closed
* Can't have log/attach open for same container
* Any sort of testing
* Mac/Remote Docker support (currently windows only)
* Delete key doesn't work
* Any way to get auto-complete behavior?
* Processes should eventually timeout/reconnect
* Mac/Remote Docker support (currently windows only)


## Getting started:
```
# Install .net core 2.2+
# first time only:
cd ./ClientApp
npm install -g create-react-app
npm install
# Now copy .env.example over to .env and update the settings
```
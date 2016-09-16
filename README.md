# yelle
Deployd backend of project yelle.

Yelle is a project developed in [Fikrimuhal](http://fikrimuhal.com) Head Quarters. It allows the team to control air-conditioning system via slack messages.

This project is powered by [deployd](http://deployd.com). It's a very simple way to create an api for your iot and mobile projects.

## How to setup the environment?
Follow this guide to setup deployd to your ubuntu server:
https://medium.com/@orhan_safa/how-to-set-up-a-deployd-server-in-your-digitaloceans-droplet-fb847f86307b

After that you can copy `resources` folder from this repo and paste it to your deployd app folder.

The file `production.js` is for reference, if you follow the guide above you should have created your version of it already.

Lastly, yelle depends on dpd-event module. Go and install it from [here](https://github.com/deployd/dpd-event). Its very easy. 

## How to configure it?
* Put your slack token to `/resources/yelle/post.js`
* Update `production.js` to set your mongodb connection. (port, dbname, username, password)


## How it works?
There are two event resources and one collection resource in yelle:
* yelle (event)
* commands (collection)
* last-command (event)

#### yelle
When a `/yelle` command is given from slack, slack makes a post request to `your.domain.com/yelle`. In that endpoint, sits the `yelle` event resource. 

The text parameter, user and channel information are inside that request, and that data is saved to `commands` collection with a timestamp.

This endpoint validates the slack token so any third party call to this endpoint is not welcomed.

#### commands
Collection `commands` is blocked to access by BeforeRequest event unless it's an internal call. Meaning that you can only reach the collection from dashboard or event scripts.

All the commands made is stored in this collection. It's useful for debugging or analytics purposes.

#### last-command
The [yelle-remote](http://github.com/safaorhan/yelle-remote) listens this endpoint to control the air-conditioning system.

This endpoint gets the most recent entry in commands collection and generates a code that the remote controller understands. It's in the format: `TIMESTAMP_COMMAND_PARAMETER`.

This code is returned when `your.domain.com/last-command` is requested.


## How to make changes?

Once you set it up, you can go to `your.domain.com/dashboard` and edit event scripts there.

If it asks you a key (it should), you can navigate to your deployd app folder using ssh and run `dpd showkey` to get your key.

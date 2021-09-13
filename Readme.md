# A template application of the UD-Viz package

This repository holds a template (demonstration) application of the [UD-Viz](https://github.com/VCityTeam/UD-Viz)
JavaScript package. The goel of this template application is to

- illustrate the main features of [UD-Viz](https://github.com/VCityTeam/UD-Viz),
- provide code that demonstrates how such features can be configured/extended/embeded
  and eventually combined/integrated within a full autonomous application,
- illustrate the JavaScript ecosystem required for building and running it,
- be used as a template for creating/declining your own application.

Because thhis template application is fully functionnal maybe the simplest way to
understand what it does is to build it and run it.

## Pre-requisites for installing the template application

As for any JavaScript application, the central building/running tool is [npm (Node Package Manager)](https://en.wikipedia.org/wiki/Npm_(software)) whose installation process is OS dependent: 

* **Ubuntu**

  * Installation

    ```bash
    sudo apt-get install npm    ## Will pull NodeJS
    sudo npm install -g n     
    sudo n latest
    ```

  * References: [how can I update Nodejs](https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version), and [install Ubuntu](http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/#ubuntu-package-manager)

* **Windows**
  
  * Installing from the [installer](https://nodejs.org/en/download/)
  * Installing with the [CLI](https://en.wikipedia.org/wiki/Command-line_interface)

    ```bash
    iex (new-object net.webclient).downstring(‘https://get.scoop.sh’)
    scoop install nodejs
    ```

## Installing and running the template application

The template application can be locally (on your desktop) started in the following way
```
npm install
npm run debug      # integrates building
```
and then use your favorite (web) browser to open
`http://localhost:8000/`.

Note that technically the `npm run debug` command will use the [webpack-dev-server npm package](https://github.com/webpack/webpack-dev-server) that
 - runs node application that in turn launched a vanilla http sever in local (on your desktop) 
 - launches a watcher (surveying changes in sources)
 - in case of change that repacks an updated bundle
 - that triggers a client (hot) reload 

## Technical notes concerning the template application
Some modules used by the DemoFull require some server-side components to be installed on
some server (possibly your desktop). For example
 * the 3D objects (buildings) are (by default) serverd by a LIRIS server
   and thus require no specific configuratione there is nothing more to do
 * handling of documents will require you to [install the API_enhanced_city](https://github.com/VCityTeam/UD-Serv/blob/master/API_Enhanced_City/INSTALL.md).
 * you can also modify the [application configuration file](assets/config/config.json)

--- 
FIXME for the bottom of this page

## Making our UD-Viz demo application
The present `DemoFull` directory holds all the required elements constituting an independent JavaScript 
application (using among others the UD-Viz package).
It is thus a good example of what you need to provide in order to build a custom application
based on UD-Viz. 

##CLEAN ME

### Replicating DemoFull to your sandbox: the straigthforward strategy
A simple way of building such a custom application would be to copy the `DemoFull` directory
into your own sandbox repository and start customizing it.
The starting instructions thus boil down to

```bash
git clone https://github.com/VCityTeam/UD-Viz-demo.git
git clone MyDemoApp.git
cd MyDemoApp
cp -r ../UD-Viz-demo/DemoFull MyDemoApp
git commit
git push
```
and then proceed with customizing `MyDemoApp`.

The main entry point for this customization of this new `MyDemoApp` is the 
[BaseDemo.js file](https://github.com/VCityTeam/UD-Viz-demo/blob/master/DemoFull/src/Helpers/BaseDemo.js)
that you can
 * adapt in order to change e.g. the left sidedbar widgets (refer to the 
   [`_this.addModuleView(...)`](https://github.com/VCityTeam/UD-Viz-demo/blob/master/DemoFull/src/Helpers/BaseDemo.js#L76)
   calls),
 * extend with your own components/features

Then you can also adapt the 
[`assets/config/config.json`](https://github.com/VCityTeam/UD-Viz-demo/blob/master/DemoFull/assets/config/config.json)
configuration file that defines e.g.
 * links to the used `assets` for the icons, logos of your application,
 * the `extents` i.e. the geographical portion of the territory that will be displayed,
 * some default data streams used e.g.
    - the `background_image_layer` that define the terrain (through a [`WMS` (Web Mapping Service)](https://www.lib.ncsu.edu/gis/ogcwms) stream),
    - some 3d buildings (based on [3DTiles](https://github.com/CesiumGS/3d-tiles)) refer e.g. to the `3DTilesLayer` entry,
    - the default `camera` position within the scene,
    - ...

You can then proceed with build your `MyDemoApp` with exactly the same instructions 
as for the `DemoFull` demo that is
 * [install the dependencies](https://github.com/VCityTeam/UD-Viz-demo#installing-the-demo-applications)
 * [building and running the application](https://github.com/VCityTeam/UD-Viz-demo/blob/master/README.md#installing-demofull)

### When working with a docker container: the [`diff`](https://en.wikipedia.org/wiki/Diff) alternative strategy
If you demo is defined within a [docker container](https://en.wikipedia.org/wiki/Docker_(software)) then an alternative strategy
(to the complete replication of the DemoFull directory) consists in (within your `Dockerfile`)
 - cloning the UD-Viz-demo repository,
 - placing yourself (with [`WORKDIR`](https://docs.docker.com/engine/reference/builder/#workdir)) inside the `DemoFull` directory,
 - overwriting the `DemoFull` code with your partial customizations (e.g. just overwriting `BaseDemo.js` and the `config.json` files).

A example of this docker container based strategy can be found in the 
[DatAgora_PartDieu](https://github.com/VCityTeam/UD-Reproducibility/blob/master/Demos/DatAgora_PartDieu/)
demo as illustrated by the
[Dockerfile](https://github.com/VCityTeam/UD-Reproducibility/blob/master/Demos/DatAgora_PartDieu/ud-viz-context/Dockerfile#L28)
commands.


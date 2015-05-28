# rpi-socket-streaming
Code for my *[Taking photos with raspberry pi + socket.io]( http://irisschaffer.com/taking-photos-with-raspberry-pi-socket-io/)* tutorial.

This code makes it possible to stream photos taken on a raspberry pi in regular intervals to a remote server, using nodejs, socket-io and data-uris.
For more information about this repository and implementation details, please refer to the aforementioned [tutorial]( http://irisschaffer.com/taking-photos-with-raspberry-pi-socket-io/) and feel free to raise issues, or contact me via e-mail.

## How can I run the application?
If you want to use this code, and have nodejs set up on your raspberry pi, simply place the `client.html` somewhere on your pc and ssh into your pi. Next, clone this repo:

    $ git clone https://github.com/irisSchaffer/rpi-socket-streaming.git

Now change into the newly created directory and install all dependencies:

    $ cd rpi-socket-streaming/
    $ npm install

You might have to change line 2 and 3 of the application's configuration `config.json` and replace the ip-address restriction and the port socket-io is connecting over by the ones you want to use:

    "port": [app port], // e.g. 9999
    "client-host": "[your pc's ip]", // e.g. 192.168.0.*

Don't forget to also change the socket connection in `client.html` (line 54 and 56) accordingly:

    <script src="http://[pi's ip]:[app port]/socket.io/socket.io.js"></script>
    var socket = io.connect('http://[pi's ip]:[app port]');
  
To start the application, you can now run `node index.js` on the raspberry pi, open `client.html` locally in your browser and click the `Start Stream` button.

*Happy Streaming!*



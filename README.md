# JATE (Just Another Text Editor) PWA
JATE is a Progressive Web Application (PWA) text editor that allows users to create and save notes or code snippets with or without an internet connection. The application uses IndexedDB for local data storage and features redundancy measures to ensure data persistence. The application is also offline-capable and can be installed as a PWA on desktop or mobile devices.

## Getting Started
To get started with the application, clone the repository and navigate to the root directory:

```
git clone https://github.com/ptrcao/19-PWA-02-Challenge.git
```
Next, install the required dependencies by running:

```
npm install
```

## Running the Application
To run the application, use the following command:

```
npm run start
```

This will build the dist files, start up the backend server and serve the client.

Building in this case involves bundling the JavaScript files using webpack and generating a HTML file, service worker, and manifest file.


## Technical Acceptance Criteria

The JATE PWA satisfies all of the following technical acceptance criteria:

* Uses IndexedDB to create an object store and includes both GET and PUT methods
* The application works without an internet connection
* Automatically saves content inside the text editor when the DOM window is unfocused
* Bundled with webpack
* Create a service worker with workbox that caches static assets
* The application should use babel in order to use async/await
* Application generates a manifest.json using the WebpackPwaManifest plug-in
* Can be installed as a Progressive Web Application

## Usage
When the text editor is opened, an IndexedDB database storage is immediately created. Any content entered into the text editor will be automatically saved to the database when the DOM window is unfocused. When the text editor is reopened, the saved content will be retrieved from the IndexedDB database.

Users can also install the text editor as a PWA by clicking on the Install button. This will download the application as an icon on their desktop and register a service worker using Workbox. The static assets are pre-cached upon loading along with subsequent pages and static assets, making the application offline-capable.
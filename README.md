# Monaco Editor with Extra Libraries

This project demonstrates how to set up Monaco Editor with extra libraries loaded, enabling IntelliSense for those libraries within the editor.

## Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/example/monaco-editor-extra-libs.git
cd monaco-editor-extra-libs
npm install
```

## Configuration
In order to load extra libraries into Monaco Editor, you need to define the libraries you want to load in the webpack.config.js file. The typesToUse variable should contain an array of objects specifying the path from where to load the type definitions and where to copy them to in the output directory.

Example:

```javascript
const typesToUse = [
  { from: 'node_modules/@types/lodash', to: 'lodash' },
];
```

## Usage
After installing dependencies and configuring the project, you can build and run the project using the following npm scripts:

- `npm run build`: Build the project for production.
- `npm run build:dev`: Build the project for development.
- `npm run watch`: Watch for changes and rebuild the project automatically.
- `npm run serve`: Start a development server to serve the project.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

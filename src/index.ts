import './index.css';
import * as monaco from "monaco-editor";

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

async function loadDtsFiles() {
  const dtsFiles = await (await fetch("./dts-files.json")).json();
  return Promise.all(
    dtsFiles.map(async filePath => {
      const content = await (await fetch(`./${filePath}`)).text();
      return {
        filePath, content,
      }
    })
  ); 
}

async function setExtraLibs() {
  const extraLibs = await loadDtsFiles();
  monaco.languages.typescript.typescriptDefaults.setExtraLibs(
    extraLibs.map(extraLib => ({
      ...extraLib,
      filePath:   monaco.Uri.file(`./${extraLib.filePath}`)
    }))
  );
}

function createMonacoInstance() {
  let model = monaco.editor.createModel("", "typescript", monaco.Uri.file("./index.ts"));
  monaco.editor.create(document.body, { model });
}

  
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
});
createMonacoInstance();
setExtraLibs();

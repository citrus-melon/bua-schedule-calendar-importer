import './app.css'
import App from './App.svelte'

import * as pdfjs from "pdfjs-dist";
import pdfjsWorkerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;

const app = new App({
  target: document.getElementById('app')
})

export default app

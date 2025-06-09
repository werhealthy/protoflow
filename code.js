"use strict";
// ProtoFlow main plugin logic ported from code.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 400, height: 590 });
const HAVAS_LOGO = "data:image/png;base64," + "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" +
    "AFxR/pxyMYH0uAzXozvYllDZU+0E";
function isValidReaction(r) {
    return r.action && r.action.type === 'NODE' && r.action.destinationId;
}
function isBlockingAction(action) {
    return action && action.type && action.type !== 'NODE';
}
function getAllFrames(nodes) {
    const map = {};
    for (const n of nodes) {
        if (n.type === 'FRAME')
            map[n.id] = n;
    }
    return map;
}
function getHotspotsForFrame(frame, allFramesMap, warnings, selectedFrameIds) {
    const hs = [];
    const parentBBox = frame.absoluteBoundingBox;
    if (!parentBBox)
        return hs;
    const nodesToCheck = [
        frame,
        ...frame.findAll((n) => n.reactions && Array.isArray(n.reactions)),
    ];
    for (const node of nodesToCheck) {
        const bbox = node.absoluteBoundingBox;
        if (!bbox)
            continue;
        for (const r of node.reactions || []) {
            if (isBlockingAction(r.action)) {
                warnings.push({ frame: frame.name, action: r.action.type, level: 'error' });
                continue;
            }
            if (r.action && r.action.destinationId) {
                const target = allFramesMap[r.action.destinationId];
                if (!selectedFrameIds.has(r.action.destinationId)) {
                    warnings.push({
                        frame: frame.name,
                        action: 'Collegamento a frame non selezionato',
                        level: 'warn',
                    });
                    continue;
                }
                hs.push({
                    x: bbox.x - parentBBox.x,
                    y: bbox.y - parentBBox.y,
                    width: bbox.width,
                    height: bbox.height,
                    target: target.name,
                });
            }
        }
    }
    return hs;
}
function notifyUIWithCurrentSelection() {
    const selection = figma.currentPage.selection;
    const frames = selection.filter((n) => n.type === 'FRAME');
    const selectedFrameIds = new Set(frames.map((f) => f.id));
    const allFrames = figma.currentPage.findAll((n) => n.type === 'FRAME');
    const allFramesMap = getAllFrames(allFrames);
    const warnings = [];
    for (const frame of frames) {
        getHotspotsForFrame(frame, allFramesMap, warnings, selectedFrameIds);
    }
    figma.ui.postMessage({
        type: 'selection-info',
        framesCount: frames.length,
        warnings,
        frames: frames.map((f) => ({ id: f.id, name: f.name })),
    });
}
figma.on('selectionchange', notifyUIWithCurrentSelection);
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'get-selection') {
        notifyUIWithCurrentSelection();
        return;
    }
    if (msg.type === 'proceed-export') {
        const namePrefix = msg.name || 'protoflow';
        const selectedHomeId = msg.selectedHomeId;
        const selection = figma.currentPage.selection;
        const frames = selection.filter((n) => n.type === 'FRAME');
        const selectedFrameIds = new Set(frames.map((f) => f.id));
        const allFramesMap = getAllFrames(figma.currentPage.findAll((n) => n.type === 'FRAME'));
        frames.sort((a, b) => a.name.localeCompare(b.name));
        const framesExport = [];
        const htmls = [];
        const homeFrame = frames.find((f) => f.id === selectedHomeId) || frames[0];
        const homeName = homeFrame.name.replace(/\s+/g, '-').toLowerCase();
        for (let index = 0; index < frames.length; index++) {
            figma.ui.postMessage({ type: 'progress', current: index, total: frames.length });
            const node = frames[index];
            const name = node.name.replace(/\s+/g, '-').toLowerCase();
            const prevName = index > 0 ? frames[index - 1].name.replace(/\s+/g, '-').toLowerCase() + '.html' : '#';
            const nextName = index < frames.length - 1 ? frames[index + 1].name.replace(/\s+/g, '-').toLowerCase() + '.html' : '#';
            const imgData = yield node.exportAsync({ format: 'PNG' });
            const hs = getHotspotsForFrame(node, allFramesMap, [], selectedFrameIds);
            const imgPath = `${name}.png`;
            const html = buildHTML(imgPath, name, hs, prevName, nextName, `${homeName}.html`);
            framesExport.push({
                name: `screens/${name}`,
                bytes: figma.base64Encode(imgData),
            });
            htmls.push({
                name: `screens/${name}.html`,
                content: html,
            });
        }
        const homeHtml = htmls.find((h) => h.name === `screens/${homeName}.html`);
        if (homeHtml) {
            const fixedContent = homeHtml.content.replace(/src="screens\/([^" ]+)\.png"/g, 'src="screens/$1.png"');
            const rawHomeHtml = htmls.find((h) => h.name === `screens/${homeName}.html`);
            if (rawHomeHtml) {
                const fixedHtml = rawHomeHtml.content
                    .replace(/href="(?!https?:\/\/)([^" ]+\.html)"/g, 'href="screens/$1"')
                    .replace(/src="(?!https?:\/\/)([^" ]+\.png)"/g, 'src="screens/$1"');
                htmls.push({ name: 'start.html', content: fixedHtml });
            }
        }
        htmls.push({
            name: 'README.txt',
            content: `╔══════════════════════════════════════╗
╚══════════════════════════════════════╝

Grazie per aver esportato il tuo prototipo con ProtoFlow.

All'interno del pacchetto ZIP troverai:

• start.html
  → È il punto di partenza scelto nel plugin.
    Aprilo con un browser per visualizzare il flusso.

• screens/
  → Contiene tutte le schermate PNG ed i relativi HTML.
    Puoi esplorare e iniziare da qualsiasi punto anche da qui.

ISTRUZIONI:
──────────────────────────────────────
– Clicca sui punti cliccabili per navigare tra le schermate.
– Usa la barra in basso per navigare avanti/indietro.
– Il pulsante "home" ti riporterà sempre alla schermata iniziale (start.html).
– Funziona offline. Basta un browser moderno (es. Chrome, Edge, Firefox).

⚠️  ATTENZIONE – NON MODIFICARE:
──────────────────────────────────────
✘ NON rinominare la cartella 'screens'
  → I collegamenti HTML e le immagini smetteranno di funzionare.

✘ NON cambiare i nomi dei file PNG o HTML generati
  → Gli hotspot e i link interni puntano a quei nomi precisi.

✘ NON spostare i file fuori dalle loro posizioni
  → Ogni riferimento è relativo e organizzato per lavorare così com’è.

Se hai bisogno di modificare layout o contenuti, ti consigliamo di riesportare
il prototipo da Figma con ProtoFlow.

──────────────────────────────────────
Creato con ❤️ da Francesco Cerisano (Havas Milan)`,
        });
        figma.ui.postMessage({
            type: 'zip-data',
            zipName: namePrefix,
            frames: framesExport,
            htmls: htmls,
        });
    }
});
function buildHTML(imgPath, title, hotspots, prev, next, homeHref) {
    const hsDivs = hotspots
        .map((h) => {
        const link = `${h.target.replace(/\s+/g, '-').toLowerCase()}.html`;
        return `<a class="hs" data-x="${h.x}" data-y="${h.y}" data-w="${h.width}" data-h="${h.height}" href="${link}"></a>`;
    })
        .join('');
    const count = hotspots.length;
    const word1 = count === 1 ? 'punto' : 'punti';
    const word2 = count === 1 ? 'cliccabile' : 'cliccabili';
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 100vw; height: 100vh; background: #000; font-family: sans-serif; color: #fff; overflow: hidden; }
      #c { position: absolute; top: 0; left: 0; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh; }
      #c img { object-fit: contain; max-width: 100%; max-height: 100%; }
      .hs { position: absolute; display: block; background: transparent; cursor: pointer; z-index: 2; }
      .pulse { position: absolute; background: #ffe; opacity: 0.5; animation: fade 0.8s ease-out; z-index: 1; }
      .bar { position: absolute; bottom: 0; width: 100vw; color: #fff; }
      .bar-main { min-height: 72px; background: #1c1c1e; display: flex; align-items: center; justify-content: center; padding: 16px 24px; font-size: 14px; border-top-left-radius: 12px; border-top-right-radius: 12px; gap: 20px; box-shadow: 0 -2px 6px rgba(0,0,0,0.4); position: relative; }
      .bar-handle { position: absolute; top: -24px; left: 50%; transform: translateX(-50%); width: 48px; height: 24px; background: #1c1c1e; border-radius: 8px 8px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 8px; cursor: pointer; box-shadow: 0 -2px 6px rgba(0,0,0,0.4); }
      .bar-handle svg { transition: transform 0.2s; color: #fff; }
      .bar-hidden .bar-main { display: none; }
      .bar-hidden .bar-handle svg { transform: rotate(180deg); }
      .bar .home img { filter: invert(1); height: 18px; }
      .nav-link { color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; }
      .nav-link svg { transition: transform 0.2s; }
      .nav-link.prev svg { transform: rotate(90deg); }
      .nav-link.next svg { transform: rotate(-90deg); }
      .made-by { position: absolute; right: 24px; display: flex; align-items: center; gap: 4px; font-size: 12px; color: #fff; }
      .made-by img { height: 18px; filter: invert(1); }
      @keyframes fade { 0% { opacity: 0.7; } 100% { opacity: 0; } }
    </style>
  </head>
  <body>
    <div id="c"><img id="im" src="${imgPath}" /></div>
    ${hsDivs}
    <div id="bar" class="bar">
      <div class="bar-handle" onclick="toggleBar()">
        <svg id="toggle-arrow" width="12" height="8" viewBox="0 0 12 8">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div id="bar-main" class="bar-main">
        <a class="home" href="${homeHref}"><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" /></a>
        <a href="${prev}" class="nav-link prev"><svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <button onclick="flashHotspots()" style="background:none;border:1px solid #fff;border-radius:16px;padding:4px 12px;color:#fff;">
          ${count} ${word1} ${word2}
        </button>
        <a href="${next}" class="nav-link next"><svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <div class="made-by">made by <img src="${HAVAS_LOGO}" alt="Havas logo" /></div>
      </div>
    </div>
    <script>
      var im=document.getElementById('im');
      var BAR_HEIGHT=72;
      var barShown=true;var container=document.getElementById('c');
      function resizeContent(){
        var vh=window.innerHeight-(barShown?BAR_HEIGHT:0),vw=window.innerWidth,
        r=Math.min(vw/im.naturalWidth,vh/im.naturalHeight),imgW=im.naturalWidth*r,imgH=im.naturalHeight*r;
        im.style.width=imgW+'px';im.style.height=imgH+'px';
        var offsetX=(vw-imgW)/2,offsetY=(vh-imgH)/2,hs=document.getElementsByClassName('hs');
        for(var i=0;i<hs.length;i++){
          var d=hs[i];
          d.style.left=parseFloat(d.dataset.x)*r+offsetX+'px';
          d.style.top=parseFloat(d.dataset.y)*r+offsetY+'px';
          d.style.width=parseFloat(d.dataset.w)*r+'px';
          d.style.height=parseFloat(d.dataset.h)*r+'px';
        }
        container.style.height=vh+'px';
      }
      im.onload=resizeContent;window.onresize=resizeContent;
      function toggleBar(){
        barShown=!barShown;
        document.body.classList.toggle('bar-hidden',!barShown);
        resizeContent();
      }
      function flashHotspots(){
        var hs=document.getElementsByClassName('hs');
        for(var i=0;i<hs.length;i++){
          var d=hs[i];
          var p=document.createElement('div');
          p.className='pulse';
          p.style.left=d.style.left;p.style.top=d.style.top;
          p.style.width=d.style.width;p.style.height=d.style.height;
          document.body.appendChild(p);
          setTimeout(function(e){return function(){document.body.removeChild(e)}}(p),800);
        }
      }
    </script>
  </body>
</html>`;
}

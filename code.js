figma.showUI(__html__, { width: 400, height: 590 });

function isValidReaction(r) {
  return r.action && r.action.type === 'NODE' && r.action.destinationId;
}

function isBlockingAction(action) {
  return action && action.type && action.type !== 'NODE';
}

function getAllFrames(nodes) {
  const map = {};
  for (const n of nodes) {
    if (n.type === 'FRAME') map[n.id] = n;
  }
  return map;
}

function getHotspotsForFrame(frame, allFramesMap, warnings, selectedFrameIds) {
  const hs = [];
  const parentBBox = frame.absoluteBoundingBox;
  if (!parentBBox) return hs;

  // 🔴 1. Aggiungi il frame stesso come nodo da controllare
  const nodesToCheck = [frame, ...frame.findAll(n => n.reactions && Array.isArray(n.reactions))];

  for (const node of nodesToCheck) {
    const bbox = node.absoluteBoundingBox;
    if (!bbox) continue;

    for (const r of node.reactions || []) {
      if (isBlockingAction(r.action)) {
        warnings.push({ frame: frame.name, action: r.action.type, level: 'error' });
        continue;
      }

      if (r.action && r.action.destinationId) {
        const target = allFramesMap[r.action.destinationId];

        if (!selectedFrameIds.has(r.action.destinationId)) {
          warnings.push({ frame: frame.name, action: 'Collegamento a frame non selezionato', level: 'warn' });
          continue;
        }

        hs.push({
          x: bbox.x - parentBBox.x,
          y: bbox.y - parentBBox.y,
          width: bbox.width,
          height: bbox.height,
          target: target.name
        });
      }
    }
  }

  return hs;
}


function notifyUIWithCurrentSelection() {
  const selection = figma.currentPage.selection;
  const frames = selection.filter(n => n.type === "FRAME");
  const selectedFrameIds = new Set(frames.map(f => f.id));
  const allFrames = figma.currentPage.findAll(n => n.type === "FRAME");
  const allFramesMap = getAllFrames(allFrames);
  const warnings = [];

  for (const frame of frames) {
    getHotspotsForFrame(frame, allFramesMap, warnings, selectedFrameIds);
  }

  figma.ui.postMessage({
    type: 'selection-info',
    framesCount: frames.length,
    warnings,
    frames: frames.map(f => ({ id: f.id, name: f.name }))
  });
}

figma.on("selectionchange", notifyUIWithCurrentSelection);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'get-selection') {
    notifyUIWithCurrentSelection();
    return;
  }

  if (msg.type === 'proceed-export') {
    const namePrefix = msg.name || 'protoflow';
    const selectedHomeId = msg.selectedHomeId;

    const selection = figma.currentPage.selection;
    const frames = selection.filter(n => n.type === 'FRAME');
    const selectedFrameIds = new Set(frames.map(f => f.id));
    const allFramesMap = getAllFrames(figma.currentPage.findAll(n => n.type === 'FRAME'));

    frames.sort((a, b) => a.name.localeCompare(b.name));

    const framesExport = [];
    const htmls = [];

    const homeFrame = frames.find(f => f.id === selectedHomeId) || frames[0];
    const homeName = homeFrame.name.replace(/\s+/g, '-').toLowerCase();

    for (let index = 0; index < frames.length; index++) {
      figma.ui.postMessage({ type: 'progress', current: index, total: frames.length });

      const node = frames[index];
      const name = node.name.replace(/\s+/g, '-').toLowerCase();
      const prevName = index > 0 ? frames[index - 1].name.replace(/\s+/g, '-').toLowerCase() + '.html' : '#';
      const nextName = index < frames.length - 1 ? frames[index + 1].name.replace(/\s+/g, '-').toLowerCase() + '.html' : '#';

      const imgData = await node.exportAsync({ format: 'PNG' });
      const hs = getHotspotsForFrame(node, allFramesMap, [], selectedFrameIds);

      const imgPath = `${name}.png`;  // perché verrà messo dentro screens/
      const html = buildHTML(imgPath, name, hs, prevName, nextName, `${homeName}.html`);


      framesExport.push({
        name: `screens/${name}`,
        bytes: figma.base64Encode(imgData)
      });

      htmls.push({
        name: `screens/${name}.html`,
        content: html
      });


          } // fine for loop

      const homeHtml = htmls.find(h => h.name === `screens/${homeName}.html`);
      if (homeHtml) {
        const fixedContent = homeHtml.content.replace(
          /src="screens\/([^"]+)\.png"/g,
          'src="screens/$1.png"'
        );
        const rawHomeHtml = htmls.find(h => h.name === `screens/${homeName}.html`);
        if (rawHomeHtml) {
         const fixedHtml = rawHomeHtml.content
          // 🔁 Fixa solo href="xyz.html" che NON iniziano con 'http'
          .replace(/href="(?!https?:\/\/)([^"]+\.html)"/g, 'href="screens/$1"')
          // 🔁 Fixa solo src="xyz.png" che NON iniziano con 'http'
          .replace(/src="(?!https?:\/\/)([^"]+\.png)"/g, 'src="screens/$1"');


          htmls.push({
            name: "start.html",
            content: fixedHtml
          });
        }

      }
      htmls.push({
        name: "README.txt",
        content:
      `╔══════════════════════════════════════╗
      ║      PROTOFLOW – OFFLINE PROTOTYPE  ║
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
      Creato con ❤️ da Francesco Cerisano (Havas Milan)`
      });


      figma.ui.postMessage({
        type: 'zip-data',
        zipName: namePrefix,
        frames: framesExport,
        htmls: htmls
      });

    } // fine if msg.type === 'proceed-export'
};  // chiusura figma.ui.onmessage


function buildHTML(imgPath, title, hotspots, prev, next, homeHref) {
  const hsDivs = hotspots.map(h => {
    const link = `${h.target.replace(/\s+/g, '-').toLowerCase()}.html`;
    return `<a class="hs" data-x="${h.x}" data-y="${h.y}" data-w="${h.width}" data-h="${h.height}" href="${link}"></a>`;
  }).join('');

  const count = hotspots.length;
  const word1 = count === 1 ? 'punto' : 'punti';
  const word2 = count === 1 ? 'cliccabile' : 'cliccabili';

  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100vw;height:100vh;background:#000;font-family:sans-serif;color:#fff;overflow:hidden;}
#c{position:absolute;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100vw;height:100vh;}
#c img{object-fit:contain;max-width:100%;max-height:100%;}
.hs{position:absolute;display:block;background:transparent;cursor:pointer;z-index:2;}
.pulse{position:absolute;background:#ffe;opacity:0.5;animation:fade 0.8s ease-out;z-index:1;}
.bar{position:absolute;bottom:0;height:56px;width:100vw;background:#2a2a2a;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:13px;}
.bar .home img,.bar .arrows{filter:invert(19%) sepia(92%) saturate(6550%) hue-rotate(-10deg);height:18px;}
@keyframes fade {0%{opacity:0.7;}100%{opacity:0;}}</style></head>
<body>
<div id="c"><img id="im" src="${imgPath}"/></div>
${hsDivs}
<div class="bar">
<a class="home" href="${homeHref}"><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"/></a>
<button onclick="flashHotspots()" style="background:none;border:1px solid #fff;border-radius:16px;padding:4px 12px;color:#fff;">
${count} ${word1} ${word2}</button>
<div class="arrows"><a href="${prev}">◀</a> <a href="${next}">▶</a></div>
</div>
<script>
var im=document.getElementById("im");
im.onload=function(){
var vw=window.innerWidth,vh=window.innerHeight-56,r=Math.min(vw/im.naturalWidth,vh/im.naturalHeight),
imgW=im.naturalWidth*r,imgH=im.naturalHeight*r;
im.style.width=imgW+"px";im.style.height=imgH+"px";
var offsetX=(vw-imgW)/2,offsetY=(vh-imgH)/2,hs=document.getElementsByClassName("hs");
for(var i=0;i<hs.length;i++){
var d=hs[i];
d.style.left=parseFloat(d.dataset.x)*r+offsetX+"px";
d.style.top=parseFloat(d.dataset.y)*r+offsetY+"px";
d.style.width=parseFloat(d.dataset.w)*r+"px";
d.style.height=parseFloat(d.dataset.h)*r+"px";}
};
function flashHotspots(){
var hs=document.getElementsByClassName("hs");
for(var i=0;i<hs.length;i++){
var d=hs[i];
var p=document.createElement("div");
p.className="pulse";
p.style.left=d.style.left;p.style.top=d.style.top;
p.style.width=d.style.width;p.style.height=d.style.height;
document.body.appendChild(p);
setTimeout(function(e){return function(){document.body.removeChild(e)}}(p),800);}}
</script></body></html>`;
}

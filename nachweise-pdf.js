<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Meine Nachweise · VE-Log</title>
<style>
:root{--brand:#8e2f2b;--ink:#232735;--muted:#727785;--line:#e8e9ee;--bg:#f5f6f8}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}a{color:inherit;text-decoration:none}button,input,select{font:inherit}button{cursor:pointer}[hidden]{display:none!important}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #bd7774;outline-offset:3px}.sidebar{position:fixed;inset:0 auto 0 0;width:230px;padding:28px 18px;background:white;border-right:1px solid var(--line);display:flex;flex-direction:column}.brand{padding:0 12px 28px;display:grid;gap:8px}.brand img{max-width:130px;max-height:62px;object-fit:contain}.wordmark{font-size:28px;font-weight:850;color:var(--brand)}.brand small,.nav-label{font-size:9px;letter-spacing:1.5px;color:var(--muted)}.nav-label{padding:10px 14px}.nav{display:grid;gap:7px}.nav a{padding:12px 14px;border-radius:10px;color:#626675}.nav a:hover{background:#f5f6f8}.nav a.active{background:#f7eae9;color:var(--brand);font-weight:700}.side-note{margin-top:auto;padding:18px 12px 0;border-top:1px solid var(--line);color:var(--muted);font-size:11px}.shell{margin-left:230px}.topbar{height:78px;padding:0 36px;background:white;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:12px}.topbar span{color:var(--muted)}main{max-width:1350px;margin:auto;padding:34px 36px}.eyebrow{font-size:10px;font-weight:750;letter-spacing:1.7px;color:var(--brand)}h1{font-size:32px;letter-spacing:-1px;margin:6px 0}h2{font-size:18px;margin:0}p{margin:0}.muted{color:var(--muted)}.intro{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px}.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 15px;border:1px solid var(--line);border-radius:10px;background:white;color:var(--ink);font-weight:650;font-size:12px}.btn.primary{background:var(--brand);border-color:var(--brand);color:white}.btn:disabled{opacity:.5;cursor:default}.notice{padding:14px 18px;border:1px solid var(--line);border-radius:12px;background:white;margin-bottom:20px;font-size:13px}.notice.error{border-color:#d98b83;background:#fff4f2;color:#8e2f2b}.notice a{text-decoration:underline}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:22px}.stat{border:1px solid var(--line);border-radius:16px;background:white;padding:19px 22px}.stat span{color:var(--muted);font-size:12px}.stat strong{display:block;font-size:29px;margin:8px 0 2px;letter-spacing:-.5px}.stat small{color:var(--muted);font-size:11px}.panel{background:white;border:1px solid var(--line);border-radius:18px;overflow:hidden}.panel-head{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 24px;border-bottom:1px solid var(--line)}.filters{display:grid;grid-template-columns:minmax(180px,2fr) 1fr 1fr;gap:12px;padding:18px 24px;background:#fcfcfd}.filters label{display:grid;gap:5px;font-size:11px;color:var(--muted)}.filters input,.filters select{min-width:0;width:100%;padding:10px 12px;background:white;color:var(--ink);border:1px solid var(--line);border-radius:9px}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;text-align:left}th{font-size:10px;letter-spacing:.7px;text-transform:uppercase;color:var(--muted);background:#fafafb}th,td{padding:16px 24px;border-bottom:1px solid var(--line);vertical-align:middle}td{font-size:12px}td strong{display:block;font-size:13px}td small{display:block;color:var(--muted);margin-top:3px}.pill{display:inline-block;background:#fff2dc;color:#93651f;border-radius:7px;padding:4px 9px;font-size:10px;white-space:nowrap}.pill.sent{background:#edf2fc;color:#42689b}.type{display:inline-flex;align-items:center;gap:9px}.type-icon{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#f7eae9;color:var(--brand);font-size:15px}.empty{padding:48px 24px;text-align:center}.empty .type-icon{margin:0 auto 14px;width:48px;height:48px;font-size:23px}.empty h3{margin:8px 0;font-size:17px}.empty p{font-size:13px;color:var(--muted);max-width:520px;margin:auto}.empty a{margin-top:18px}.pager{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:16px 24px;color:var(--muted);font-size:12px}.pager div{display:flex;gap:8px}.foot{display:flex;justify-content:space-between;gap:16px;font-size:11px;color:var(--muted);margin-top:22px}dialog{border:1px solid var(--line);border-radius:18px;padding:0;width:min(800px,calc(100% - 28px));max-height:90vh;color:var(--ink)}dialog::backdrop{background:#171c2c70}.detail-head{position:sticky;top:0;background:white;display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding:22px 24px;border-bottom:1px solid var(--line)}.detail-body{padding:24px}.detail-meta{display:flex;flex-wrap:wrap;gap:10px;color:var(--muted);font-size:12px;margin-bottom:22px}.detail-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.details-list{margin:0;display:grid;gap:12px}.details-list>div{padding:12px 14px;border:1px solid var(--line);border-radius:9px}.details-list dt{font-size:11px;color:var(--muted);margin-bottom:4px}.details-list dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px}.details-list table td,.details-list table th{padding:8px 10px;text-transform:none;letter-spacing:0}.detail-label{font-size:13px;margin:16px 0 10px}.detail-id{font-size:10px;color:var(--muted);overflow-wrap:anywhere}.skip{position:absolute;top:-100px;left:20px;background:white;padding:12px;z-index:10}.skip:focus{top:10px}
@media(max-width:1000px){.sidebar{width:205px}.shell{margin-left:205px}main{padding:26px 22px}.topbar{padding:0 22px}th,td{padding:14px 16px}}
@media(max-width:760px){.sidebar{position:static;width:100%;padding:16px;border-right:0;border-bottom:1px solid var(--line)}.brand{padding:0 6px 14px}.brand img{max-height:43px}.nav-label,.side-note{display:none}.nav{display:flex;overflow:auto;gap:6px}.nav a{padding:9px 10px;font-size:12px;white-space:nowrap}.shell{margin:0}.topbar{height:60px;padding:0 18px}main{padding:24px 16px}.intro{align-items:flex-start;flex-direction:column;gap:14px}h1{font-size:28px}.stats{gap:9px}.stat{padding:14px}.stat strong{font-size:25px}.stat small{display:none}.filters{grid-template-columns:1fr 1fr;padding:16px}.filters label:first-child{grid-column:1/-1}.panel-head{padding:18px 16px}.foot{flex-wrap:wrap}.pager{padding:16px;flex-wrap:wrap}.detail-head,.detail-body{padding:18px}}
@media print{body>*{display:none!important}body>.shell{display:block!important}.shell>*{display:none!important}.shell>dialog[open]{display:block!important;position:static;width:100%;max-height:none;border:0;margin:0;overflow:visible}.detail-actions,.detail-head button,#pdfStatus,#pdfHint{display:none!important}.detail-head{position:static}.details-list>div{break-inside:avoid}body{background:white}.shell{margin:0}}

.selection-bar{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:14px 24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fafafb}.selection-bar span{font-size:12px;color:var(--muted)}.select-cell{width:48px;padding-right:8px}input[type=checkbox]{width:18px;height:18px;accent-color:var(--brand);cursor:pointer}.row-actions{display:flex;flex-wrap:wrap;gap:7px;min-width:300px}.row-actions .btn{min-height:36px;padding:8px 11px}.btn.danger{color:#8e2f2b;border-color:#dfaaa5;background:#fff8f7}.btn[aria-disabled=true]{opacity:.5;cursor:default}.row-selected{background:#fff8f7}@media(max-width:760px){.selection-bar{padding:14px 16px}.row-actions{min-width:250px}}@media print{.selection-bar,#actionStatus{display:none!important}}
</style>
</head>
<body>
<a class="skip" href="#main">Zum Inhalt</a>
<aside class="sidebar"><a class="brand" href="dashboard.html"><img id="brandLogo" src="logo.png" alt="VE-Log"><span class="wordmark" id="brandFallback" hidden>VE-Log</span><small>MITARBEITERPORTAL</small></a><div class="nav-label">ARBEITSPLATZ</div><nav class="nav" aria-label="Hauptnavigation"><a href="dashboard.html">▦ Dashboard</a><a href="personalmanagement.html">♙ Mitarbeiter</a><a href="formular.html">▤ Formulare</a><a class="active" href="nachweise.html" aria-current="page">▣ Meine Nachweise</a><a href="urlaub.html">▧ Urlaub</a><a href="einstellungen.html">⚙ Einstellungen</a></nav><p class="side-note">Alles für deinen Arbeitsalltag.<br>Einfach an einem Ort.</p></aside>
<div class="shell"><header class="topbar"><div><span>Arbeitsplatz / </span>Meine Nachweise</div><a class="btn" href="dashboard.html">← Dashboard</a></header>
<main id="main"><div class="intro"><div><span class="eyebrow">DOKUMENTE &amp; NACHWEISE</span><h1>Meine Nachweise</h1><p class="muted">Deine gespeicherten Formulare und PDFs – an einem Ort.</p></div><a class="btn primary" href="formular.html">+ Formular ausfüllen</a></div>
<div class="notice" id="loadStatus" role="status">Deine Anmeldung wird geprüft …</div>
<section class="stats" aria-label="Übersicht"><div class="stat"><span>Alle Nachweise</span><strong id="countAll">—</strong><small>Deine gespeicherten Formulare</small></div><div class="stat"><span>Entwürfe</span><strong id="countDraft">—</strong><small>Noch nicht eingereicht</small></div><div class="stat"><span>Eingereicht</span><strong id="countSent">—</strong><small>Status, keine Genehmigungsbestätigung</small></div></section>
<details class="panel" style="margin-bottom:22px;padding:18px 24px"><summary style="cursor:pointer;font-weight:650">Formular ausfüllen – alle neun Formulare</summary><div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px"><a class="btn" href="arbeitsnachweis.html">Arbeitsnachweis</a><a class="btn" href="arbeitsnachweis-lkw.html">Arbeitsnachweis LKW</a><a class="btn" href="leistungsnachweis.html">Leistungsnachweis</a><a class="btn" href="materialausgabe.html">Materialausgabe</a><a class="btn" href="lieferschein.html">Liefer-/Empfangsschein</a><a class="btn" href="m.empfaenger.html">Material – Empfänger</a><a class="btn" href="m.baustelle.html">Material – Baustelle</a><a class="btn" href="m.absender.html">Material – Absender</a><a class="btn" href="fuhrunternehmer.html">Fuhrunternehmer</a></div></details>
<section class="panel"><div class="panel-head"><h2>Gespeicherte Nachweise</h2><span class="muted" id="accountName" style="font-size:12px">Dein Konto</span></div>
<div class="filters"><label for="search">Nachweis suchen<input id="search" type="search" placeholder="Titel, Datum oder Formularart …" disabled></label><label for="typeFilter">Formularart<select id="typeFilter" disabled><option value="">Alle Formulararten</option><option value="arbeitsnachweis">Arbeitsnachweis</option><option value="arbeitsnachweis_lkw">Arbeitsnachweis LKW</option><option value="lieferschein">Liefer-/Empfangsschein</option><option value="leistungsnachweis">Leistungsnachweis</option><option value="materialausgabe">Materialausgabe</option><option value="material_empfaenger">Material – Empfänger</option><option value="material_baustelle">Material – Baustelle</option><option value="material_absender">Material – Absender</option><option value="fuhrunternehmer">Fuhrunternehmer</option></select></label><label for="statusFilter">Status<select id="statusFilter" disabled><option value="">Alle Status</option><option value="entwurf">Entwurf</option><option value="eingereicht">Eingereicht</option></select></label></div>
<div class="selection-bar"><span id="selectionCount" aria-live="polite">0 ausgewählt</span><button class="btn danger" id="deleteSelected" type="button" disabled>Ausgewählte löschen</button><button class="btn" id="clearSelection" type="button" disabled>Auswahl aufheben</button><span>Die Auswahl gilt über Seiten hinweg; ein Filterwechsel hebt sie auf.</span></div>
<p class="notice" id="actionStatus" style="margin:16px 24px" role="status" hidden></p>
<div class="table-wrap" id="tableWrap" hidden><table><thead><tr><th scope="col" class="select-cell"><input id="selectPage" type="checkbox" aria-label="Alle Nachweise auf dieser Seite auswählen" disabled></th><th scope="col">Nachweis</th><th scope="col">Datum</th><th scope="col">Status</th><th scope="col">Aktion</th></tr></thead><tbody id="records"></tbody></table></div>
<div class="empty" id="emptyState"><div class="type-icon">▤</div><h3 id="emptyTitle">Nachweise werden geladen</h3><p id="emptyText">Bitte warte, bis deine Anmeldung geprüft wurde.</p><a class="btn" id="emptyLink" href="formular.html" hidden>Zu den Formularen</a></div>
<div class="pager"><span id="resultCount" aria-live="polite">—</span><div><button class="btn" id="prev" disabled>← Zurück</button><button class="btn" id="next" disabled>Weiter →</button></div></div></section>
<footer class="foot"><span>VE-Log · Mitarbeiterportal</span><span>Nur Nachweise deines angemeldeten Kontos</span></footer></main>
<dialog id="detailDialog" aria-labelledby="detailTitle"><div class="detail-head"><div><span class="eyebrow" id="detailType">NACHWEIS</span><h2 id="detailTitle"></h2></div><button class="btn" id="closeDetail" type="button" aria-label="Detailansicht schließen">Schließen ×</button></div><div class="detail-body"><div class="detail-meta" id="detailMeta"></div><div id="detailData"></div><div class="detail-actions"><a class="btn" id="openOriginal" href="#">Im Formular öffnen</a><button class="btn primary" id="openPdf" type="button">PDF öffnen</button><button class="btn" id="downloadPdf" type="button">PDF herunterladen</button><button class="btn" id="sharePdf" type="button">PDF teilen</button><button class="btn" id="emailPdf" type="button">PDF herunterladen &amp; E-Mail öffnen</button><button class="btn" id="createPdf" type="button" hidden>PDF nachträglich erstellen</button><button class="btn" id="printDetail" type="button">Drucken</button><button class="btn" id="downloadDetail" type="button">Daten herunterladen (JSON)</button></div><p id="pdfHint" class="muted" style="margin-top:16px;font-size:12px"></p><p id="pdfStatus" class="notice" style="margin-top:16px" role="status" hidden></p><p class="detail-id" id="detailId" style="margin-top:16px"></p></div></dialog>
</div>
<script type="module">
'use strict';
// Die Nachweisliste funktioniert auch dann, wenn die PDF-Datei fehlt.
let pdfTools = null;
let pdfLoadError = '';
let createPdf, downloadPdf, openPdf, sharePdf, emailWithDownload;
let pdfFile = () => { throw new Error('PDF-Funktion nicht geladen.'); };
let supportsPdfSharing = () => false;
let labelFor = (key, labels = {}) => Object.hasOwn(labels, key) ? labels[key] : key.replace(/_/g, ' ');
async function loadPdfTools() {
  let timer;
  try {
    const module = await Promise.race([
      import('./nachweise-pdf.js?v=4'),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Zeitüberschreitung beim Laden')), 15000); })
    ]);
    const required = ['createPdf','pdfFile','downloadPdf','openPdf','supportsPdfSharing','sharePdf','emailWithDownload','labelFor'];
    if (!required.every(name => typeof module[name] === 'function')) throw new Error('PDF-Datei unvollständig');
    ({createPdf,pdfFile,downloadPdf,openPdf,supportsPdfSharing,sharePdf,emailWithDownload,labelFor} = module);
    pdfTools = module;
    pdfLoadError = '';
  } catch (error) {
    pdfLoadError = 'Die Nachweise können angezeigt werden, aber die PDF-Funktionen fehlen. Lade nachweise-pdf.js in denselben Website-Ordner wie nachweise.html und lade diese Seite neu.';
    console.error('VE-Log PDF-Funktionen:', error);
  } finally {
    clearTimeout(timer);
    updateConnectionNotice();
    drawDetail();
    render();
  }
}
const firebaseConfig={apiKey:'AIzaSyDXTAVTeddKxwOp_C_2Z4lPY9yI5bAm0KM',authDomain:'ve-log.firebaseapp.com',databaseURL:'https://ve-log-default-rtdb.europe-west1.firebasedatabase.app',projectId:'ve-log',storageBucket:'ve-log.firebasestorage.app',messagingSenderId:'749978080433',appId:'1:749978080433:web:8f64ef99a557fe2346be90'};
const $=id=>document.getElementById(id);
const typeNames={arbeitsnachweis:'Arbeitsnachweis',arbeitsnachweis_lkw:'Arbeitsnachweis LKW',lieferschein:'Liefer-/Empfangsschein',leistungsnachweis:'Leistungsnachweis',materialausgabe:'Materialausgabe',material_empfaenger:'Material – Empfänger',material_baustelle:'Material – Baustelle',material_absender:'Material – Absender',fuhrunternehmer:'Fuhrunternehmer'};
const formPages={arbeitsnachweis:'arbeitsnachweis.html',arbeitsnachweis_lkw:'arbeitsnachweis-lkw.html',leistungsnachweis:'leistungsnachweis.html',materialausgabe:'materialausgabe.html',lieferschein:'lieferschein.html',material_empfaenger:'m.empfaenger.html',material_baustelle:'m.baustelle.html',material_absender:'m.absender.html',fuhrunternehmer:'fuhrunternehmer.html'};
let records=[],loaded=false,page=0,selected=null,stopRecords=null,stopConnection=null,stopTimeout=null,session=0,connected=false,pdfBusy=false,auth=null,db=null,DB=null;
const pageSize=20;
const selectedIds=new Set();
let visibleIds=[];
let deleteBusy=false;
function actionMessage(text,error=false){$('actionStatus').hidden=false;$('actionStatus').textContent=text;$('actionStatus').classList.toggle('error',error);}
function updateSelection(){
 $('selectionCount').textContent=selectedIds.size+' ausgewählt';
 $('deleteSelected').disabled=!loaded||!connected||deleteBusy||selectedIds.size===0;
 $('clearSelection').disabled=deleteBusy||selectedIds.size===0;
 const count=visibleIds.filter(id=>selectedIds.has(id)).length;
 $('selectPage').checked=visibleIds.length>0&&count===visibleIds.length;
 $('selectPage').indeterminate=count>0&&count<visibleIds.length;
 $('selectPage').disabled=!loaded||!connected||deleteBusy||visibleIds.length===0;
}
async function deleteRecords(ids){
 if(deleteBusy||!loaded||!connected||!auth?.currentUser)return;
 const account=auth.currentUser,current=session;
 const targets=records.filter(r=>ids.includes(r.id));
 if(!targets.length)return;
 if(targets.some(r=>!/^[A-Za-z0-9_-]{1,128}$/.test(r.id))){actionMessage('Ein Nachweis hat eine ungültige ID und kann nicht gelöscht werden.',true);return;}
 const titles=targets.slice(0,3).map(r=>'• '+(r.titel||'Nachweis')+' ('+fmtDay(r.datum)+')').join('\n');
 const prompt=targets.length===1?'Diesen Nachweis samt gespeicherter PDF endgültig löschen?':'Diese '+targets.length+' Nachweise samt gespeicherten PDFs endgültig löschen?';
 if(!window.confirm(prompt+'\n\n'+titles+(targets.length>3?'\n… und '+(targets.length-3)+' weitere':'')+'\n\nDas kann nicht rückgängig gemacht werden.'))return;
 if(current!==session||auth.currentUser?.uid!==account.uid)return;
 deleteBusy=true;render();actionMessage('Nachweise werden gelöscht …');
 try{
  // Ein gemeinsamer Schreibvorgang: nur ausdrücklich gewählte IDs im eigenen Konto.
  const changes=Object.fromEntries(targets.map(r=>[r.id,null]));
  await DB.update(DB.ref(db,'nachweise/'+account.uid),changes);
  if(current!==session)return;
  const removed=new Set(targets.map(r=>r.id));
  records=records.filter(r=>!removed.has(r.id));
  for(const id of removed)selectedIds.delete(id);
  if(selected&&removed.has(selected.id))$('detailDialog').close();
  actionMessage(targets.length===1?'Nachweis und PDF wurden gelöscht.':targets.length+' Nachweise mit ihren PDFs wurden gelöscht.');
 }catch(error){
  if(current===session)actionMessage(/permission.denied/i.test(error?.code||error?.message||'')?'Firebase erlaubt das Löschen dieser Nachweise nicht. Prüfe die Löschrechte für dein Konto. Es wurde nichts gelöscht.':error?.message||'Löschen fehlgeschlagen. Bitte prüfe deine Verbindung.',true);
 }finally{
  deleteBusy=false;
  if(current===session)render();
 }
}
function textNode(tag,text,className){const el=document.createElement(tag);el.textContent=String(text??'');if(className)el.className=className;return el;}
function statusName(status){return status==='entwurf'?'Entwurf':status==='eingereicht'?'Eingereicht':'Unbekannter Status';}
function fmtDay(day){return typeof day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(day)?day.split('-').reverse().join('.'):'—';}
function fmtTime(time){return typeof time==='number'&&Number.isFinite(time)?new Intl.DateTimeFormat('de-DE',{dateStyle:'medium',timeStyle:'short'}).format(new Date(time)):'—';}
function notice(text,error=false){$('loadStatus').hidden=false;$('loadStatus').textContent=text;$('loadStatus').classList.toggle('error',error);}
function updateConnectionNotice() {
 if (!loaded) return;
 if (!connected) { notice('Keine Verbindung zu Firebase. Die Liste kann noch zwischengespeicherte Daten anzeigen.'); return; }
 if (pdfLoadError) { notice(pdfLoadError,true); return; }
 $('loadStatus').hidden=true;
}
function pdfMessage(text,error=false){$('pdfStatus').hidden=false;$('pdfStatus').textContent=text;$('pdfStatus').classList.toggle('error',error);}
function errorText(error){return /permission.denied/i.test(error?.code||error?.message||'')?'Firebase verweigert das Lesen deiner Nachweise. Die Realtime-Database-Regeln müssen deinem angemeldeten Konto den Lesezugriff auf nachweise/'+(auth?.currentUser?.uid||'DEINE_UID')+' erlauben. Bitte die Datenbank nicht öffentlich freigeben.':error?.message||'Die Verbindung zu Firebase ist fehlgeschlagen. Prüfe deine Internetverbindung.';}
function hasPdf(record){try{pdfFile(record?.pdf);return true;}catch{return false;}}
function render(){
 const needle=$('search').value.trim().toLocaleLowerCase('de'),typ=$('typeFilter').value,status=$('statusFilter').value;
 const filtered=records.filter(r=>(!typ||r.typ===typ)&&(!status||r.status===status)&&(!needle||[r.titel,typeNames[r.typ]||r.typ,r.datum,fmtDay(r.datum)].join(' ').toLocaleLowerCase('de').includes(needle)));
 page=Math.min(page,Math.max(0,Math.ceil(filtered.length/pageSize)-1));
 $('countAll').textContent=loaded?records.length:'—';$('countDraft').textContent=loaded?records.filter(r=>r.status==='entwurf').length:'—';$('countSent').textContent=loaded?records.filter(r=>r.status==='eingereicht').length:'—';
 $('records').replaceChildren();
 const currentPage=filtered.slice(page*pageSize,(page+1)*pageSize);
 visibleIds=currentPage.map(r=>r.id);
 for(const r of currentPage){
  const tr=document.createElement('tr'),first=document.createElement('td'),block=document.createElement('div');block.className='type';block.append(textNode('span','▤','type-icon'));const copy=document.createElement('div');copy.append(textNode('strong',r.titel||typeNames[r.typ]||'Nachweis'),textNode('small',(typeNames[r.typ]||r.typ||'Formular')+(r.pdf?' · PDF gespeichert':'')));block.append(copy);first.append(block);
  const day=textNode('td',fmtDay(r.datum));day.append(textNode('small','Gespeichert: '+fmtTime(r.updatedAt)));const state=document.createElement('td');state.append(textNode('span',statusName(r.status),'pill'+(r.status==='eingereicht'?' sent':'')));
  const selectCell=document.createElement('td');selectCell.className='select-cell';
  const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=selectedIds.has(r.id);checkbox.disabled=deleteBusy||!connected;checkbox.setAttribute('aria-label','Nachweis auswählen: '+(r.titel||'Nachweis')+' '+fmtDay(r.datum));
  checkbox.addEventListener('change',()=>{if(checkbox.checked)selectedIds.add(r.id);else selectedIds.delete(r.id);tr.classList.toggle('row-selected',checkbox.checked);updateSelection();});selectCell.append(checkbox);tr.classList.toggle('row-selected',checkbox.checked);
  const action=document.createElement('td'),actions=document.createElement('div');actions.className='row-actions';
  const detail=textNode('button','Details / PDF','btn');detail.type='button';detail.setAttribute('aria-label','Details und PDF zu '+(r.titel||'Nachweis'));detail.addEventListener('click',()=>openDetail(r));actions.append(detail);
  if(r.status==='entwurf'&&formPages[r.typ]){
   const edit=textNode('a','Bearbeiten','btn');edit.href=formPages[r.typ]+'?id='+encodeURIComponent(r.id);edit.setAttribute('aria-label','Bearbeiten: '+(r.titel||'Nachweis'));actions.append(edit);
  }else{
   const edit=textNode('button','Bearbeiten','btn');edit.type='button';edit.disabled=true;edit.title=r.status!=='entwurf'?'Nur Entwürfe können bearbeitet werden.':'Für diese Formularart ist keine Bearbeitungsseite hinterlegt.';actions.append(edit);
  }
  const pdf=textNode('button','PDF herunterladen','btn');pdf.type='button';pdf.disabled=!hasPdf(r);pdf.title=pdf.disabled?'Öffne Details / PDF, um die PDF-Funktion zu prüfen oder eine PDF nachträglich zu erstellen.':'Gespeicherte PDF herunterladen';pdf.addEventListener('click',()=>{try{downloadPdf(r.pdf);actionMessage('PDF-Download gestartet.');}catch(error){actionMessage(error.message,true);}});actions.append(pdf);
  const remove=textNode('button','Löschen','btn danger');remove.type='button';remove.disabled=deleteBusy||!connected;remove.setAttribute('aria-label','Löschen: '+(r.titel||'Nachweis'));remove.addEventListener('click',()=>deleteRecords([r.id]));actions.append(remove);
  action.append(actions);tr.append(selectCell,first,day,state,action);$('records').append(tr);
 }
 $('tableWrap').hidden=!loaded||!filtered.length;$('emptyState').hidden=loaded&&filtered.length>0;
 if(loaded){$('emptyTitle').textContent=records.length?'Keine passenden Nachweise':'Noch keine Nachweise gespeichert';$('emptyText').textContent=records.length?'Ändere deine Suche oder die Filter.':'Speichere ein Formular. Der Nachweis und seine PDF erscheinen anschließend hier.';}
 $('emptyLink').hidden=!loaded||records.length>0;$('resultCount').textContent=!loaded?'Noch nicht geladen':filtered.length?'Einträge '+(page*pageSize+1)+'–'+Math.min((page+1)*pageSize,filtered.length)+' von '+filtered.length:'0 Nachweise';$('prev').disabled=!loaded||page===0;$('next').disabled=!loaded||(page+1)*pageSize>=filtered.length;
 updateSelection();
}
function renderValue(value,depth=0,labels={}){
 if(value===null||value===undefined)return textNode('span','—');
 if(typeof value==='string'&&/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(value)){const img=document.createElement('img');img.src=value;img.alt='Gespeicherte Unterschrift';img.style.cssText='max-width:100%;max-height:220px;object-fit:contain;background:white';return img;}
 if(typeof value!=='object')return textNode('span',typeof value==='boolean'?(value?'Ja':'Nein'):value);
 if(depth>8)return textNode('pre',JSON.stringify(value,null,2));
 if(Array.isArray(value)){
  if(!value.length)return textNode('span','Keine Einträge');
  if(value.every(v=>Array.isArray(v))){const wrap=document.createElement('div');wrap.className='table-wrap';const table=document.createElement('table');for(const row of value){const tr=document.createElement('tr');for(const cell of row){const td=document.createElement('td');td.append(renderValue(cell,depth+1));tr.append(td);}table.append(tr);}wrap.append(table);return wrap;}
  const list=document.createElement('div');value.forEach((v,i)=>list.append(textNode('h3','Eintrag '+(i+1),'detail-label'),renderValue(v,depth+1)));return list;
 }
 const dl=document.createElement('dl');dl.className='details-list';for(const [key,val]of Object.entries(value)){const group=document.createElement('div');group.append(textNode('dt',labelFor(key,labels)));const dd=document.createElement('dd');dd.append(renderValue(val,depth+1));group.append(dd);dl.append(group);}return dl;
}
function openDetail(record){selected=record;$('pdfStatus').hidden=true;drawDetail();if(!$('detailDialog').open)$('detailDialog').showModal();}
function drawDetail(){
 if(!selected)return;
 $('detailTitle').textContent=selected.titel||'Nachweis';$('detailType').textContent=typeNames[selected.typ]||'NACHWEIS';$('detailMeta').replaceChildren(textNode('span',fmtDay(selected.datum)),textNode('span',statusName(selected.status)),textNode('span','Zuletzt gespeichert: '+fmtTime(selected.updatedAt)));$('detailData').replaceChildren(renderValue(selected.daten,0,selected.feldLabels||{}));$('detailId').textContent='Nachweis-ID: '+selected.id;
 const original=formPages[selected.typ];$('openOriginal').hidden=!original;if(original){$('openOriginal').href=original+'?id='+encodeURIComponent(selected.id);$('openOriginal').textContent=selected.status==='entwurf'?'Im Formular bearbeiten':'Formular ansehen';}
 const available=hasPdf(selected),sharing=available&&supportsPdfSharing(selected.pdf);
 for(const id of ['openPdf','downloadPdf','emailPdf'])$(id).disabled=!available||pdfBusy;
 $('sharePdf').hidden=!sharing;$('sharePdf').disabled=pdfBusy;
 $('createPdf').hidden=available;$('createPdf').disabled=pdfBusy||!connected||!pdfTools||selected.status!=='entwurf';
 $('pdfHint').textContent=!pdfTools?(pdfLoadError||'PDF-Funktionen werden geladen …'):!available?'Für diesen Nachweis ist noch keine PDF gespeichert. Bei Entwürfen kannst du sie nachträglich erstellen; eingereichte Nachweise sind geschützt.':sharing?'„PDF teilen“: Wähle deine E-Mail-App und trage technik@ve-log.de als Empfänger ein. Das Teilen bestätigt keinen E-Mail-Versand.':'Der E-Mail-Button lädt die PDF herunter und öffnet eine Nachricht an technik@ve-log.de. Bitte hänge die PDF manuell an und sende die E-Mail ab.';
}
$('closeDetail').addEventListener('click',()=>{$('detailDialog').close();});$('detailDialog').addEventListener('close',()=>{selected=null;});
$('printDetail').addEventListener('click',()=>{if(selected)window.print();});
$('downloadDetail').addEventListener('click',()=>{if(!selected)return;const {pdf,...data}=selected;const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='VE-Log-'+selected.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);});
$('openPdf').addEventListener('click',()=>{if(!selected)return;try{openPdf(selected.pdf);}catch(error){pdfMessage(error.message,true);}});
$('downloadPdf').addEventListener('click',()=>{if(!selected)return;try{downloadPdf(selected.pdf);pdfMessage('PDF-Download gestartet.');}catch(error){pdfMessage(error.message,true);}});
$('emailPdf').addEventListener('click',()=>{if(!selected)return;try{emailWithDownload(selected.pdf,selected.titel+' – '+fmtDay(selected.datum));pdfMessage('PDF-Download und Öffnen der E-Mail-App angefordert. Hänge die PDF manuell an und sende die Nachricht an technik@ve-log.de ab.');}catch(error){pdfMessage(error.message,true);}});
$('sharePdf').addEventListener('click',async()=>{
 if(!selected||pdfBusy)return;
 const record=selected,current=session;pdfBusy=true;drawDetail();
 try{await sharePdf(record.pdf,record.titel);if(session===current&&selected?.id===record.id)pdfMessage('Teilen-Dialog geöffnet beziehungsweise PDF übergeben. Prüfe die Nachricht in deiner E-Mail-App und sende sie dort ab.');}
 catch(error){if(session===current&&selected?.id===record.id)pdfMessage(error.name==='AbortError'?'Teilen wurde abgebrochen.':'Teilen ist nicht möglich. Lade die PDF herunter und hänge sie manuell an.',error.name!=='AbortError');}
 finally{pdfBusy=false;drawDetail();}
});
$('createPdf').addEventListener('click',async()=>{
 if(!selected||selected.status!=='entwurf'||pdfBusy||!auth.currentUser||!connected||!pdfTools)return;
 const record=selected,user=auth.currentUser,current=session;pdfBusy=true;drawDetail();pdfMessage('PDF wird erstellt und gespeichert …');
 try{
  const pdf=await createPdf(record);
  if(current!==session||auth.currentUser?.uid!==user.uid)return;
  const originalData=JSON.stringify(record.daten||{}),originalTitle=record.titel;
  const result=await DB.runTransaction(DB.ref(db,'nachweise/'+user.uid+'/'+record.id),existing=>{
   if(!existing||existing.status!=='entwurf'||existing.pdf||JSON.stringify(existing.daten||{})!==originalData||existing.titel!==originalTitle)return;
   return {...existing,updatedAt:DB.serverTimestamp(),pdf:{...pdf,generatedAt:DB.serverTimestamp()}};
  },{applyLocally:false});
  if(current!==session)return;
  if(!result.committed)throw new Error('Der Nachweis wurde inzwischen geändert oder besitzt bereits eine PDF. Bitte öffne seine Details erneut.');
  if(selected?.id===record.id){selected={...result.snapshot.val(),id:record.id};drawDetail();pdfMessage('PDF erfolgreich beim Nachweis gespeichert.');}
 }catch(error){if(current===session&&selected?.id===record.id)pdfMessage(errorText(error),true);}
 finally{pdfBusy=false;drawDetail();}
});
for(const id of ['search','typeFilter','statusFilter'])$(id).addEventListener(id==='search'?'input':'change',()=>{selectedIds.clear();page=0;render();});$('prev').addEventListener('click',()=>{page--;render();});$('next').addEventListener('click',()=>{page++;render();});
const logo=$('brandLogo');function fallback(){logo.hidden=true;$('brandFallback').hidden=false;}logo.addEventListener('error',fallback);if(logo.complete&&!logo.naturalWidth)fallback();
async function start(){
 try{
  const [App,Auth,Database]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js')]);DB=Database;
  const app=App.getApps().length?App.getApp():App.initializeApp(firebaseConfig);auth=Auth.getAuth(app);db=DB.getDatabase(app);
  Auth.onAuthStateChanged(auth,user=>{
   const current=++session;selectedIds.clear();visibleIds=[];$('actionStatus').hidden=true;stopRecords?.();stopConnection?.();stopTimeout?.();records=[];loaded=false;connected=false;page=0;selected=null;if($('detailDialog').open)$('detailDialog').close();render();['search','typeFilter','statusFilter'].forEach(id=>$(id).disabled=true);
   if(!user){$('accountName').textContent='Dein Konto';notice('Bitte melde dich an, um deine Nachweise zu sehen.');const a=textNode('a',' Zur Anmeldung');a.href='index.html';$('loadStatus').append(a);$('emptyTitle').textContent='Anmeldung erforderlich';$('emptyText').textContent='Deine Nachweise sind deinem Benutzerkonto zugeordnet.';return;}
   $('accountName').textContent=user.displayName||user.email||'Dein Konto';notice('Deine Nachweise werden geladen …');
   const loadTimer=setTimeout(()=>{if(current===session&&!loaded)notice('Die Datenbank antwortet noch nicht. Prüfe die Verbindung und ob du die Seite über deine Website geöffnet hast. Angemeldetes Konto: '+(user.email||user.uid),true);},15000);
   stopTimeout=()=>clearTimeout(loadTimer);
   stopConnection=DB.onValue(DB.ref(db,'.info/connected'),snapshot=>{if(current!==session)return;connected=snapshot.val()===true;updateConnectionNotice();drawDetail();render();});
   stopRecords=DB.onValue(DB.ref(db,'nachweise/'+user.uid),snapshot=>{
    if(current!==session)return;records=[];snapshot.forEach(child=>{const value=child.val();if(value&&typeof value==='object')records.push({...value,id:child.key});});records.sort((a,b)=>(Number(b.updatedAt)||0)-(Number(a.updatedAt)||0));const liveIds=new Set(records.map(r=>r.id));for(const id of selectedIds)if(!liveIds.has(id))selectedIds.delete(id);loaded=true;['search','typeFilter','statusFilter'].forEach(id=>$(id).disabled=false);
    stopTimeout?.();updateConnectionNotice();
    if(selected){const updated=records.find(r=>r.id===selected.id);if(updated){selected=updated;drawDetail();}else $('detailDialog').close();}render();
   },error=>{if(current!==session)return;stopTimeout?.();loaded=false;records=[];selected=null;if($('detailDialog').open)$('detailDialog').close();render();notice(errorText(error),true);$('emptyTitle').textContent='Nachweise konnten nicht geladen werden';$('emptyText').textContent='Prüfe die Meldung über der Übersicht.';});
  },error=>notice(errorText(error),true));
 }catch(error){notice(errorText(error),true);$('emptyTitle').textContent='Firebase nicht erreichbar';$('emptyText').textContent='Lade die Seite über deine Website und prüfe die Verbindung.';}
}
$('selectPage').addEventListener('change',()=>{
 if(deleteBusy)return;
 for(const id of visibleIds){if($('selectPage').checked)selectedIds.add(id);else selectedIds.delete(id);}
 render();
});
$('clearSelection').addEventListener('click',()=>{if(deleteBusy)return;selectedIds.clear();render();});
$('deleteSelected').addEventListener('click',()=>deleteRecords([...selectedIds]));
loadPdfTools();
start();
</script>
</body>
</html>

import * as XLSX from "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm";
import { HyperFormula } from "https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/+esm";
const $=id=>document.getElementById(id);
let wb=null,engine=null,names=[],sheetName="",selected=null,exportName="nachkalkulation-bearbeitet.xlsx";
const inputs=["sheetSelect","startRow","startCol","rowCount","colCount","showRange"];
$("fileInput").addEventListener("change",async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  wb=XLSX.read(await file.arrayBuffer(),{type:"array",cellFormula:true,cellStyles:true});
  names=wb.SheetNames;exportName=file.name.replace(/\.(xlsx|xls)$/i,"")+"-bearbeitet.xlsx";
  const sheets={};
  for(const n of names){const ws=wb.Sheets[n],range=XLSX.utils.decode_range(ws["!ref"]||"A1"),rows=[];
   for(let r=0;r<=range.e.r;r++){const row=[];for(let c=0;c<=range.e.c;c++){const cell=ws[XLSX.utils.encode_cell({r,c})];row.push(cell?.f?"="+cell.f:(cell?.v??null))}rows.push(row)}sheets[n]=rows}
  engine=HyperFormula.buildFromSheets(sheets,{licenseKey:"gpl-v3"});
  $("sheetSelect").innerHTML="";names.forEach(n=>{const o=document.createElement("option");o.value=n;o.textContent=n;$("sheetSelect").append(o)});
  inputs.forEach(id=>$(id).disabled=false);$("exportBtn").disabled=false;$("applyBtn").disabled=false;
  sheetName=names[0];$("sheetSelect").value=sheetName;
  $("status").textContent=`${file.name} geladen · ${names.length} Tabellenblätter`;render();
 }catch(err){console.error(err);$("status").textContent="Datei konnte nicht gelesen werden. Bitte eine gültige .xlsx- oder .xls-Datei auswählen."}
});
$("sheetSelect").addEventListener("change",()=>{sheetName=$("sheetSelect").value;selected=null;render()});
$("showRange").addEventListener("click",()=>{selected=null;render()});
$("applyBtn").addEventListener("click",applyEdit);
$("cellInput").addEventListener("keydown",e=>{if(e.key==="Enter")applyEdit()});
$("exportBtn").addEventListener("click",()=>{
 if(!wb)return;
 try{
  for(const n of names){const sid=engine.getSheetId(n),ws=wb.Sheets[n],vals=engine.getSheetValues(sid);
   for(let r=0;r<vals.length;r++)for(let c=0;c<(vals[r]||[]).length;c++){const addr=XLSX.utils.encode_cell({r,c}),v=vals[r][c],cell=ws[addr];if(cell?.f){cell.v=v;cell.t=typeof v==="number"?"n":"str"}}
  }
  XLSX.writeFile(wb,exportName);$("status").textContent="Excel-Datei exportiert. Bitte wichtige Berechnungen in Excel kontrollieren.";
 }catch(err){console.error(err);$("status").textContent="Export fehlgeschlagen."}
});
function render(){
 if(!wb)return;
 const ws=wb.Sheets[sheetName],sid=engine.getSheetId(sheetName),vals=engine.getSheetValues(sid),range=XLSX.utils.decode_range(ws["!ref"]||"A1");
 const r0=Math.max(0,(parseInt($("startRow").value,10)||1)-1),c0=colNumber($("startCol").value);
 const nr=parseInt($("rowCount").value,10)||60,nc=parseInt($("colCount").value,10)||20;
 const rEnd=Math.min(Math.max(range.e.r,vals.length-1),r0+nr-1),cEnd=Math.min(Math.max(range.e.c,0),c0+nc-1);
 const table=document.createElement("table"),thead=document.createElement("thead"),hr=document.createElement("tr"),corner=document.createElement("th");corner.className="rownum";hr.append(corner);
 for(let c=c0;c<=cEnd;c++){const th=document.createElement("th");th.textContent=XLSX.utils.encode_col(c);hr.append(th)}thead.append(hr);table.append(thead);
 const tbody=document.createElement("tbody");
 for(let r=r0;r<=rEnd;r++){const tr=document.createElement("tr"),th=document.createElement("th");th.className="rownum";th.textContent=r+1;tr.append(th);
  for(let c=c0;c<=cEnd;c++){const td=document.createElement("td"),addr=XLSX.utils.encode_cell({r,c}),cell=ws[addr],v=vals[r]?.[c];td.textContent=show(v);td.title=cell?.f?"="+cell.f:String(cell?.v??"");if(cell?.f)td.classList.add("formula");if(selected?.r===r&&selected?.c===c)td.classList.add("selected");td.addEventListener("click",()=>select(r,c));tr.append(td)}tbody.append(tr)}
 table.append(tbody);$("grid").replaceChildren(table);
 $("status").textContent=`${sheetName} · Zeilen ${r0+1}–${rEnd+1} · Spalten ${XLSX.utils.encode_col(c0)}–${XLSX.utils.encode_col(cEnd)} · Gesamtbereich ${range.e.r+1} Zeilen`;
}
function select(r,c){selected={r,c,sheet:sheetName};const addr=XLSX.utils.encode_cell({r,c}),cell=wb.Sheets[sheetName][addr],v=engine.getCellValue({sheet:engine.getSheetId(sheetName),row:r,col:c});$("cellInput").value=cell?.f?"="+cell.f:show(v);$("cellStatus").textContent=`Ausgewählt: ${sheetName}!${addr}`;render()}
function applyEdit(){if(!selected)return;const {r,c}=selected,addr=XLSX.utils.encode_cell({r,c}),v=$("cellInput").value,ws=wb.Sheets[sheetName];
 try{engine.setCellContents({sheet:engine.getSheetId(sheetName),row:r,col:c},[[v===""?null:v]]);
  if(v==="")delete ws[addr];else if(v.startsWith("=")){ws[addr]={t:"n",f:v.slice(1)}}else if(v.trim()!==""&&!Number.isNaN(Number(v))){ws[addr]={t:"n",v:Number(v)}}else ws[addr]={t:"s",v};
  const old=XLSX.utils.decode_range(ws["!ref"]||"A1");old.e.r=Math.max(old.e.r,r);old.e.c=Math.max(old.e.c,c);ws["!ref"]=XLSX.utils.encode_range(old);
  $("cellStatus").textContent=`Änderung übernommen: ${sheetName}!${addr}`;render();
 }catch(err){console.error(err);$("cellStatus").textContent="Eingabe konnte nicht übernommen werden."}
}
function show(v){if(v==null)return "";if(typeof v==="number")return Number.isInteger(v)?String(v):String(Number(v.toFixed(4)));return String(v)}
function colNumber(s){s=(s||"A").toUpperCase().replace(/[^A-Z]/g,"")||"A";let n=0;for(const ch of s)n=n*26+ch.charCodeAt(0)-64;return Math.max(0,n-1)}

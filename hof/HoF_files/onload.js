/*
function setMinWidth(theDivId,theWidth) {
 var theDiv=theDivId;
 var w=parseInt(theWidth);
 var cw,pl,pr,ml,mr,br,bl;
 var g=document.getElementById(theDiv);
 if (g&&document.body&&document.body.clientWidth) {
  gs=g.currentStyle;
  cw=parseInt(document.body.clientWidth);
  pl=parseInt(gs.paddingLeft);
  pr=parseInt(gs.paddingRight);
  ml=parseInt(gs.marginLeft);
  mr=parseInt(gs.marginRight);
  bl=parseInt(gs.borderLeftWidth);
  br=parseInt(gs.borderRightWidth);
  ml=ml?ml:0;
  mr=mr?mr:0;
  pl=pl?pl:0;
  pr=pr?pr:0;
  bl=bl?bl:0;
  br=br?br:0;
  if (cw<=w) {
   w-=pl+pr+ml+mr+bl+br;
   g.style.width=w+'px';
  } else {
   g.style.width="auto";
  }
 }
}

function startList(navId) {
 if (document.all&&document.getElementById) {
  navRoot=document.getElementById(navId);
  for (i=0; i<navRoot.childNodes.length; i++) {
   node=navRoot.childNodes[i];
   if (node.nodeName=='LI') {
    node.onmouseover=function() {
     this.className+=' over';
    }
    node.onmouseout=function() {
     //this.className=this.className.replace(' over', '');
     this.className=this.className.replace(new RegExp(" over\\b"), '');
    }
   }
  }
 }
}
*/

function tableruler() {
 if (document.getElementById && document.createTextNode) {
  var tables=document.getElementsByTagName('table');
  for (var i=0;i<tables.length;i++) {
   if (tables[i].className.indexOf('ruler')!=-1) {
    var trs=tables[i].getElementsByTagName('tr');
    for (var j=0;j<trs.length;j++) {
     if (trs[j].parentNode.nodeName=='TBODY' && trs[j].parentNode.nodeName!='TFOOT') {
      trs[j].onmouseover=function() {
       this.className+=' ruled';
      }
      trs[j].onmouseout=function() {
       this.className=this.className.replace('ruled', '');
      }
     }
    }
   }
  }
 }
}

var browserName=navigator.appName.toLowerCase();
var browserVersion=parseInt(navigator.appVersion);
var browser=navigator.userAgent.toLowerCase();

var amaya=(browser.indexOf('amaya')!=-1);
var gecko=(browser.indexOf('gecko')!=-1);
var opera=(browser.indexOf('opera')!=-1);
var msie=((browser.indexOf('msie')!=-1||browser.indexOf('internet explorer')!=-1)&&!opera);
var moz4=(browser.indexOf('mozilla/4')!=-1);
var nn4=(moz4 && !msie && !gecko && !opera);

var wrapclass='wrapper';
var wrapwidth=750;

if (!nn4) {
 window.onload=function() {
  //startList('navtop');
  //startList('navleft');
  tableruler();
  //if (msie) {
   //setMinWidth(wrapclass,wrapwidth);
  //}
 }
 //window.onresize=function() {
 // if (msie) {
 //  setMinWidth(wrapclass,wrapwidth);
 // }
 //}
}

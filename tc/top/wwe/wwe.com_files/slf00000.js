// 2008/04/22 15:09:29
var ANV='3.12';
var ANDAS='http://an.tacoda.net/creatives';
var ANAXCD=24;
var ANDCC='zzz';
var ANDSA='br';
var ANDEPC17034;
var ANEU='http://anrtx.tacoda.net/e/e.js?';
var ANME=0;
var ANMU='http://anrtx.tacoda.net/dastat/ping.js?';
var ANP=2;
var ANSID=17034;
var ANTCC;
var ANVAD=0;
var AMSC=new Array (ANID);
var AMSDPF;
var AMSLGC=1;
var AMSRID='';
var AMSSID='';
var AMSSRID='';
var AMSTEP='tste';
var AMSTES="tte/blank.gif";
var ANDD='';
var ANDNX=new Array();
var ANID='TID';
var ANAS='http://anad.tacoda.net';
var ANCC=0;
var ANDSAS=1;
var ANDPU='http://anrtx.tacoda.net/rtx/r.js?';
var ANOP='http://anrtx.tacoda.net/opt/r.js';
var ANRDF=0;
var ANVDT=0;
var ANSCC="unescape(document.location.href).toLowerCase()";
var ANSAVN='unescape(document.location.href).toLowerCase()';
var ANTPUD;
var ANTPTG;
var ANURL=0;
var CCLOOKUP22='tev/schedules/television|adfcategoryid=cat-toys|shp/subscriptions|aea/shop/mobile|aea/ringtones|abl/community|aid/shop/dvd|auc/auction|tev/shows|gam/games|shp/shop|abuwwe.com';
var SALOOKUP22='bnchat';
var ANAXLSL='';
var ANXSLAC ;
var ANCB1=0;
var ANCB3=0;
var ANCCT;
var ANRD='';
var ANOO=0;
var ANCCPD=0;
var ANCCSD=0;
var ANCSPD=0;
var ANCSSD=0;
var ANXACU='http://leadback.advertising.com/adcedge/lb?site=695501&betr=tc=';
var ANXCC='ZZZ';
var ANXSACS=1;
var AMSK=new Array();
var AMSN=0;
var AMSVL=new Array();
var ANVDA=0;
var ANVSC='';
var ANVSA='';
var ANDSZ=2;
var ANVSZ=ANDSZ;
var ANVAC='br';
var ANADS=new Array();
ANADS=["468x60a","728x90a","300x250a","120x600a","160x600a","468x60a|728x90a","120x600a|160x600a"];
var ANAXCP;
var ANMSL;
var ANSL;
var axOnSet;
function ANRC(n) {
var cn=n + "=";
var dc=document.cookie;
if (dc.length > 0) {
for(var b=dc.indexOf(cn); b!=-1; b=dc.indexOf(cn,b)) {
if((b!=0) && (dc.charAt(b-1) !=' ')) {
b++;
continue;
}
b+=cn.length;
var e=dc.indexOf(";",b);
if (e==-1) e=dc.length;
return unescape(dc.substring(b,e));
}
}
return null;
}
function ANSC(n,v,ex,p) {
var e=document.domain.split (".");
e.reverse();
var m=e[1] + '.' + e[0];
var cc=n+"=";
if (v !=null)
{
cc +=v;
}
if (ex) {
var exp=new Date;
exp.setTime(exp.getTime()+ex);
cc +=";expires="+exp.toGMTString();
}
if (p) {
cc +=";path="+p;
}
if (m) {
cc +=";domain="+m;
}
document.cookie=cc;
}
function ANGRD() {
if (top !=self || ANRD !='') {
return ANRD;
}
var rf=top.location.href;
var i=j=0;
i=rf.indexOf('/');
i=rf.indexOf('/',++i);
j=rf.indexOf('/',++i);
if (j==-1) {
j=rf.length;
}
r=rf.substring(i,j);
return r;
}
function ANTR(s) {
if (!s) {
return '';
}
s=s.replace(/^\s*/g,'');
s=s.replace(/\s*$/g,'');
return s;
}
function ANEH (m,u,l)
{
var s=ANEU+'m='+escape(m)+'&u='+escape(u)+'&l='+l;
document.write('<SCR'+'IPT SRC="'+s+'" LANGUAGE="JavaScript"></SCR'+'IPT>');
return true;
}
function ANGCC ()
{
var ccc=ANTCC;
if ((ccc==null)         ||
!ccc.match (/^\w{3}$/) )
{
ccc=ANDCC.toUpperCase();
}
return ccc;
}
function TCDA (tc)
{
var kw;
var pb;
if ((tc !=null) && (tc !=''))
{
var pa=tc.split (";");
for (var p=0; p < pa.length; p++)
{
kv=pa[p].split("=");
k=kv[0];
v=kv[1];
if (k!=null) {
k=ANTR(k);
}
if (v!=null) {
v=ANTR(v);
}
var m=k.toUpperCase();
switch (m) {
case ("SA"):
v=v.toLowerCase();
if (v!=null&&v!=''&&v.match(/[a-z]{1,2}/)) {
ANVAC=v;
}
break;
case ("SZ"):
v=v.toUpperCase();
if (v!=null&&v!='') {
ANVSZ=v;
}
break;
case ("CC"):
v=v.toUpperCase();
if (v !=null && v !='')
{
ANTCC=v;
}
break;
case ("SC"):
if (v!=null&&v!='') {
if (v.length > 256) {v=v.substring(0,256);}
ANVSC=v;
}
break;
case ("RD"):
if (v!=null&&v!='') {
if (v.length > 128) {v=v.substring(0,128);}
ANRD=v.toLowerCase();
}
break;
case ("DT"):
ANVDT=1;
break;
case ("ND"):
ANVDT=0;
break;
case ("UD"):
if (v !=null && v !='')
{
ANTPUD=v;
}
break;
case ("TG"):
if (v !=null && v !='')
{
ANTPTG=v;
}
break;
case ("DA"):
ANVDA=1;
break;
case ("AD"):
ANVAD=1;
break;
case ("KW"):
if (v !=null && v !='')
{
kw=v;
}
break;
case ("PB"):
if (v !=null && v !='')
{
pb=v;
}
break;
default:
if (v!=null&&v!='') {
ANCV(k,v);
}
}
}
}
ANPA (pb, kw);
}
function ANPA (pb, kw)
{
if (((ANP & 2) !=0) &&
(ANDEPC17034==null) &&
(ANVDT==1)     &&
(ANOO==0)      )
{
ANDEPC17034=1;
ANVDT=0;
ANGDCC();
ANSDR();
}
if (ANVAD==1)
{
ANVAD=0;
ANGDSA();
ANAP (ANVAC, ANVSZ, pb, kw);
}
if (ANVDA==1)
{
ANDA();
ANVDA=0;
}
}
function ANRTXR()
{
if (ANSL !=null)
{
var tsa=ANSL.split ("|");
if (ANAXLSL !=null)
{
ANAXSC (tsa);
}
ANXSAC (tsa);
}
ANSOCR();
}
function ANAXSC()
{
var xd=null;
var lsa=ANAXLSL.split ("|");
var asa=ANSL.split ("|");
for (lsi=0; lsi < lsa.length; lsi++)
{
for (asi=0; asi < asa.length; asi++)
{
if (lsa[lsi]==asa[asi])
{
if (xd==null)
{
xd='1#' + lsa[lsi];
}
else
{
xd +='|' + lsa[lsi];
}
break;
}
}
}
var cp=(ANAXCP==null) ? "/" : ANAXCP;
ANSC ('AxData', xd, ANAXCD * 3600000, cp);
ANSC ('Axxd', '1', null, cp);
if (axOnSet !=null)
{
axOnSet();
}
}
function ANIXSAC (xsa)
{
if ((ANMSL !=null) && (ANMSL !="$"))
{
var msa;
var msi;
var xsi;
if (xsa==null)
{
return true;
}
if (ANMSL !="*")
{
msa=ANMSL.split ("|");
}
else if (ANSL !=null)
{
msa=ANSL.split ("|");
}
for (xsi=0; xsi < xsa.length; xsi++)
{
for (msi=0; msi < msa.length; msi++)
{
if (xsa[xsi]==msa[msi])
{
return true;
}
}
}
}
return false;
}
function ANXSAC (tsa)
{
if (ANXSACS==1)
{
var tsi;
var xsa;
var xsi;
if (ANXSLAC !=null)
{
xsa=ANXSLAC.split ("|");
}
if (ANIXSAC (xsa))
{
var tc='0';
if (xsa==null)
{
for (tsi=0; tsi < tsa.length; tsi++)
{
if (tsa[tsi].length==5)
{
if (tc.length==1)
{
tc='1,' + tsa[tsi];
}
else
{
tc +=',' + tsa[tsi];
}
}
}
}
else
{
for (xsi=0; xsi < xsa.length; xsi++)
{
for (tsi=0; tsi < tsa.length; tsi++)
{
if (xsa[xsi]==tsa[tsi])
{
if (tc.length==1)
{
tc='1,' + tsa[tsi];
}
else
{
tc +=',' + tsa[tsi];
}
break;
}
}
}
}
document.write('<IMG'+' SRC="' + ANXACU + tc + '&bnum=' + Math.floor (Math.random() * 100000) + '" STYLE="display: none" height="1" width="1" border="0">');
}
}
}
function Tacoda_AMS_DDC_addPair(k, v) {
ANCV(k,v);
}
function ANCV(k,v){
AMSK[AMSN]=k;
AMSVL[AMSN]=v;
AMSN++;
}
function ANTCV() {
var TVS="";
for(var i=0; i<AMSN; i++) {
if (!AMSK[i]) {
continue;
}
if (!AMSVL[i]) {
AMSVL[i]='';
}
TVS +="&v_" + escape( AMSK[i].toLowerCase() ) + "=" + escape( AMSVL[i].toLowerCase() ) ;
}
return TVS;
}
function Tacoda_AMS_DDC (tiu, tjv)
{
ANDDC (tiu, tjv);
}
function ANDA() {
var t='';
var e=ANGRD().split(".");
e.reverse();
t=e[1] + '.' + e[0];
if (typeof(ANDNX[t])!='undefined') {
t=ANDNX[t];
}
else {
t=ANDD;
}
var tiu='http://'+AMSTEP+'.'+t+'/'+AMSTES;
ANDDC(tiu,"0.0");
}
function ANDDC (tiu, tjv) {
if (((ANP & 1) !=0) &&
(AMSDPF !=1)    )
{
AMSDPF=1;
var ccc=ANGCC();
var ta="?"+Math.floor (Math.random() * 100000) +"&v="+ANV+"&r="+escape(document.referrer)+"&p="+ ccc +":"+escape(ANVSC);
if (AMSLGC==1) {
ta +="&page="+escape(window.location.href);
}
ta +="&tz="+(new Date()).getTimezoneOffset()+"&s="+ANSID;
if (ANCB3==1)
{
ta+="&ckblk3";
}
if (ANCB1==1)
{
ta +="&ckblk1";
}
else
{
for(var i=0; i<AMSC.length; i++) {
var cl=AMSC[i];
var clv=ANRC(cl);
if(cl !=null) {
ta +="&c_"+escape(cl)+"="+escape(clv);
}
}
}
ANRID()
ta +=ANTCV();
document.write('<IMG'+' SRC="' + tiu + ta + '" STYLE="display: none" height="1" width="1" border="0">');
}
}
function ANRID() {
if (AMSRID !='' && AMSSID !='') {
if (ANRC (AMSRID) !=null) {
AMSSRID=AMSSID + ANRC (AMSRID);
ANCV ("regid", AMSSRID);
}
}
}
function ANDP (tc)
{
if ((ANP & 2) !=0)
{
ANTCC=tc.toUpperCase();
ANVAD=0;
ANVDA=0;
ANCCF();
}
}
function ANV2R (v, rg, psl, ssl, rs, rd)
{
var m;
var oc;
var r;
var rl;
var ss;
var lm="";
var rt=null;
var ra=rg.split("|");
var pi=0;
var si=psl;
var oi=si + ssl;
var miwoo=oi + rs;
var miwo=miwoo + 1;
for (ri=0; (ri < ra.length) && (rt==null); ri++)
{
r=ra[ri];
rl=r.length;
if (rl >=miwoo)
{
oc=r.charCodeAt (oi);
if ((oc < 42) && (oc > 32) && (rl >=miwo))
{
if ((psl==0) || (r[pi]=='A'))
{
m=r.substr (miwo, r.length - miwo);
}
else
{
m=lm.substr (0, r.charCodeAt (pi) - 65);
m=m.concat (r.substr (miwo, r.length - miwo));
}
if ((ssl !=0) && (r[si] !='A'))
{
ss=r.charCodeAt (si) - 65;
m=m.concat (lm.substr (lm.length - ss, ss));
}
switch (r[oi])
{
case "!":
if ((v.length==m.length) && (v.indexOf (m)==0))
{
rt=r.substr (oi + 1, rs);
}
break;
case ")":
if (v.lastIndexOf (m)==(v.length - m.length))
{
rt=r.substr (oi + 1, rs);
}
break;
case "(":
if (v.indexOf (m)==0)
{
rt=r.substr (oi + 1, rs);
}
break;
case "#":
if (v.search (m) !=-1)
{
rt=r.substr (oi + 1, rs);
}
break;
case "&":
if (v.indexOf (m) !=-1)
{
rt=r.substr (oi + 1, rs);
}
break;
}
}
else
{
if ((psl==0) || (r[pi]=='A'))
{
m=r.substr (miwoo, r.length - miwoo);
}
else
{
m=lm.substr (0, r.charCodeAt (pi) - 65);
m=m.concat (r.substr (miwoo, r.length - miwoo));
}
if ((ssl !=0) && (r[si] !='A'))
{
ss=r.charCodeAt (si) - 65;
m=m.concat (lm.substr (lm.length - ss, ss));
}
if (v.indexOf (m) !=-1)
{
rt=r.substr (oi, rs);
}
}
}
lm=m;
}
return (rt==null) ? rd : rt.replace (/^\s+|\s+$/g,"");
}
function ANGDCC ()
{
if (ANCC !=1)
{
ANTCC=ANV2R (eval (ANSCC), CCLOOKUP22, ANCCPD, ANCCSD, 3, ANDCC).toUpperCase();
}
}
function ANGDSA ()
{
if (ANDSAS !=0)
{
ANVAC=ANV2R (eval (ANSAVN), SALOOKUP22, ANCSPD, ANCSSD, 2, ANDSA);
}
}
function ANSDR ()
{
var ccc=ANGCC();
if ((ccc.indexOf (ANXCC) !=0) || (ccc.length !=ANXCC.length))
{
var ANU="";
var xs=0;
if (ANURL==1)
{
ANU="&page=" + escape (window.location.href);
}
if ((ANAXLSL !=null) && (ANRC ('Axxd')==null))
{
xs +=1;
}
if (ANXSACS==1)
{
xs +=2;
}
if (xs > 0 )
{
ANU +="&xs=" + xs;
}
if (ANRDF==1)
{
ANU +="&r=" + ANGRD();
}
if (ANTPTG !=null)
{
ANU +="&tg=" + escape (ANTPTG);
}
if (ANTPUD !=null)
{
ANU +="&ud=" + escape (ANTPUD);
}
document.write ('<SCR'+'IPT SRC="wwe.com_files/rtx.js" LANGUAGE="JavaScript"></SCR' + 'IPT>');
}
ANSME (ccc);
}
function ANSOCR()
{
if ((ANCCT==null) || (ANCCT < (new Date().getTime() / 1000)))
{
document.write ('<SCR'+'IPT SRC="" LANGUAGE="JavaScript"></SCR' + 'IPT>');
}
}
function ANOR()
{
}
function ANSME (ccc)
{
if (ANME==1)
{
ANME=0;
document.write ('<SCR'+'IPT SRC="wwe.com_files/opt.js" LANGUAGE="JavaScript"></SCR' + 'IPT>');
}
}
function ANAP (ac, sz, pb, kw)
{
var au;
if (sz <=ANADS.length)
{
ANVAC=ac.toLowerCase();
if (ANVAC=='zz')
{
au='<IMG SRC="' + ANDAS + '/PSA_' + ANADS[sz-1] + '.gif">';
}
else
{
au='<SCR'+'IPT SRC="'+ANAS+'/cgi-bin/ads/';
if (sz==4||sz==5||sz==7)
{
au+='sk';
}
else
{
au+='ad';
}
if (window.self !=window.top)
{
nf='';
}
else
{
nf='NF/';
}
au+=ANSID+ANVAC+'.cgi/v=2.1S/sz='+ANADS[sz-1];
if (pb !=null)
{
au+='/xd='+pb;
}
if (kw !=null)
{
au+='/k='+kw;
}
au+='/NZ/'+Math.floor (Math.random() * 100000)+'/'+nf+'RETURN-CODE/JS/" LANGUAGE="JavaScript"></SCR'+'IPT>';
}
document.write (au);
}
ANVSZ=ANDSZ;
}
document.dartTData="";
document.dartTDataValue=ANRC ("TData");
if (document.dartTDataValue !="" && document.dartTDataValue !=null)
{
var f=document.dartTDataValue.split ("|");
for (var i=0; i < f.length; i++)
{
document.dartTData +="kw=" + f[i] + ";";
}
}
document.dartTid=ANRC ("TID");
if (document.dartTid !="" && document.dartTid !=null)
{
document.dartTid="u=" + document.dartTid + ";";
}
try
{
var tc;
var tcdacmd
if (tcdacmd !=null)
{
tc=tcdacmd + ';da';
}
else
{
tc=';da';
}
tcdacmd='';
TCDA (tc);
}
catch (e)
{
ANEH (e,'','');
}

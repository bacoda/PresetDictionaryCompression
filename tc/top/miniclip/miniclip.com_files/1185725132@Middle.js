function OAS_RICH(position) {
if (position == 'Middle') {
document.write ('<script type="text/javascript">\n');
document.write ('var uri = ');
document.write ("'");
document.write ('http://imp.tradedoubler.com/imp?type(js)pool(225144)a(1430763)');
document.write ("'");
document.write (' + new String (Math.random()).substring (2, 11);\n');
document.write ('document.write(');
document.write ("'");
document.write ('<sc');
document.write ("'");
document.write ('+');
document.write ("'");
document.write ('ript type="text/javascript" src=');
//document.write ("'");
document.write ('"miniclip.com_files/imp.js"');
//document.write ("'");
document.write (' charset="ISO-8859-1"></sc');
document.write ("'");
document.write ('+');
document.write ("'");
document.write ('ript>');
document.write ("'");
document.write (');\n');
document.write ('</script>');
}
}

function msend(user,place) {
 if (place == null) {
  place = "cse." + "ust." + "hk";
 }
 command = "ma" + "il" + "to:" + user + "@" + place;
 mailWindow = window.open(command, "mail", "location=no");
}
function show(name) {
 document.write(name);
 document.write('@');
 document.write('cse.' + 'ust.' + 'hk');
}
function mmsend(user,place) {
 if (place == null) {
  document.write('<a href="javascript:msend(\'' + user + '\');">');
  show(user);
  document.write('</a>');
 } else {
  document.write('<a href="javascript:msend(\'' + user + '\',\'' + place + '\');">');
  document.write(user);
  document.write('@');
  document.write(place);
  document.write('</a>');
 }
}

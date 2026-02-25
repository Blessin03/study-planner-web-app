const btn = document.getElementById('menuBtn');
const box = document.getElementById('menuPanel');


btn.addEventListener('click', unhide);


function unhide(){box.hidden = !box.hidden;}

function verifyStudentID(sid){
    sid = sid.trim();
    if(sid.length != 10) return false;
    if(sid[0] != '4') return false;
    if( !(Number.isInteger(Number(sid))) ) return false;

}
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


function verifyPwd(pwd){
    pwd= pwd.trim();
    if(pwd.length < 12) return false;

    let hasUpper = false;
    let hasDigit = false;
    let hasSpecial = false;


    for(let c of pwd){
            if(c >= 'A' && c <= 'Z') hasUpper = true;
            else if ( c >= '0' && c <= '9') hasDigit = true;
            else if ( c == '&' || c == '#' || c == '$' || c == '@') hasSpecial = true;
            else return false;
    }



    return  hasUpper && hasDigit && hasSpecial;

const studentLogin = {
    init(){

    },

    toggleMenu(){

    },

 onSubmit(){}
};

}
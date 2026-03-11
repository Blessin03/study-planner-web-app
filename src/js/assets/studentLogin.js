var studentKey = "students";

function verifyStudentID(sid) {

    sid = sid.trim();

    if (sid.length !== 10) return false;
    if (sid[0] !== "4") return false;

    for (var i = 1; i < 10; i++) {
        var c = sid[i];
        if (c < "0" || c > "9") return false;
    }

    return true;
}

function verifyPwd(pwd) {
    if (typeof pwd !== "string") return false;

    pwd = pwd.trim();

    if (pwd.length < 12) return false;

    var hasUpper = false;
    var hasDigit = false;
    var hasSpecial = false;

    for (var i = 0; i < pwd.length; i++) {
        var c = pwd[i];

        var isUpper = c >= "A" && c <= "Z";
        var isLower = c >= "a" && c <= "z";
        var isDigit = c >= "0" && c <= "9";
        var isSpecial = c === "&" || c === "#" || c === "$" || c === "@";

        if (isUpper) hasUpper = true;
        if (isDigit) hasDigit = true;
        if (isSpecial) hasSpecial = true;

        if (!(isUpper || isLower || isDigit || isSpecial)) {
            return false;
        }
    }

    return hasUpper && hasDigit && hasSpecial;
}

function loginStudent(data) {
    var errors = [];

    if (!verifyStudentID(data.sid)) {
        errors.push("Student ID must be 10 characters long, start with 4, and contain only digits.");
    }

    if (!verifyPwd(data.pwd)) {
        errors.push("Password must be at least 12 characters long, contain at least one uppercase letter, one digit, and one special character (&, #, $, @).");
    }

    if (errors.length > 0) {
        return errors;
    }

    var raw = localStorage.getItem(studentKey);
    var students = raw ? JSON.parse(raw) : [];

    for (var i = 0; i < students.length; i++) {
        var student = students[i];

        if (student.studentId === data.sid.trim() && student.password === data.pwd.trim()) {
            var sessionData = {
                firstName: student.firstName,
                lastName: student.lastName,
                studentId: student.studentId
            };

            sessionStorage.setItem("students", JSON.stringify(sessionData));
            return [];
        }
    }

    return ["Invalid Student ID or password."];
}

var StudentLogin = {
    init: function () {
    },

    toggleMenu: function () {
        var btn = document.getElementById("menuBtn");
        var box = document.getElementById("menuPanel");

        if (!btn || !box) return;

        box.hidden = !box.hidden;
        btn.setAttribute("aria-expanded", box.hidden ? "false" : "true");
    },

    onSubmit: function () {
        var sid = document.getElementById("sid").value;
        var pwd = document.getElementById("pwd").value;

        var data = {
            sid: sid,
            pwd: pwd
        };

        var errors = loginStudent(data);
        var errorsBox = document.getElementById("loginErrors");

        if (errors.length > 0) {
            var html = "<ul>";

            for (var i = 0; i < errors.length; i++) {
                html += "<li>" + errors[i] + "</li>";
            }

            html += "</ul>";
            errorsBox.innerHTML = html;
        } else {
            errorsBox.innerHTML = "";
        }
    }
};
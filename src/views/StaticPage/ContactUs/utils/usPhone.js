var zChar = new Array(' ', '(', ')', '-', '.','+');
var maxphonelength = 12;
var phonevalue1;
var phonevalue2;
var cursorposition;

function ParseForNumber1(object) {
    phonevalue1 = ParseChar(object.value, zChar);
}
function ParseForNumber2(object) {
    phonevalue2 = ParseChar(object.value, zChar);
}

function backSpacerUP(e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }

    ParseForNumber1(e.target)


    console.log(keycode)
    if (keycode >= 48) {
        ValidatePhone(e.target)
    }
}

function backSpacerDOWN(e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }
    ParseForNumber2(e.target)
}

function ValidatePhone(object) {

    var p = phonevalue1,
        pp = '',
        ppp = '',
        d4 = '',
        d5 = '',
        l30 = '',
        p30 = '',
        p31 = '',
        p40 = '',
        e1 = '',
        e2 = '',
        l40 = '',
        p41 = ''

    p = p.replace(/[^\d]*/gi, "")

    if (p.length < 3) {
        object.value = p
    } else if (p.length == 3) {
        pp = p;
        d4 = p.indexOf('-')
        if (d4 == -1) {
            pp = pp + "-";
        }
        object.value = pp;
    } else if (p.length > 3 && p.length < 6) {
        l30 = p.length;
        p30 = p.substring(0, 3);
        p30 = p30 + "-"

        p31 = p.substring(3, l30);
        pp = p30 + p31;

        object.value = pp;

    } else if (p.length >= 6) {
        l30 = p.length;
        p30 = p.substring(0, 3);
        p30 = p30 + "-"

        p31 = p.substring(3, l30);
        pp = p30 + p31;

        l40 = pp.length<=12?pp.length:11;
        p40 = pp.substring(0, 7);
        p40 = p40 + "-"

        p41 = pp.substring(7, l40);
        ppp = p40 + p41;

        object.value = ppp.substring(0, maxphonelength);

    }

    console.log('object.value',object.value)

}

function ParseChar(sStr, sChar) {
    if (sChar.length == null) {
        zChar = new Array(sChar);
    }
    else zChar = sChar;

    for (let i = 0; i < zChar.length; i++) {
        var sNewStr = "";

        var iStart = 0;
        var iEnd = sStr.indexOf(sChar[i]);

        while (iEnd != -1) {
            sNewStr += sStr.substring(iStart, iEnd);
            iStart = iEnd + 1;
            iEnd = sStr.indexOf(sChar[i], iStart);
        }
        sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);

        sStr = sNewStr;
    }

    return sNewStr;
}

export {backSpacerUP,backSpacerDOWN}
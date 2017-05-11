/**
 * Charge la liste des sites depuis le localStorage
 */
function loadWSList() {
    return JSON.parse(localStorage.getItem("WS"))
}

/**
 * Rempli la liste des sites a partir du JSON
 * @param wsList
 */
function fillWSTable(wsList) {
    var iconProvider = "http://www.google.com/s2/favicons?domain="
    var wsTable = document.getElementById('wsTable')
    for(var i = 0, len = localStorage.getItem("sizeWSList"); i < len; i++){
        tr = document.createElement('tr')

        tdI = document.createElement('td')
        img = document.createElement('img')
        img.src = iconProvider + wsList[i].url
        tdI.appendChild(img)
        tr.appendChild(tdI)

        tdL = document.createElement('td')
        a = document.createElement('a')
        a.href = wsList[i].url
        a.innerHTML = wsList[i].nom
        tdL.appendChild(a)
        tr.appendChild(tdL)

        wsTable.appendChild(tr)
    }
}

/**
 * Lorsqu'il n'y a pas de sites enregistrés
 */
function noWS() {
    var wsTable = document.getElementById('wsTable')
    tr = document.createElement('tr')
    td = document.createElement('td')
    td.innerHTML = "Pas de sites enregistrés"

    tr.appendChild(td)
    wsTable.appendChild(tr)
}

/**
 * Permet d'enregistrer un nouveau site dans le localStorage
 * @param name
 * @param url
 */
function enregistrer(name, url) {
    console.log(name +" : " + url)
    var json = loadWSList()
    var len = localStorage.getItem("sizeWSList")
    if (len === null || json == null){
        json = {
            0 : {
                "url" : url,
                "nom" : name
            }
        }
        len = 0
    }
    else {
        json = JSON.parse(json)
        newElem = {
            "url" : url,
            "nom" : name
        }
        json.push(len, newElem)
    }

    console.log(json)
    localStorage.setItem("WS", JSON.stringify(json))
    localStorage.setItem("sizeWSList", len + 1)
}

/**
 * Main
 */
window.onload = function start() {
    //localStorage.clear()
    if(localStorage.getItem("sizeWSList") !== null){
        console.log(loadWSList())
        fillWSTable(loadWSList())
    }
    else{
        noWS()
    }
}

/**
 * Lorsque l'on valide un nouveau site
 */
document.getElementById('submit').onclick = function () {
    var name = document.getElementById("name").value
    var url = document.getElementById("url").value
    enregistrer(name, url)
    fillWSTable(loadWSList())
}
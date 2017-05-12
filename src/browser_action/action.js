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
    wsTable.innerHTML = ""
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
    getHash(url)
    var json = loadWSList()
    var len = parseInt(localStorage.getItem("sizeWSList"))
    if (len === null || json == null){
        json = {
            "0" : {
                "url" : url,
                "nom" : name
            }
        }
        len = 0
    }
    else {
        newElem = {
            "url" : url,
            "nom" : name
        }
        json[len] = newElem
    }
    localStorage.setItem("WS", JSON.stringify(json))
    localStorage.setItem("sizeWSList", len + 1)
}

/**
 * Obtenir le hash d'un flux RSS
 * @param url
 */
function getHash(url) {
    console.log(getRSSUrl(url))
}

/**
 * Recupere l'URL du flux RSS de la page url
 * @param url
 */
function getRSSUrl(url) {
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var parser = new DOMParser()
            var dom = parser.parseFromString(xmlhttp.responseText, "text/xml")
            var links = dom.getElementsByTagName("link")

            for(var i = 0; i < links.length; i++){
                if (links[i].getAttribute("type") === "application/rss+xml"){
                    return links[i].getAttribute("href")
                }
            }
        }
    }
    xmlhttp.open("GET", url, false );
    xmlhttp.send();
    return xmlhttp.onreadystatechange()
}

/**
 * Main
 */
window.onload = function start() {
    //localStorage.clear()
    if(localStorage.getItem("sizeWSList") !== null){
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
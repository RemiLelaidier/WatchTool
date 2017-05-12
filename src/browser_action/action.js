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
    getLastRssEntry(url)
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
function getLastRssEntry(url) {
    var rssUrl = getRSSUrl(url)
    var rss = getRSS(rssUrl)
    return rss['items'][0]['pubDate']
}

/**
 * Recupere l'URL du flux RSS de la page url
 * @param url
 */
function getRSSUrl(url) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(ajaxRequest(url), "text/xml");

    return link = dom.querySelector('link[type=\'application/rss+xml\']').getAttribute('href');
}

/**
 * Recupere XML du flux RSS
 * @param rssUrl
 */
function getRSS(rssUrl) {
    var finalUrl = "https://api.rss2json.com/v1/api.json?rss_url=http:"+rssUrl;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                return JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.open("GET", finalUrl, false);
    xhr.send(null);
    return xhr.onreadystatechange();
}

/**
 * Execute une requete AJAX sur l'URL
 * @param url
 @returns {}
 */
function ajaxRequest(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);

    return xmlhttp.onreadystatechange();
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
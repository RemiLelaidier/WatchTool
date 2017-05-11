function loadWSList() {
    var wslist = {
        "0" : [
            {"image" : "icon19.png", "url" : "https://www.google.fr", "nom" : "Google"}
            ],
        "1" : [
            {"image" : "icon19.png", "url" : "https://www.grafikart.fr/", "nom" : "Graphikart"}
            ],
        "2" : [
            {"image" : "icon19.png", "url" : "https://codepen.io/", "nom" : "CopePen"}
            ],
        "3" : [
            {"image" : "icon19.png", "url" : "https://www.youtube.com/", "nom" : "Youtube"}
            ],
        "4" : [
            {"image" : "icon19.png", "url" : "https://www.jetbrains.com/", "nom" : "Jetbrains"}
            ],
        "5" : [
            {"image" : "icon19.png", "url" : "https://twitter.com/?lang=fr", "nom" : "Twitter"}
            ],
        "6" : [
            {"image" : "icon19.png", "url" : "https://www.facebook.com", "nom" : "Facebook"}
            ]
    }
    return wslist
}

function fillWSTable(wsList) {
    var pathImg = "../../icons/"
    var wsTable = document.getElementById('wsTable')
    for(var i = 0, len = Object.keys(wsList).length; i < len; i++){
        tr = document.createElement('tr')

        tdI = document.createElement('td')
        img = document.createElement('img')
        img.src = pathImg + wsList[i][0].image
        tdI.appendChild(img)
        tr.appendChild(tdI)

        tdL = document.createElement('td')
        a = document.createElement('a')
        a.href = wsList[i][0].url
        a.innerHTML = wsList[i][0].nom
        tdL.appendChild(a)
        tr.appendChild(tdL)

        wsTable.appendChild(tr)
    }
}

window.onload = function start() {
    var wsList = loadWSList()
    fillWSTable(wsList)
}
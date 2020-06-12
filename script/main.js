//  KÄYTTÄJÄN PAINAESSA ENTER, SUORITA lisaaTuote() --> 'LISAA TUOTE' -PAINIKE
const painaEnter = event => {
    if (event.keyCode == 13) {
        event.preventDefault()
        lisaaTuote()
    }
}
aineInpt.addEventListener('keydown', painaEnter)
hintaInpt.addEventListener('keydown', painaEnter)


// TYHJENNETÄÄN KENTÄT --> 'TYHJENNÄ KENTÄT' -PAINIKE
const tyhjennaKentat = () => { aineInpt.value = ""; hintaInpt.value = ""; aineInpt.focus(); }
resetBtn.addEventListener('click', tyhjennaKentat)

// TYHJENNÄ KENTÄT JA POISTA KAIKKI TUOTTEET LISTASTA --> 'POISTA KAIKKI' -PAINIKE
const tyhjennaTaulukko = () => {
    if (confirm('Haluatko varmasti poistaa kaikki syöttämäsi tiedot?\nTätä toimintoa ei voi perua.')) { // JOS KÄYTTÄJÄ PAINAA 'OK'
        aineInpt.value = ""
        hintaInpt.value = ""
        aineInpt.focus()
        ainelista = [] // TYHJENNETÄÄN TAULUKKO
        tuoteLista.innerHTML = ""
        footer.innerHTML = "Et ole antanut vielä yhtään tuotetta."
    }
}
clearBtn.addEventListener('click', tyhjennaTaulukko)

// VASTAANOTETAAN KÄYTTÄJÄN ANTAMAT SYÖTTEET JA TEHDÄÄN NIISTÄ OBJEKTI, MIKÄLI TARKISTUKSET MENEVÄT LÄPI
// JOS EIVÄT MENE LÄPI, PALATAAN ODOTTAMAAN KELVOLLISIA SYÖTTEITÄ
// KUN OBJEKTI ON ONNISTUNEESTI TEHTY AJETAAN FUNKTIOT SIVUN TULOSTUSTA VARTEN
const lisaaTuote = () => {
    let aine = aineInpt.value.trim()
    let hinta = hintaInpt.value.replace(",", ".")
    if (aine == "") {
        alert("Anna raaka-aineen nimi!")
        aineInpt.value = ""
        aineInpt.focus()
        return
    }
    else if (!(/^\d+(\.\d+)?$/.test(hinta))) {
        alert("Anna hinnaksi kokonais- tai desimaaliluku")
        hintaInpt.value = ""
        hintaInpt.focus()
        return
    }
    let hintaFloat = parseFloat(hinta).toFixed(2)
    let aineObj = { aine: aine, hinta: hintaFloat }
    lisaaListaan(aineObj) // LISÄÄ OBJEKTI LISTAAN --> lisaaListaan()
    hintaInpt.value = "" // TYHJENNÄ KENTÄT
    aineInpt.value = ""
    aineInpt.focus() // SIIRRÄ KURSORI 'AINE' -KENTTÄÄN

    rakennaTaulukko()
    rakennaFooter()
    tulostaHTML()
}
submitBtn.addEventListener('click', lisaaTuote)

// LISAA KÄYTTÄJÄN SYÖTTÄMÄ TUOTE JA HINTA LISTAAN (ARRAY)
const lisaaListaan = aineObj => {
    ainelista.push(aineObj)
    ainelista = jarjestaLista(ainelista); // JÄRJESTÄ LISTA SUURUUSJÄRJESTYKSEEN --> jarjestaLista()
    halvimmat = etsiHalvimmat(ainelista, ainelista[ainelista.length - 1].hinta)
    kalleimmat = etsiKalleimmat(ainelista, ainelista[0].hinta)
    summa = haeSumma(ainelista)
}

// JÄRJESTÄ LISTA AINEISTA SUURIMMASTA PIENIMPÄÄN
const jarjestaLista = ainelista => ainelista.sort(({ hinta: a }, { hinta: b }) => b - a)

// ETSI HALVIMMAT JA KALLEIMMAT TUOTTEET
const etsiHalvimmat = (arr, etsittavaHinta) => arr.filter(tuote => tuote.hinta === etsittavaHinta)
const etsiKalleimmat = (arr, etsittavaHinta) => arr.filter(tuote => tuote.hinta === etsittavaHinta)

// HAETAAN TUOTTEIDEN SUMMA
const haeSumma = arr => {
    let summa = 0
    for (x in arr) {
        summa += parseFloat(arr[x].hinta)
    }
    return summa.toFixed(2)
}

// KIRJOITETAAN HTML-LISTA (TAULUKKO) TUOTTEISTA
const rakennaTaulukko = () => {
    listaHTMLrivit = ""
    for (x in ainelista) {
        listaHTMLrivit += "<tr><td class='vasemmalle'>" + ainelista[x].aine + "</td><td width='120' class='oikealle'>" + ainelista[x].hinta + " €</td></tr>"
    }
    listaHTMLrivit += "<tr><td class='summa'>Summa:</td><td class='oikealle summa'>" + summa + " €</td></tr>"
}

// RAKENNETAAN FOOTERIN TULOSTUS.
const rakennaFooter = () => {
    // JOS VAIN YKSI TUOTE
    if (ainelista.length == 1) {
        footerHTML = `Olet antanut yhden tuotteen: ${ainelista[0].aine} (${ainelista[0].hinta} €).`
    }
    // JOS KAKSI TUOTETTA, JOILLA SAMA HINTA
    else if (ainelista.length == 2 && ainelista[0].hinta == ainelista[1].hinta) {
        footerHTML = `Olet antanut kaksi tuotetta, ${ainelista[0].aine} ja ${ainelista[1].aine}, jotka ovat saman hintaisia (${ainelista[0].hinta} €).`
    } else if (ainelista.length == 2) { // JOS ERI HINTAISET KAKSI TUOTETTA
        footerHTML = `Olet antanut kaksi tuotetta, joista halvin on <span class="halvin">${halvimmat[0].aine}</span> ja kallein on <span class="kallein">${kalleimmat[0].aine}<span>.`
    }
    // JOS LISTALLA YLI KAKSI TUOTETTA. HUOM! JOS KAIKKI TUOTTEET OVAT SAMAN HINTAISIA, MENEVÄT NE SEKÄ HALVIMPIEN
    // ETTÄ KALLEIMPIEN LISTALLE. 
    else if (ainelista.length > 2) {
        if (halvimmat.length > 1) {
            footerHTML = `Listan halvimmat tuotteet ovat <span class="halvin">${halvimmat[0].aine}</span>`
            for (let i = 1; i < halvimmat.length; i++) {
                footerHTML += `, <span class="halvin">${halvimmat[i].aine}</span>`
            }
        } else {
            footerHTML = `Listalla halvinta on <span class="halvin">${halvimmat[0].aine}</span>`
        }
        if (kalleimmat.length > 1) {
            footerHTML += `.<br>Kalleinta on <span class="kallein">${kalleimmat[0].aine}</span>`
            for (let i = 1; i < kalleimmat.length; i++) {
                footerHTML += `, <span class="kallein">${kalleimmat[i].aine}</span>`
            }
        } else {
            footerHTML += `<br>ja kalleinta on <span class="kallein">${kalleimmat[0].aine}</span>`
        }
    }
}

// TULOSTETAAN HTML-TEKSTIT
const tulostaHTML = () => {
    tuoteLista.innerHTML = listaHTML1 + listaHTMLrivit + listaHTML2
    footer.innerHTML = footerHTML
}


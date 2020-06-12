// NIMETÄÄN HTML-SIVUN PÄÄELEMENTIT JA ALUSTETAAN MUUTTUJIA
const header = document.querySelector('header')
const input = document.getElementById('input')
const output = document.getElementById('output')
const footer = document.querySelector('footer')
const aineInpt = document.getElementById('aineInpt')
const hintaInpt = document.getElementById('hintaInpt')
const submitBtn = document.getElementById('submitBtn')
const resetBtn = document.getElementById('resetBtn')
const clearBtn = document.getElementById('clearBtn')

const listaHTML1 = "<table><thead><tr><th class='vasemmalle'>Raaka-aine</th><th class='oikealle'>Hinta</th></thead><tbody>"
const listaHTML2 = "</tbody></table>"
let ainelista = [], halvimmat = [], kalleimmat = []
let summa = 0
let listaHTMLrivit = "", footerHTML = ""

// KIRJOITETAAN OTSIKOT HEADERIIN
const paaOtsikko = document.createElement('h1')
const alaOtsikko = document.createElement('h3')
paaOtsikko.textContent = 'HEDELMÄSALAATTIBUDJETTI'
alaOtsikko.textContent = 'Syötä raaka-aineiden nimet ja hinnat. Ohjelma näyttää halvimman ja kalleimman raaka-aineen.'
header.appendChild(paaOtsikko)
header.appendChild(alaOtsikko)

// ANNETAAN INPUT KENTILLE LABEL, PLACEHOLDER, FOCUS JA SIZE
document.getElementById('aineInptLabel').textContent = 'Raaka-aine: '
document.getElementById('hintaInptLabel').textContent = 'Hinta: '
aineInpt.placeholder = 'Raaka-aine'
hintaInpt.placeholder = 'Syötä hinta kokonais- tai desimaalilukuna'
aineInpt.focus()

// ANNETAAN PAINIKKEILLE TEKSTI
submitBtn.textContent = 'Lisää tuote'
resetBtn.textContent = 'Tyhjennä kentät'
clearBtn.textContent = 'Poista kaikki'

footer.textContent = 'Et ole antanut vielä yhtään tuotetta'

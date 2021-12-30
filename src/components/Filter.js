import React from 'react'


const Purchase = (props) => {
    
/* Seuraavana kasitellaan maksimi- ja minimihintaa*/
let maxprice = Math.max.apply(Math,props.array.map(x =>x[1])) // tasta saadaan maksimihinta kyseisella ajanjaksolla
let temp = props.array.find(x => x[1] === maxprice )          // loydetaan kyseinen paivamaara aineistosta
let maxpriceday = new Date (temp[0])                         // muodostetaan paivamaara, jolloin maksimihinta esiintyi


let minprice = Math.min.apply(Math,props.array.map(x =>x[1])) // tasta saadaan minimihinta kyseisella ajanjaksolla
let temp2 = props.array.find(x => x[1] === minprice )          // loydetaan kyseinen paivamaara aineistosta
let minpriceday = new Date (temp2[0])                         // muodostetaan paivamaara, jolloin minimihinta esiintyi

    /* Jos maksimihintapaiva on aikaisemmin kuin minimihintapaiva palautetaan tama */
    if (maxpriceday.getTime() < minpriceday.getTime()){
        return (
            <div>Not a good time to be in markets</div>
        )

    }
/* Muutoin muodostetaan parhain aika ostaa ja myyda */
    return (
        <div>Best time to buy bitcoin at {minpriceday.toLocaleDateString('en-uk')} at price of {Math.round(minprice)} euros and best time to sell bitcoin at {maxpriceday.toLocaleDateString('en-uk')} at price of {Math.round(maxprice)} euros </div>
    )

}




const Filter = (props) => {

    
    let startDate = new Date(props.startDate).getTime() // tahan saadaan aloituspaivamaara inputfieldista
    let endDate = new Date(props.endDate).getTime()     // tahan saadaan lopetuspaivamaara inputfieldista.
    
    let priceArray = props.array.prices                 // otetaan talteen taulukko
    
    /* Varokeinona jos ei ole ehditty ladata tietoja */
    if( priceArray === undefined){
        return (
          <div>nothing to see yet</div>
        )
    }
    
    

    



let filtered = priceArray.filter (x => x[0] >=startDate && x[0] <= endDate)             // filtteroidaan aineisto annettujen paivamaarien mukaan


let volumes = props.array.total_volumes.filter(x => x[0]>=startDate && x[0] <= endDate) // filtteroidaan taulukko inputfieldeihin annetuilla paivamaarilla
let volumemax = Math.max.apply(Math,volumes.map(x => x[1]))                             // Etsitaan maksimivoluumi
let alkio =  volumes.find(x => x[1] === volumemax )                                     // Yhdistetaan maksimivoluumi paivamaaraan
let paiva = new Date(alkio[0])                                                          // muodostetaan paivamaara tamanmukaisesti



/** Seuraavana silmukka joka kasittelee hinnanlaskun.
 * Toimii siten etta asetetaan ensimmaisen paivan arvo vertailtavaksi
 * jos nykyisen paivan arvo on pienempi kuin edellisen
 * lisataan tama arvo nykyinen taulukkoon ja asetetaan edellinen muuttujan arvoksi nykyisen paivan arvo
 * sitten verrataan nykyinen taulukon kokoa pisin taulukon kokoon, jos isompi niin silloin kopioidaan
 * jos nykyinen arvo on isompi niin edellinen muuttujalle asetetaan kyseinen arvo ja nykyinen taulukko tyhjennetaan */ 
let filtered2 = filtered.map(x => x[1]) // helpompi kasitella kun ei ole nested array
let edellinen = filtered2[0] // Asetetaan alkuarvo
let nykyinen = [] // Taulukko, jossa on nykyiset arvot
let pisin = []    // Taulukko, jossa kaikista pisimmat arvot.

for (let i = 1; i < filtered2.length; i++) {
    if(filtered2[i] < edellinen){
        nykyinen.push(filtered2[i])
        
        edellinen = filtered2[i]
    }

if(nykyinen.length > pisin.length){
    pisin = nykyinen
    
}
if(filtered2[i] > edellinen){
edellinen = filtered2[i]
nykyinen = []
}

}



    return (
        <div>
        price of bitcoin decreased {pisin.length} days in a row in given date range 
        <div>highest trading volume was {Math.round(volumemax)} euros at date of {paiva.toLocaleDateString('en-uk')}</div>
        <Purchase array = {filtered} />
        </div>
    )

}
export default Filter
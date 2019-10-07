# Arbeidskrav 1 - Oppgave AD Hierarki

_**Firmaet Hamar Fotball og Gulv AS har leid deg inn som konsulent når firmaet deres skal inn med nytt datasystem.**_

_**Dette er et firma med 340 ansatte. Firmaet selger ting og tang og er delt inn i 5 avdelinger. Avdelingene i firmaet er: Administrasjon, Ham-Kam, lager, snekkere og støtteapparat. Halvparten av de ansatte sitter på stasjonære og halvparten bruker bærbare.**_

## Oppgave 1

_**Beskriv hvordan du vil sette opp domenet med OU’er for enklest mulig administrasjon.**_


![AD tabellHierarki](https://image.larsenjr.no/2019-09-17_pLlCDC.png)



Som tabellen viser har man domene `HamarFotballGulvAS.local`. Heretter ville jeg delt opp slik at man har en `OU` for hele bedriften, for så å dele opp igjen bedriften i de respektive avdelingene. Dette kan være lurt for å skille bedrifter, hvis det skal være flere tredjepartsbedrifter som skal ha tredjepartstilgang til noen applikasjoner. For å skille mellom hvilken PC de ansatte jobber på, deler man de respektive maskinene (`Laptops og Desktops`) inn i hver `OU`.  På toppnivå legges alle ansatte inn i en felles gruppe ved navn`G_HamarFotballGulvAS`. 
Videre ut på avdelingene deles de opp i sine respektive grupper på hver avdeling `G_Administrasjon`, `G_HamKam` , `G_Lager`, `G_Snekker`, og `G_Stotteapparat`. Brukerne ligger også under hver avdeling, men de er tilknyttet de gruppene og rettighetene igjennom grupper, avhengig om det er på domenenivå (`Global rights`) eller på `OU-nivå`.

Som standard på Desktops og Laptops har man datamaskinnavn der man ser type maskin, hvilken avdeling maskinen tilhører og et identifikasjonsnummer.

Det vil si at eksempel Laptop `LSTO0101` vil ha følgende identifikasjon:

![Identifikasjon](https://image.larsenjr.no/2019-09-18_nStDjA.png)

Hierarkiet ser da slik ut: 

![ADTabellHierarkiVisio](https://image.larsenjr.no/2019-09-18_6jG4CX.png)


## Oppgave 2 og 3

_Les deg opp på gruppenesting (IGDLA)
Her er noen sider med bra info, Google gjerne mer info selv:_

- https://medium.com/tech-jobs-academy/igdla-and-you-a-fledgling-s-guide-to-nesting-e09b748e3a60
- https://www.techveze.com/developing-a-group-management-strategy/

_**Hvordan vil du ved hjelp av gruppenesting (IGDLA-prinsippet) styre tilgangen til delte mapper for de forskjellige avdelingene?**_

For å styre tilgangen til delte mapper kan man legge en hovedgruppe på toppen for å ha permissions herifra.
Deretter legger man sub-gruppene inn i avdelingen for å styre tilgangen. Hvis man også vil at bare noen skal ha tilgang til de delte mappene kan man bruke undergruppene til å styre tilgangen.

Med denne tildelingen slipper man å sette mange permissions på mappa, og hvis noen ikke jobber der lenger kan man bare fjerne personen fra gruppa istedenfor å fjerne alle. Det er også lettere hvis det er andre som ikke jobber i bedriften til å legge til disse i en separat mappe for å delegere tilgangen til disse mappene. Det er også viktig med navngivning slik at man har styr på hvem som har tilgang til hva.

## Oppgave 4

_**Ekstra: Hvordan ville du satt opp egne hjemmeområder for brukerne?**_
Info: https://community.spiceworks.com/how_to/83327-setting-up-home-folder-permissions-for-active-directory

Du kan sette opp egne hjemmeområder ved enten `netlogon` eller ved `group policy`. 
Ved å sette homefolder på hver bruker må man legge til denne commanden: `\\ipadresseserver\mappenavn\%username%.`. Når du setter homefolder gjennom group policy må man være sikker på at alle brukerne er lagt til i OU-en eller gruppen du setter group policyen. Hvis du ikke er helt sikker på hvilke rettigheter mappen har kan du kjøre et `powershell` script som resetter mapperettigheter.  Mapperettigheter legger du under `Properties/Security/Advanced` på den respektive mappa. 

NB! Det er viktig å skru AV `inheritance` når man har gitt rettigheter. 

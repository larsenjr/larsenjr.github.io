
# AD Hierarki Del II

- [AD Hierarki Del II](#ad-hierarki-del-ii)
	- [Utgangspunkt](#utgangspunkt)
	- [1. Mappeoppsett fellesområder.](#1-mappeoppsett-fellesomr%c3%a5der)
		- [Drive maps](#drive-maps)
	- [2. GPO - Komplekse passord og CMD](#2-gpo---komplekse-passord-og-cmd)
		- [CMD](#cmd)
	- [4. Melde inn klient uten internettilgang](#4-melde-inn-klient-uten-internettilgang)
  
## Utgangspunkt
- _Brukerne skal ha fellesområder og det skal settes opp med IGDLA strukturen._
- _Det skal være passordkompleksitet til alle brukere_
- _CMD skal kun kunne åpnes av adminstrasjon_
- _Det skal meldes inn en klient uten at den har tilgang til internett_

## 1. Mappeoppsett fellesområder.
* * *
| | Grupper ||||||
| :-----: | :-----: | :----: | :-----: | :-----: | :-----: | :-----: | :----: |
| | | **Administrasjon** | **Ham-Kam** | **Lager** | **Snekker** | **Støtteapparat** |
| | **Administrasjon** | WRITE | READ | - | - | - |
| Mapper | **Ham-Kam** | READ | WRITE | - | - | READ |
| | **Lager** | READ | - | WRITE | READ | - |
| | **Snekker** | READ | - | READ | WRITE | - |
| | **Støtteapparat** | READ | READ | - | - | WRITE |
| | **Felles** | WRITE | READ | READ | READ | WRITE |



Gruppene er satt slik at man får en fellesgruppe der alle er medlem. I dette tilfelle er gruppen `HamarFotballGulvAS`. Videre har jeg navngitt gruppene slik de er lette å forstå. Jeg har lagt opp slik at alle avdelingen har en `navnestandard` for grupper. Jeg har også satt gruppenavn så READ er de som trenger lesetilgang, mens WRITE har skrivetilgang. Det vil si at navnestandarden blir `G_READ_HamKam` der G står for gruppe, READ for lesetilganger og `HamKam` for avdelingen. Ved at man legger det opp sånn er det lett å bare legge til brukerne i de tilgangene de skal ha. 

![BrukerogOU](https://image.larsenjr.no/2019-09-26_Kr5xHX.png)

Jeg har satt `domain users` som "base" til alle shared mapper med `READ` rettigheter som default. De som skal ha `WRITE` tilgang setter jeg på `security` under hver respektive mappe.

![RettigheterShare](https://image.larsenjr.no/2019-09-26_4NJXcQ.png)


Jeg satte "Hovedgruppa" til hele bedriften som `READ` på fellesmappen. Dette er fordi `G_WRITE` tilgangene blir "overwrite" på de som bare har read så de også får `WRITE` tilgang. Du kan se oversikten på hvordan jeg har satt det under:

| |Mappe| READ |WRITE|
|:----:|:----:|:----:|:----:|
||Administrasjon| Domain Users| G_WRITE_Administrasjon|
||HamKam| Domain Users| G_Write_HamKam|
|**Hamarfelles**|Lager| Domain Users |G_WRITE_Lager|
||Snekker |Domain Users| G_WRITE_Snekker|
||Stotteapparat |Domain Users| G_WRITE_Stotteapparat|
||Felles | Domain Users |G_WRITE_Administrasjon, G_WRITE_Stotteapparat|

### Drive maps
* * *

Jeg brukte GPO Drive maps for å mounte opp fellesområder. Drive maps kjøres når brukeren logger på. Jeg valgte å mappe bare `hamarfelles` som ligger direkte på `C:\` drive for å så delegere tilganer derifra gjennom `share`. Gjennom `Group Policy Editor` finner man drive maps gjennom: `User Configuration --> Preferences --> Windows Settings --> Drive Maps`. Jeg mounta gjennom D: så den starter der. 

![DriveMaps](https://image.larsenjr.no/2019-09-26_lS0Npx.png)

Når man kjører en test blir resultatet slik:
(Jeg satte opp `hjemmeområder` i forrige oppgave)

![SnippetHomeFelles](https://image.larsenjr.no/2019-09-26_dW8fob.png)

Brukeren `Mummi Trollet` i støtteapparat får dette resultatet:
![Result](https://image.larsenjr.no/2019-09-26_qM6Dmf.png)

Mens `Ståle Solbakken` i Hamkam får dette:
![Result](https://image.larsenjr.no/2019-09-26_2GE8fN.png)

 Avhengig av rettigheter som er satt på mappen
![Rights](https://image.larsenjr.no/2019-09-26_inLBcR.png)

## 2. GPO - Komplekse passord og CMD

Oppgaven skal ha komplekse passord som vil si at det skal være et minimuskrav til antall tegn, bokstaver og tall. Ideelt sett kan man sette denne til `10-12`, men jeg satte den til 8 tegn. Du kan også bruke AD sin `default domain policy` som er  `7` tegn, men jeg valgte å lage en helt separat en for å vite hvor det ligger og hva det ligger under


### CMD
* * *
Alle brukerne utenom administrasjon skulle heller ikke ha tilgang til `CMD`. Jeg satte først policyen på alle `OU-ene`, men fikk et hint om at det var lettere å sette policyen på toppen, også delegere at administrasjon skulle ha tilgang gjennom en ny `policy`. Strukturen ble da slik:

![GPOStruktur](https://image.larsenjr.no/2019-09-26_OsFHCQ.png)


## 4. Melde inn klient uten internettilgang

For å melde inn en klient uten internettilgang brukte jeg `djoin` kommandoen. Det man gjør er å forteller om en klient som skal meldes inn i AD ved hjelp av kode.
```powershell
djoin /provision /domain dcstian /machine Win10Kli /savefile c:\users\administrator\dekstop\win10blob.txt
```
- `/Provision` brukes for å provisjonere en klient.
- `/domain` brukes for å definere hvilket domene klienten skal være i.
- `/machine` definerer hvilket maskinnavn klienten skal ha. 
- `/savefile c:\users\administrator\desktop\win10blob.txt` definerer filen som skal overføres til klienten og hvor den skal lagres på serveren, samt navnet på filen tilslutt. 

Jeg brukte `Google Drive` for å overføre filen til klienten. For å melde inn klienten i AD uten internett kjører man denne kommandoen.
```powershell
djoin /requestodj /loadfile c:\users\stian\downloads\win10blob.txt /windowspath %systemroot% /localos
```
- `requestodj` brukes for å Requeste tilgang til domene. `ODJ` står for `Offline Domain Join`
- `/loadfile` brukes for å laste inn fila man fikk fra AD. 
- `/windowspath` definerer system path på Windows image. 
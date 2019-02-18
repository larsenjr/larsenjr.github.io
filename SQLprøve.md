#MYSQL Prøve



## 1.1 Strukturer data i tabeller etter normaliseringsprinsippet (3. normalfrom). Lag et diagram som viser tabellstrukturen. Diagrammet må vise tydelig relasjoner, primærnøkler og fremmednøkler. 

### Skriv en kort begrunnelse om valg av struktur, alt skal legges ved i besvarelsen.


![Modeller](img/modell.png)

Jeg har valgt å sette opp tre tabeller der man bruker medlemsID som løpsID og postnummer som id i medlemsregisteret. Dette er for å skille data og det gjør det lettere. Det vil da si at det integreres med postnummeret og medlemsID slik at man ser hvilket medlem som har løpt hva. 

## 1.2Lag SQL-skript som viser:	

### A) Medlemsregister der du sorter på kjønn og alder.
Spørring

![Spørring12A](img/sporring12A.png)

Resultat:
 
![Resultat12A](img/resultat12A.png)

### B) Resultatliste for et enkelt løp.

Spørring

![Spørring12B](img/sporring12B.png)

Resultat:
 
![Resultat12B](img/resultat12B.png) 

## 1.3 Ta en komplett backup av databasen med data og lever denne på FRONTER
Backup blir lagt til i fronter også

 
## 2. Vis med bilder og tekst hvordan du kan ta backup og legge tilbake en backup av en database.
#### Importere en database:
Trykk først på «data import/restore»

 ![Dataimport1](img/dataimport.png)
 

1.	Trykk på «import from «Self-contained-file»
2.	Velg hvilken database du skal importere.

![Dataimport2](img/importself.png)


Klikk på «Start import» og databasen er importert.

 ![Dataimport3](img/startimport.png)

#### Exportering:
Trykk på «data export»

![Dataexport1](img/dataexport.png)


Velg hvilken database du vil exportere. 

![Dataexport2](img/dataexport1.png)
 
Du kan også velge hvilke tabeller du vil ha med i exporteringa

![Dataexport3](img/exporttable.png)
 

 ![Dataexport4](img/exportdesc.png)

 
1.	Kryss av for «export to self-contained file» 
2.	Velg hvor du vil lagre filen og navngi den. 
3.	Kryss av på «Include Create Schema



### Du har brukt diagramverktøyet til designe en database i MySQL. Du gjør endringer på diagrammet etter du har generert databasen (schemas).  Hvordan får du enkelt "overført" denne endringen til databasen (schemas)?

Når du bruker modeller og endrer databasen i modellen bruker du «forward engineer» for å oppdatere databasen.

![Reverseeng](img/reverseeng.png)
 
Eller hvis du er i databasen under «schemas» og har endret databasen igjennom kode, kan du trykke på «reverse engineer» for å automatisk lage modeller andre veien. 
 

## 4. Lag en spørring som finner alle kunder som begynner på bokstaven "C" og holder til i USA. 

Spørring:

![SporringCogUSA](img/spørringCogUSA.png)


Resultat:
 
![ResultatCogUSA](img/resultatUsa.png)


## 5. Lag en spørring der du regner ut total summen for de enkelte ordrene. 
 
Spørring:

![ResultatCogUSA](img/sporringTotal.png)


| Resultat fra prøve:| Mitt resultat:|
| :-: | :-: |
| ![ResultatProve](img/resultat1Prove.png) | ![ResultatMeProve](img/resultatMeProve.png) |
          		 

## 6. Lag en spørring som viser ordrene som er mindre enn gjennomsnittet. 


Spørring:
 
![SporringLess](img/sporringGjennomsnitt.png)

Resultat:
  

![ResultatLess](img/resultatGjennomsnitt.png)


Den andre gir resultat: 
 
![ResultatLess](img/resultatgjennomsnitt2.png)

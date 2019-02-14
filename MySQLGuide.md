# GUIDE - Hvordan koble SQL Workbench med Visual Studio (Databaseforbindelse)

_Før du starter må det installeres noen programmer som skal brukes når du skal sette opp en databaseforbindelse. I denne guiden bruker vi Visual Studio Community, Visual studio kan lastes ned her: (_[_https://visualstudio.microsoft.com/_](https://visualstudio.microsoft.com/)_)_ _Du skal laste ned IDÈ for Community._

_Det må også lastes ned en MySQL Workbench, database og en MySQL server. Dette kan lastes ned her:_ [_https://dev.mysql.com/downloads/installer/_](https://dev.mysql.com/downloads/installer/)

_Tilslutt må det lastes ned en database for testing eller lage en enkel database selv. En eksempeldatabase kan lastes ned her:_ [_http://www.mysqltutorial.org/mysql-sample-database.aspx_](http://www.mysqltutorial.org/mysql-sample-database.aspx)

_Når dette er installert er du klar til å starte på guiden. Lykke til!_

1. 1 Installering av MySQL biblioteker (MySQL Installer)

Det må lastes ned et bibliotek eller «plugins» for at du skal få koblet opp MySQL og Visual Studio sammen. Alt dette ligger i MySQL installer som du har lastet ned før du begynte på denne guiden her. Vi starter med å legge inn Connector/NET.

## 1.1 MySQL bibliotek (Connector/NET Versjon 6.9.12)

Det er to måter å installere MySQL bibliotek på. Vi starter med den enkleste gjennom MySQL installer.

For å installere dette gjennom MySQL installer bør installasjonen se slik ut. (Se bilde under)

![MySQLInstallAdd](mysqlinstalladd.png)

Start med å klikke «add» før du navigerer deg til «MySQL connectors» for å så finne «Connector/NET   Connector/NET 8.0.»


Legg så til denne i høyre fane og trykk next for å installere. Trykk «Execute» tilslutt for å legge til i bibliotektet og installere.


Du kan også laste ned Connector.NET ved å gå til denne siden og velge riktig operativsystem og versjon: [https://dev.mysql.com/downloads/connector/net/6.9.html](https://dev.mysql.com/downloads/connector/net/6.9.html)


NB! Husk at du må restarte Visual Studio hvis du har dette oppe mens installasjonen pågår. Når installasjonen er ferdig åpner du Visual studio igjen.

## 1.2 Oppsett i Visual Studio Community 2017


Først må det lages et prosjekt. Prosjektet finner du på startsiden eller oppe på «file»  «New»  også «new project


Det er viktig når du velger prosjekt at du velger «Windows Forms App (.NET Framework)» for at det er denne du skal jobbe med.


1. Du setter navn på hva prosjektet skal hete.
2. Velg hvor du vil lagre prosjektet

### 1.2.1 Sette referanse til SQL biblioteket:

For at du skal få til databaseconnection trenger vi å legge til Connector/NET i prosjektet.

Vi gjør dette ved å legge til en referanse. Referanser finner du ved å trykke på «view»  og velger «solution Explorer».


Når denne vises i programmet på høyre side, «høyreklikk» på «references» og velg «add reference» under «Solution» fanen.


Søk etter «mysql» i søkemenyen til høyre og «huk» av MySql.Data i menyen til venstre. Trykk OK når du har huket den av.


Biblioteket er nå lagt til i Visual Studio.

Når du har lagt til biblioteket trenger det å legges til en «Class» for å lage en bedre visuell kode. En «Class» brukes til å koble MySQL til at man får hentet ut data.




Legg til en class og kall denne for «DatabaseConnection.cs». Klikk «add» når du har valgt klasse og lagt et navn for den.


Den vil da åpne et nytt vindu i Visual Studio. For at C# skal bruke biblioteket du la til, må vi legge til et par setninger som sier dette. Øverst har vi noen setninger som starter med «using». La setningene der ligge, men skriv inn imellom siste setning i «using» og «namespace»:


Det vil da se slik ut i mitt eksempel:


Når du har lastet ned programmet må det defineres tilkobling til databasen du skal koble til. Dette gjør du ved å skrive inn følgende i «class» etter:

Det skal nå se slik ut (uten kommentarer):

Det må også legges inn en måte å åpne og lukke forbindelsen til databasen. Dette bruker du «void» til.

For å åpne «connection» skriver du inn under det du akkurat skrev:

Og for å lukke:

Koden vil da se slik ut etter du har skrevet dette inn:


## 1. 2 Lage enkel GUI

For å lage et GUI gå tilbake til «Form1.cs» eller hva du kalte din «Windows form».


Legg til et «DataGridView» og legg til en «knapp». Du legger til ved å dra de inn på «Windows Formen».


1. For å endre teksten som står i knappen eller boksene, klikk på «objektet» og endre navn på «Text» som finnes i «Properties».

2. Du kan også velge å endre navn på object-designet for å få en bedre forståelse av hva det er og kjenne objektet igjen, men jeg velger å ikke gjøre det her.

Når du har fått endret størrelse og valgt hvor stort hvert objekt er, dobbeltklikk på knappen du la inn.

Du vil nå tas til en ny side. Under «private void button1\_Click&quot; skriv inn:


Legg inn et «dataTable» object

Det skal nå se slik ut:


Gå tilbake til filen «Mysqlconnection.cs»


Når du har gått tilbake skriv under «connection.close bracketen:


Det skal nå se slik ut:


Tilslutt legger du til en «Close connection» for å lukke databasen under din «Form.cs[Design]»

Legg til tekstunder «dt = DB.ReadValue();»


Det skal nå se slik ut:

Du skal nå ha konfigurert databaseforbindelse med SQL Workbench. Husk at SQL Workbench må kjøres i bakgrunnen for at forbindelsen skal fungere til Visual Studio.

# GUIDE - Hvordan koble SQL Workbench med Visual Studio (Databaseforbindelse)

_Før du starter må det installeres noen programmer som skal brukes når du skal sette opp en databaseforbindelse. I denne guiden bruker vi Visual Studio Community, Visual studio kan lastes ned her: (_[_https://visualstudio.microsoft.com/_](https://visualstudio.microsoft.com/)_)_ _Du skal laste ned IDÈ for Community._

_Det må også lastes ned en MySQL Workbench, database og en MySQL server. Dette kan lastes ned her:_ [_https://dev.mysql.com/downloads/installer/_](https://dev.mysql.com/downloads/installer/)

_Tilslutt må det lastes ned en database for testing eller lage en enkel database selv. En eksempeldatabase kan lastes ned her:_ [_http://www.mysqltutorial.org/mysql-sample-database.aspx_](http://www.mysqltutorial.org/mysql-sample-database.aspx)

_Når dette er installert er du klar til å starte på guiden. Lykke til!_

## 1. 1 Installering av MySQL biblioteker (MySQL Installer)

Det må lastes ned et bibliotek eller «plugins» for at du skal få koblet opp MySQL og Visual Studio sammen. Alt dette ligger i MySQL installer som du har lastet ned før du begynte på denne guiden her. Vi starter med å legge inn Connector/NET.

## 1.2 MySQL bibliotek (Connector/NET Versjon 6.9.12)

Det er to måter å installere MySQL bibliotek på. Vi starter med den enkleste gjennom MySQL installer.

For å installere dette gjennom MySQL installer bør installasjonen se slik ut. (Se bilde under)

![MySQLInstallAdd](https://i.imgur.com/KI0TWDu.png)

Start med å klikke «add» før du navigerer deg til «MySQL connectors» for å så finne `«Connector/NET` &rarr; `Connector/NET 8.0.12»`

![MySQLInstallDrag](https://i.imgur.com/Bq2k3ue.png)

Legg så til denne i høyre fane og trykk next for å installere. Trykk «Execute» tilslutt for å legge til i biblioteket og installere.

![MySQLInstallDrag](https://i.imgur.com/qcshk6L.png)

Du kan også laste ned `Connector.NET` ved å gå til denne siden og velge riktig operativsystem og versjon: [https://dev.mysql.com/downloads/connector/net/6.9.html](https://dev.mysql.com/downloads/connector/net/6.9.html)

![MySQLInstallNET](https://i.imgur.com/Y86DpUK.png)

NB! Husk at du må restarte Visual Studio hvis du har dette oppe mens installasjonen pågår. Når installasjonen er ferdig åpner du Visual studio igjen.

## 1.3 Oppsett i Visual Studio Community 2017


Først må det lages et prosjekt. Prosjektet finner du på startsiden eller oppe på «file» &rarr; «New» &rarr; «new project»

<div style="text-align: center;">
    <img src="https://i.imgur.com/zKojKu7.png" alt="MySQLGuide1" />
    <img src="https://i.imgur.com/fCq0IO7.png" alt="MySQLGuide2" />
</div>

Det er viktig når du velger prosjekt at du velger `«Windows Forms App (.NET Framework)»` for at det er denne du skal jobbe med.

![MySQLNewProjectApp](https://i.imgur.com/Ek3LJcP.png)

1. Du setter navn på hva prosjektet skal hete.
2. Velg hvor du vil lagre prosjektet

### 1.3.1 Sette referanse til SQL biblioteket:

For at du skal få til databaseconnection trenger vi å legge til `Connector/NET` i prosjektet.

Vi gjør dette ved å legge til en referanse. Referanser finner du ved å trykke på `«view»` &rarr; og velger `«solution Explorer»`.

![MySQLSolExp](https://i.imgur.com/N9xGe6T.png)


Når denne vises i programmet på høyre side, `«høyreklikk»` på `«references»` og velg `«add reference»` under `«Solution»` fanen.

![MySQLAddRef](https://i.imgur.com/cTWeQ8I.png)


Søk etter `«mysql»` i søkemenyen til høyre og «huk» av `MySql.Data` i menyen til venstre. Trykk `OK` når du har huket den av.

![MySQLData](https://i.imgur.com/dJWrEEq.png)

Biblioteket er nå lagt til i Visual Studio.

Når du har lagt til biblioteket trenger det å legges til en «Class» for å lage en bedre visuell kode. En «Class» brukes til å koble MySQL til at man får hentet ut data.

![MySQLClass](https://i.imgur.com/gWDrwBb.png)


Legg til en class og kall denne for `«DatabaseConnection.cs»`. Klikk «add» når du har valgt "class" og lagt et navn for den.

![MySQLClass1](https://i.imgur.com/awM2IZd.png)

Den vil da åpne et nytt vindu i Visual Studio. For at C# skal bruke biblioteket du la til, må vi legge til et par setninger som sier dette. Øverst har vi noen setninger som starter med «using». La setningene der ligge, men skriv inn imellom siste setning i `«using»` og `«namespace»`:

```Csharp
using MySql.Data.MySqlClient;
using System.Data;
```

Det vil da se slik ut i mitt eksempel:

![MySQLExample1](https://i.imgur.com/Yt2UEBX.png)

`System.Data` vil vi bruke senere i guiden, så vi legger den til her nå med en gang. 
Når du har lastet ned programmet må det defineres tilkobling til databasen du skal koble til. Dette gjør du ved å skrive inn følgende i «class» etter `class`:
```csharp
MySqlConnection connectionsql = new MySqlConnection("server=localhost;user id=studentdb;database=student");
```

Det skal nå se slik ut (uten kommentarer):
![MySQLConnector](https://i.imgur.com/MBca4nD.png)

Det må også legges inn en måte å åpne og lukke forbindelsen til databasen. Dette bruker du `«void»` til.

For å åpne `«connection»` skriver du inn under det du akkurat skrev:
```csharp
public void openConnection()
        {
            connectionsql.Open();
        }
```

Og for å lukke `«connection»`:
```csharp
public void CloseConnection()
        {
            connectionsql.Close();
        }
```

Koden vil da se slik ut etter du har skrevet dette inn:

![MySQLExample2](https://i.imgur.com/8mdCiEp.png)

## 1. 4 Lage enkel GUI

For å lage et GUI gå tilbake til `«Form1.cs[Design]»` eller hva du kalte din «Windows form».

![MySQLWindowsForm](https://i.imgur.com/1Off8MT.png)

Søk etter `«DataGridView»` og `«button»`. Du drar disse til vinduet og velger størrelsen på disse selv. 
Har du Du legger til ved å dra de inn på «Windows Formen».

![MySQLToolBox](https://i.imgur.com/TcQQEpy.png)

1. For å endre teksten som står i knappen eller boksene, klikk på «objektet» og endre navn på `«Text»` som finnes i «Properties» i høyre hjørne. 

2. Du kan også velge å endre navn på object-designet for å få en bedre forståelse av hva det er når vi bruker dem og kjenne objektet igjen, men jeg velger å ikke gjøre det her.

![MySQLProperties](https://i.imgur.com/A1EGTfw.png)

Når du har fått endret størrelse og valgt hvor stort hvert objekt er, dobbeltklikk på knappen du la inn.

Du vil nå bli sendt til en ny side. Under `«private void button1\_Click&quot;` skriv inn:
```csharp
DataTable dt = new DataTable();
            databaseconnector DB = new databaseconnector();


            DB.openConnection();
            dt = DB.ReadValue();
```

Det skal nå se slik ut:

![MySQLDataTable](https://i.imgur.com/ETvWyWh.png)

Gå tilbake til filen `«Mysqlconnection.cs»`

![MySQLForm1](https://i.imgur.com/jnWi3G9.png)

Når du har gått tilbake skriv under «connection.close bracketen:
```csharp
public DataTable ReadValue()
        {
            DataTable dt = new DataTable();
            MySqlDataAdapter da = new MySqlDataAdapter("Select* from student", connectionsql);
            da.Fill(dt);
            return dt;
        }
```
DataTable navngir en variabel for `«DataTable»`, mes `«Databseconnector»` lar oss skrive inn kode som skal sende en spørring til databasen.
`«Data.Fill(dt)»` skriver ut det vi spør etter, mens `«return dt»` velger hva som verdiene er som returernes i `«DataGridView1»` 

Det skal nå se slik ut:

![MySQLExample3](https://i.imgur.com/vOBUP9J.png)

Tilslutt legger du til en «Close connection» for å lukke databasen under din `«Form.cs[Design]»`

Legg til tekstunder `«dt = DB.ReadValue();»`
```csharp
dataGridView1.DataSource = dt;
DB.CloseConnection();
```

Det skal nå se slik ut:

![MySQLExample4](https://i.imgur.com/GfykLDk.png)

Du skal nå ha konfigurert databaseforbindelse med SQL Workbench. Husk at SQL Workbench må kjøres i bakgrunnen for at forbindelsen skal fungere til Visual Studio.

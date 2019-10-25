# Oppgave GPO og Powershell

- [Oppgave GPO og Powershell](#oppgave-gpo-og-powershell)
  - [GPO](#gpo)
    - [Oppgave 1. GPO – hvilke måter kan vi bestemmer hvem de skal gjelde for og hva er forskjellen? (WMI-filtering, ILT og security-filtering)](#oppgave-1-gpo-%e2%80%93-hvilke-m%c3%a5ter-kan-vi-bestemmer-hvem-de-skal-gjelde-for-og-hva-er-forskjellen-wmi-filtering-ilt-og-security-filtering)
    - [Oppgave 2. Hvordan ser man GPO-er som er i bruk?](#oppgave-2-hvordan-ser-man-gpo-er-som-er-i-bruk)
    - [Oppgave 3. Lag en GPO som installerer Google Chrome på maskinene som er i Hamar Fotball og Gulv, dokumenter prosessen.](#oppgave-3-lag-en-gpo-som-installerer-google-chrome-p%c3%a5-maskinene-som-er-i-hamar-fotball-og-gulv-dokumenter-prosessen)
    - [Oppgave 4. Vis hvordan man stenger ute en bruker hvis han har fått virus (eller lignende)](#oppgave-4-vis-hvordan-man-stenger-ute-en-bruker-hvis-han-har-f%c3%a5tt-virus-eller-lignende)
    - [Oppgave 5. Hvordan kan man se alle shares på serveren (hidden eller ikke) fra klient-maskinen? Vis med screenshot](#oppgave-5-hvordan-kan-man-se-alle-shares-p%c3%a5-serveren-hidden-eller-ikke-fra-klient-maskinen-vis-med-screenshot)
    - [Oppgave 6. Powershell:](#oppgave-6-powershell)

## GPO

### Oppgave 1. GPO – hvilke måter kan vi bestemmer hvem de skal gjelde for og hva er forskjellen? (WMI-filtering, ILT og security-filtering)

Når man spesifiserer GPO kan man spesifisere grupper eller brukere for å implementere Security Filtering. Du kan bestemme "target" som for eksempel operativsystem, prosessor eller installerte programmer. Gjennom WMI filter og på Item-Level Targeting kan man spesifisere innstillinger på GPO-er.

**WMI-Filtering**

Windows Management Instrumentation (WMI) brukes til å "applye" GOP basert på settings til "target computer". WMI baserer seg blant annet på modell, operativsystem og tidssone. Ulempen med WMI er at det er ressurskrevende hvis man setter mange regler. Derfor burde man begrense WMI-filtering til færrest mulige GPO-er. Det fungerer bare når spørringen din gir et resultat.

Eksempel WMI filter:

`Select * from Win32_OperatingSystem WHERE Version LIKE "10.%"`

**Item-level Targeting(ILT)**

Med Item-Level Targeting får man bedre kontroll over programmene som brukes med spesifiserte innstillinger. Ved at man defierer hvilke grupper eller programmer som hver bruker skal ha kan man styre tilgangen bedre. Item level targeting gjelder bare for enkeltregler. Du kan bruke Item-Level targeting til mye, men det brukes mest når man skal delegere avdelinger eller grupper for å styre hvilke nettverkstasjoner de skal ha. Item-level targeting er ikke like ytelseskrevende som GPO-filtrering.

**Security filtering**

Secuirity filtering er brukt for å "applye" policy settings til bare en del av brukerne og maskinene. Som standard kan alle authenticated users få policy settings.Filtreringen gjelder for hele GPO-en og er gyldig for selve objektet. De som skal ha tilgang trenger lesetilgang til GPO. Det er ytelseskrevende og tar lang tid å prosessere når du benytter security filtering.

### Oppgave 2. Hvordan ser man GPO-er som er i bruk?

Trykk på `Win + R`

Skriv `rsop.msc`

![Rsop.msc](https://image.larsenjr.no/2019-10-17_lHE8dV.png)

![](https://image.larsenjr.no/2019-10-17_8ggV96.png)

**CMD:**

`gpresult /Scope User /v` for å sjekke policyes på brukeren

Scroll til `Resultant Set of Policies for user` for å se hvilken `GPO`-er som er i bruk.

![Resultant Set of Policies for user](https://image.larsenjr.no/2019-10-25_Jcjwon.png)

eller hvis du skal ha policies på klienten bruker du:

`CMD i administratormode`

Skriv:

`gpresult /Scope Computer /v`

### Oppgave 3. Lag en GPO som installerer Google Chrome på maskinene som er i Hamar Fotball og Gulv, dokumenter prosessen.

Først må man laste ned en MSI ifra Google for å bruke denne igjennom GPO. Den finnes [her](https://cloud.google.com/chrome-enterprise/browser/download/)

![Chrome](https://image.larsenjr.no/2019-10-22_QRDG1w.png)

Lag ny policy:

![NewPolicy](https://image.larsenjr.no/2019-10-22_U7Ft5i.png)

Gå til:
`User Configuration -> Polices -> Software Settings -> Software Installation`

Legg til MSI filen og trykk "assigned". Når du har godtatt, gå inn på `properties` og trykk `install application on logon`:

![ApplyLogon](https://image.larsenjr.no/2019-10-22_UMB0Ki.png)

Når brukeren logger på neste gang vil det installeres Google Chrome før brukeren kommer inn i desktop.

**a. Det er ikke mulig å bruke Item-Level Targeting på Software-Installation policier. Hvordan kunne vi styrt at kun maskiner med Windows 10 fikk installert Chrome? (uten bruk av bare security-filtering)**

Man kan bruke WMI filter som filtrerer på windows 10.

Kommandoen er som følger:

```sql

select * from Win32_OperatingSystem where Version like "10.%"

```

**b. Er det noen alternativer til å bruke GPO for å installere programmer på klientene?**

Du kan bruke `System Center Configuration Manager`. Ved at man har tilgang til dette på alle klientene kan kunder velge hvilke programmer som de selv skal bruke og skal ha tilgang til og installere de fra System Center. Du kan også bruke FTP-server, men det er kanskje vanskelig for brukerne å ordne selv hvis de ikke har noe spesielt GUI.

Hvis ikke kan man bruke `Ninite Pro` der man deployer til alle klienter.

[Ninite](https://ninite.com/)

### Oppgave 4. Vis hvordan man stenger ute en bruker hvis han har fått virus (eller lignende)

Man kan enten ta å disable hele brukeren slik at man ikke får tilgang når han logger ut. Du kan også legge til `Software Restriction Policies` som gjør at hvis brukeren har virus at den fjerner tilgangen til å kjøre `.exe` filer og at den kan skrive til forskjellige mapper. Mappene som bør fjernes av `SRP` er `%appdata%`, shares som er på serveren og `%temp%`.

![](https://image.larsenjr.no/2019-10-24_dbG3BA.png)

### Oppgave 5. Hvordan kan man se alle shares på serveren (hidden eller ikke) fra klient-maskinen? Vis med screenshot

Mappa er sharet, men er hidden for users.

![HiddenProperties](https://image.larsenjr.no/2019-10-22_Kkjvxu.png)

Hidden share vises ikke her når man skriver inn `\\172.16.15.5` som er IPen til serveren.

![HiddenShares](https://image.larsenjr.no/2019-10-22_lq59Nq.png)

Skriv: `net view /all \\172.16.15.5` i CMD

`172.16.15.5` er IPen til serveren.

![NetView](https://image.larsenjr.no/2019-10-22_rPDmsM.png)

Alle shares kommer opp, de som er hidden har et `$` etter seg.

### Oppgave 6. Powershell:

**a. Deaktiver og aktiver en bruker i AD.**

**Aktivere AD-Account**

```powershell
Enable-ADAccount -Identity Stilar "CN=Stian Larsen,CN=Users,DC=dcstian,DC=local"
```

**Deaktivere AD-Account**

```powershell
Disable-ADAccount -Identity Stilar "CN=Stian Larsen,CN=Users,DC=dcstian,DC=local"
```

**b. Bytt passord på en bruker.**

**AD bruker**

```powershell
Set-ADAccountPassword -Identity "Stian" -Reset -NewPassword (ConvertTo-SecureString -AsPlainText "passord123" -Force)

```

**Lokalbruker**

```powershell
$Password = Read-Host -AsSecureString
$UserAccount = Get-LocalUser -Name "Stian"
$UserAccount | Set-LocalUser -Password $Password
```

**c. Bytt gruppemedlemskap på en bruker**

```powershell
Add-ADGroupMember -Identity Users -Member Stian
```

```powershell
Remove-ADGroupMember -Identity Administrators -Member Stian
```

**d. Lag en liste i excel med 5 brukere, legg inn disse i AD ved hjelp av PowerShell.**

```powershell

## Import active directoy module for å kjøre AD cmdlets

Import-Module activedirectory

# Lagrer dataen fra ADUsers.csv i $ADUsers variabelen

$ADUser = Import-Csv -Delimiter ";" -Path "C:\Users\Administrator\Downloads\importAccount.csv"

# Kjører gjennom hver rad med brukerdetaljer i CSV fil

foreach ($User in $ADUser) {
    $Username = $User.username
    $Password = $User.password
    $Firstname = $User.firstname
    $Lastname = $User.lastname
    $OU = $User.$User.ou
    $Initials = $User.initials
    $Description = $User.description
    $Email = $User.email
    $Streetaddress = $User.streetaddress
    $City = $User.city
    $Zipcode = $User.zipcode
    $State = $User.state
    $Country = $User.country
    $Telephone = $User.telephone
    $Company = $User.company
    $Password = $User.Password

# Sjekker om brukeren er lagt allerede. Hvis den er lagt, skriver den ut en "Warning" om at brukeren allerede eksisterer i "Active Directoy"
 if (Get-ADUser -F {SamAccountName -eq $Username})
    {
        Write-Warning "A User account with username $Username already exist!"
    }
 else
    {
    New-ADUser -SamAccountName $Username -UserPrincipalName "$Username@hamarfotballgulvas.local" -Name "$Firstname $Lastname" -GivenName $Firstname -Surname $Lastname -Enabled $true -DisplayName "$Lastname, $Firstname" -Path $OU -Initials $Initials -Description $Description -City $city -Company $company -State $state -StreetAddress $streetaddress -OfficePhone $telephone -EmailAddress "$Username@hamarfotballgulvas.local" -Title $Jobtitle -AccountPassword (ConvertTo-SecureString $Password -AsPlainText -Force) -ChangePasswordAtLogon $true
    }
}

```

Fil som blir importert gjennom Powershell i AD. Ikke alle feltene blir fylt ut, men det som er default og det som passer med powershell scriptet. 

[ImportAccounts.csv](https://image.larsenjr.no/2019-10-25_b2DxWZ.csv)

Resultat

![ResultatPSImport](https://image.larsenjr.no/2019-10-25_NETFd0.png)

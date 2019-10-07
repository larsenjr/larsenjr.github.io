# Arbeidskrav II - Nettverkskommunikasjon II

[Arbeidskrav II.pdf](:/20b8f970cd4d4723827160d688440839)

- [Arbeidskrav II - Nettverkskommunikasjon II](#arbeidskrav-ii---nettverkskommunikasjon-ii)
  - [1. Planlegging nettverk](#1-planlegging-nettverk)
    - [1.1 Med utgangspunkt i vedlegg 1. Lag VLSM skjema for de aktuelle nettene.](#11-med-utgangspunkt-i-vedlegg-1-lag-vlsm-skjema-for-de-aktuelle-nettene)
    - [Oversikt over IP-adresser](#oversikt-over-ip-adresser)
  - [2. NAT](#2-nat)
  - [3. Sett opp DHCP på router 5](#3-sett-opp-dhcp-p%c3%a5-router-5)
  - [5. Hvor lang avstand mener EIGRP det er fra router 5 til public-server nettet?](#5-hvor-lang-avstand-mener-eigrp-det-er-fra-router-5-til-public-server-nettet)
  - [6. Hva er oppgaven til STP i det switchede nettverket til venstre?](#6-hva-er-oppgaven-til-stp-i-det-switchede-nettverket-til-venstre)
  - [7. Hvilken sikkerhet gir NAT-oppsettet på router 5?](#7-hvilken-sikkerhet-gir-nat-oppsettet-p%c3%a5-router-5)
  - [8. Hva slags fordeler gir VLAN-oppsettet her oss?](#8-hva-slags-fordeler-gir-vlan-oppsettet-her-oss)
  - [9. Hvilken vei tar en pakke fra VLAN salg til Public nett servere? Hvordan kan du verifisere dette fra klienten?](#9-hvilken-vei-tar-en-pakke-fra-vlan-salg-til-public-nett-servere-hvordan-kan-du-verifisere-dette-fra-klienten)
  - [10. Beskriv hvordan du verifiserer det samme fra router0.](#10-beskriv-hvordan-du-verifiserer-det-samme-fra-router0)
  - [11. På hvilket lag i OSI-modellen finner vi IP-adressering?](#11-p%c3%a5-hvilket-lag-i-osi-modellen-finner-vi-ip-adressering)
  - [12. Forklar prinsippet med Encapsulation i forbindelse med nettverkskommunikasjon.](#12-forklar-prinsippet-med-encapsulation-i-forbindelse-med-nettverkskommunikasjon)
  - [13.Enheter fra VLAN salg skal kunne pinge servere i Public nett. De andre routerene skal ikke kunne gjøre dette. Hvordan vil du løse det? Gjør og forklar.](#13enheter-fra-vlan-salg-skal-kunne-pinge-servere-i-public-nett-de-andre-routerene-skal-ikke-kunne-gj%c3%b8re-dette-hvordan-vil-du-l%c3%b8se-det-gj%c3%b8r-og-forklar)
  - [14. Enheter i VLAN forskning skal kunne kjøre http og FTP mot server i VLAN salg, men ikke omvendt.](#14-enheter-i-vlan-forskning-skal-kunne-kj%c3%b8re-http-og-ftp-mot-server-i-vlan-salg-men-ikke-omvendt)
  - [Vedlegg 1](#vedlegg-1)
  
## 1. Planlegging nettverk
### 1.1 Med utgangspunkt i vedlegg 1. Lag VLSM skjema for de aktuelle nettene.

Tilsammen blir det 9 LAN nettverk. 6 av dem har to hosts for det var lettest å dele de opp slik. 
Routerne som skulle ha en SerialPort er også satt opp  med det med en modul som heter `NM-4A/S`.

| LAN |       Enhet        |    NettID    |     VLAN     | Antall brukere |     Subnett     | CIDR | Wildcard  | 1.brukbare adresse | Siste brukbare |  Broadcast   | Antall tilgjengelige hosts |
| :-: | :----------------: | :----------: | :----------: | :------------: | :-------------: | :--: | :-------: | :----------------: | :------------: | :----------: | :------------------------: |
| #1  |      Switch1       |   10.0.0.0   | 90 FORSKNING |       87       | 255.255.255.128 | /25  | 0.0.0.127 |      10.0.0.1      |   10.0.0.126   |  10.0.0.127  |            126             |
| #2  |      Switch0       |  10.0.0.128  |   80 SALG    |       80       | 255.255.255.128 | /25  | 0.0.0.127 |     10.0.0.129     |   10.0.0.254   |  10.0.0.255  |            126             |
| #3  | Router4 - Switch4  | 220.82.12.0  | Public nett  |       28       | 255.255.255.224 | /27  | 0.0.0.31  |    220.82.12.1     |  220.82.12.30  | 220.82.12.31 |             30             |
| #4  | Router5 - Router0  | 220.82.12.32 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.33    |  220.82.12.34  | 220.82.12.35 |             2              |
| #5  | Router 0 - Router2 | 220.82.12.36 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.37    |  220.82.12.38  | 220.82.12.39 |             2              |
| #6  |  Router0-Router2   | 220.82.12.40 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.41    |  220.82.12.42  | 220.82.12.43 |             2              |
| #7  | Router2 - Router3  | 220.82.12.44 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.45    |  220.82.12.46  | 220.82.12.47 |             2              |
| #8  |  Router3-Router1   | 220.82.12.48 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.49    |  220.82.12.50  | 220.82.12.51 |             2              |
| #9  | Router1 - Router4  | 220.82.12.52 |      -       |       2        | 255.255.255.252 | /30  |  0.0.0.3  |    220.82.12.53    |  220.82.12.54  | 220.82.12.55 |             2              |

### Oversikt over IP-adresser
 | Interface | IP-adresse |
 |:-----------:|-----------:|
| **Router5** | 
FastEthernet 0/0.80 | 10.0.0.1
 | FastEthernet 0/0.90 | 10.0.0.129
 | FastEthernet 0/1 | 220.82.12.33
**Router0** |  | 
 | FastEthernet 0/0 | 220.82.12.34
 | FastEthernet 0/1 | 220.82.12.41
 | Serial 1/0 | 220.82.12.37
**Router2** |  | 
 | FastEthernet 0/0 | 220.82.12.42
 | FastEthernet 0/1 | 220.82.12.45
**Router3** |  | 
 | FastEthernet 0/0 | 220.82.12.46
 | FastEthernet 0/1 | 220.82.12.49
**Router1** |  | 
 | FastEthernet 0/0 | 220.82.12.50
 | FastEthernet 0/1 | 220.82.12.53
 | Serial 1/0 | 220.82.12.38
**Router4** |  | 
 | FastEthernet 0/0 | 220.82.12.54
 | FastEthernet 0/1 | 220.82.12.1
 **Switch4** |  | 
 | FTP-server | 220.82.12.2
 | Web-server | 220.82.12.3
 | DNS-server | 220.82.12.4

## 2. NAT
**_Sett opp NAT på Router 5, FORSKNINGS-VLAN skal ikke kunne bruke NAT._**

Router5 er satt opp med nat overload slik at den `oversetter` nettet til `220.82.12.33` på utsiden av nettverket. 

Kommandoene ligger i `CPT` på `router5`


## 3. Sett opp DHCP på router 5


| NettID | Excluded range | DHCP fra | DHCP til | Interface |
| :----: | :------------: | :------: | :------: |:------: |
|   10.0.0.0      | 10.0.0.1 - .9       |    10.0.0.10    |     10.0.0.126     | FastEthernet 0/0.80 |
|   10.0.0.128   | 10.0.0.129 - .138      |    10.0.0.139    |  10.0.0.254 | FastEthernet 0/0.90|

Jeg har satt opp DHCP gjennom `subinterfaces`. 10.0.0.1 til .126 er sat opp på `FastEthernet 0/0.80` og 10.0.0.129 og opp er satt opp på `FastEthernet 0/0.90`. Begge subinterfaces er satt opp med VLAN på begge. Jeg satt opp DNS til publicservernettet på `10.0.0.0 /25` nettverket, mens den står til `10.0.0.2` i VLAN forskning. Jeg tenkte DNSen på forskningsnettet ikke hadde noe å si for den ikke skulle på public internett uansett. 

Kommandoene ligger i `CPT`  på `router5`.

## 5. Hvor lang avstand mener EIGRP det er fra router 5 til public-server nettet?

_EIGRP er satt opp på alle routerne._

Kommandoene ligger i `CPT`.

![RouterEIGRP](https://image.larsenjr.no/2019-09-17_GhpFTf.png)

Ved å kjøre kommandoen `show ip route EIGRP` mener den at distansen er `40960` gjennom `220.82.12.0 /24` nettet.

## 6. Hva er oppgaven til STP i det switchede nettverket til venstre?

`STP` eller `Spanning Tree Protocol` brukes i det switchede nettverket for at det ikke skal oppstå kollisjoner i nettverket når det er koblet i redundans. Ved at spanning-tree `overvåker` nettverket slår den av porter som gjør at pakkene som sendes går i `loop`. STP kan også brukes til feiltoleranse hvis den aktive porten feiler. Når det er flere enn en connection i en nettverktopology kalkulerer STP veien pakkene går igjennom hver port basert på båndbredde. STP vil da velge den veien som har høyest båndbredde som også blir den porten som er `preferred`.

## 7. Hvilken sikkerhet gir NAT-oppsettet på router 5?

Når vi prater om sikkerhet i NAT kan man bruke NAT for å "spare" plass på det public nettet. Når man setter opp NAT bruker man bare èn public IP for å koble seg på internett. Ved at man bare bruker en IP ser ikke de andre i Public Internett nettverket som er på innsiden. NAT gir bedre fleksibilitet og man får et ekstra "layer" med nettverksikkerhet ved at hosts innenfor NAT-nettverket er ikke tilgjengelig for de andre utenfor med mindre man har lyst til det.

## 8. Hva slags fordeler gir VLAN-oppsettet her oss?

VLAN gjør så vi kan dele opp nettverket i flere nettverk utenom å kjøpe nytt utstyr. Ved å dele opp nettverket i forskningsnettverket og salgsnettverket kan man sette ACL til å blokkere det man ikke vil at det andre nettverket skal ha tilgang til. 
VLANet som er satt opp er fleksibelt slik at man kan angi hvilke porter man vil ha til hvert nettverk selv og det er lettere å administrere. Fordelene er at man også kan styre tilgangen til internett ved hjelp av dette oppsettet av VLAN. 

## 9. Hvilken vei tar en pakke fra VLAN salg til Public nett servere? Hvordan kan du verifisere dette fra klienten?

Hvis man gjører en `traceroute` fra PC0 i VLAN Salg til offentlig servernett går pakken igjennom alle routerne isteden for serialporten som er koblet mellom Router0 og Router1. Mest sannsynlig går den igjennom routerne fordi de har mindre `administrative distance` og mer mer `thrustworthy`. IP-en `220.82.12.2` som det pinges til, er IP-en jeg har satt på FTP-serveren i publicnettet.

![TracertPC0Servernett](https://image.larsenjr.no/2019-09-22_8qKIft.png)

## 10. Beskriv hvordan du verifiserer det samme fra router0.

Du kan enten bruke `show ip route eigrp` for å sjekke om routeren har skapt et `neighborhood` eller skrive inn `traceroute` 220.82.12.2 for å verifisere routen. Du sjekker `neighborhood` for å sjekke hvor routeren sender pakkene. `D` står som `EIGRP` protokoll i routeren,som vil si at den har skapt et `neighborhood` gjennom de andre routernes porter.

![4c05d402657094405a23d4c2ac2248be.png](https://image.larsenjr.no/2019-09-23_AR1Z3S.png)

## 11. På hvilket lag i OSI-modellen finner vi IP-adressering?

Vi finner IP-adressering på LAG 3 i OSI modellen. IP adresseringen brukes av routere for å kommunisere på nettverket.

Pakken blir sendt slik:
| | | | |
| :---: | :---: | :---: | :---: |
| Ip destination (Mottaker) | IP source (Kilde) | Protocol field (eks.024F, TCP) | Data |

På lag 3 finner vi også andre protokoller som ICMP som brukes for feilsøking og ping i nettverket. Under et NAT nettverk vil `IP source` oversettes i routeren til å bli public IP-adresse. 

## 12. Forklar prinsippet med Encapsulation i forbindelse med nettverkskommunikasjon.

Encapsulation brukes for dele opp pakke med ekstra informasjon før de sendes videre opp i OSI-modellen. Det vil si at hvis man sender en pakke med TCP trafikk legges TCP data før det sendes ned på lag3. På lag 3 legges det til IP-adressering før det sendes til lag 2 osv.

## 13.Enheter fra VLAN salg skal kunne pinge servere i Public nett. De andre routerene skal ikke kunne gjøre dette. Hvordan vil du løse det? Gjør og forklar.

Jeg kontrollerer trafikken gjennom ACL for å tillate spesifikk trafikk inn på servernett. jeg valgte FTP, WEB (HTTP), DNS trafikk og ICMP trafikk fordi det var en av oppgavene under. (Oppgave 14.)

VLAN Salg får tilgang til å pinge serverne, men det får ingen andre utenom Router4. grunnen til det er at jeg ikke så noen hensikt med å blokkere for Ping-trafikken på router4. 

Jeg blokkerer ICMP ved å bare tillate ICMP fra IP 220.82.12.33 IP-en. 

I tillegg la jeg til at alle har tilgang til FTP, alle har tilgang til HTTP og alle har tilgang til DNS.

Kommandoene som brukes ligger i `Router4` i `CPT`.

## 14. Enheter i VLAN forskning skal kunne kjøre http og FTP mot server i VLAN salg, men ikke omvendt.

Jeg har valgt å blokkere enhetene i VLAN forskning til å ikke kjøre ftp, http og https trafikk. Jeg kunne blokkert hele nettverket gjennom ACL slik at ingen av enhetene i VLAN salg fikk tilgang. Det gir litt bedre sikkerhet slik at hvis det kommer inn en ny server vil de ikke kunne aksessere denne. Ved at jeg blokkerte bare hosts måtte man inn på routeren og satt ytterligere kommandoer for å blokkere tilgang ytterligere. 

Ettersom det bare var to hosts i Salgsnettet fungerte dette `OK`, men hvis skissen hadde inneholdt 80 hosts hadde jeg bare blokkert hele nettverket for det er lettere å adminstrere. Jeg la også til blokkering for HTTPS med port 443 slik at de ikke når webserveren i det heletatt. Jeg satte opp DNS til å peke til 10.0.0.2.

Kommandoene ligger i `CPT` på `router5`.

## Vedlegg 1

![Vedlegg1](https://image.larsenjr.no/2019-09-17_naqw5n.png)

# OSI Modellen

[Dag 5 OSI-modellen Kap 1 Del 2.pdf](:/d5939db7daee4e7db6eddbadf34e4d34)

  ![](:/13b37dbd766dbb59e697e51c8736abc4)
## Lag 4
Connection oriented

|     |     |
| --- | --- |
|          **TCP** |     |

Connection less

|     |     |
| --- | --- |
| **X**** **  **UDP****     ** |     |

## Lag 3

|     |     |     |     |
| --- | --- | --- | --- |
| Ip destination | Ip source | Protocol field (eks.024F) | Data |

## Lag 2

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| MAC destination | MAC source | E-type field | Data | FCS (RRC) |

FCS bruker for å detektere error I en kommunikasjonsprotokoll. Frames brukes til å sende failoverdata fra source til destination.

Hvordan får man MAC destination? Gjennom ARP.
ARP sender ut en broadcast som spør om MAC-adresse til IP
Broadcast til alle!
FF;FF;FF;FF brukes til layer 2 broadcast

Address Resolution Protocol (ARP) brukes for å «linke» IP-adresser og MAC-adresser. Et broadcast (til MAC-adresse FF:FF:FF:FF:FF:FF) blir sendt ut til alle på nettverket for å spørre om hvilken MAC-adresse som tilhører en IP-adresse.

# OSI-Modellen
## Layer 1 – Det fysiske laget

Det fysiske laget sender og mottar bits gjennom elektriske impulser, lydbølger eller radiobølger. Signalet sendes gjennom coax, fiber eller TP-kabler. Informasjonen kan også sendes trådløst. Laget er ansvarlig for å ha signaliserte funksjoner som forvandler dataen fra bits til en annet enhet i nettverket. Hvordan det sendes kommer ann på hvordan nettverket er satt opp (mesh, star nettverk). Bitsene må fungere både for sender og mottaker for at enheten skal motta dataen.

## Layer 2 – Datalink laget

Datalinklaget tar seg av feilmeldinger og feilretting av dataoverføringer. Laget opererer på MAC-adresser og LLC (Logical Link Control). LLC tar seg av feilretting og flytkontroll. På datalinklaget bruker man «frames». Switcher jobber ofte på datalinklaget for å sende dataen din den skal.

## Layer 3 – Nettverkslaget

Layer 3 har i oppgave å pakke data med IP-datagrammer som inneholder destinasjon og routing gjennom mellomliggende routere. Informasjonen sendes så videre i nettverket som «pakker». Nettverkslaget bruker også pakkeswitching i nettverket. Oppgaven den skal gjøre er å tillate enhetene til å sende pakker i nettverket og levere dem, uavhengig av lengde og ilde til mottakerne. Det er som oftest routere som jobber på nettverkslaget.

De viktigste protokollene i nettverkslaget er IP, ARP og ICMP.

## Layer 4 – Transportlaget

Transportlaget brukes til å sende og motta dataen over nettverket. I transportlaget bruker man TCP og UDP protokollene. TCP sikrer at alle data blir fullstendig gjennomført. I transportlaget legges til et segment

TCP har flytkontroll som gjør at den sjekker om alle pakkene er sendt. Er ikke alle pakkene sendt, vil den gå tilbake og sende pakken på nytt. Ved at man bruker denne får man feilfri kommunikasjon når man sender noe i nettverket. Ved at TCP sikrer flytkontroll, noen forskjellige porter å velge mellom og man har en garanti for at pakkene sendes og mottas i riktig rekkefølge.

UDP er en forbindelsesløs protokoll som sender pakke til den andre enden, men den får ikke noe bekreftelse på at pakken er mottatt. UDP tilbyr begrenset feilreduksjon.
Config IPSEC tunnel VPN

# Config VPN tunnel IPSEC
[TOC]

![Oppsett](https://image.larsenjr.no/2019-10-16_sQRiGv.png)
## Fremgangsmåte:

### Pre-config
Sett navn, IP-er og `default route` på alle routere og enheter. 
Du skal ikke sette ip route på ISP-routeren fordi den skal kjøre sømløst uten at den vet om nettene under routerne.
Et lite eksempel her ifra bildet over:
```
-- Router1 (venstre router)
hostname R1
!
interface g0/1
ip address 172.16.15.10 255.255.255.0
no shutdown
!
interface g0/0
ip address 128.100.200.1 255.255.255.252
no shut
exit

-- Setter default IP route til ISP router.
ip route 0.0.0.0 0.0.0.0 128.100.200.2

-- Router på toppen (ISP)
hostname ISP
!
interface g0/0
ip address 128.100.200.2 255.255.255.252
no shut
!
interface g0/1
ip address 88.88.88.2 255.255.255.252
no shut
!

-- Router2 (høyre router)
hostname R2
interface g0/0
ip address 88.88.88.1 255.255.255.252
no shut
interface g0/1
ip address 192.168.0.1 255.255.255.0
no shut
exit

-- Setter default IP route til ISP router.
ip route 0.0.0.0 0.0.0.0 88.88.88.2
```
### Legge til License
Når man har gjort `pre-config` må routeren ha en `security-package` for at man skal få konfigurert IPSEC. Kommandoen er som følger:

`license boot module c1900 technology-package securityk9`

_NB! Det er ikke alle routerne som støtter denne funksjonen. Hvis det skal konfigureres er det lurt å bruke Cisco 1941 fordi her er denne hvertfall lagt til!
Jeg har ikke testet det på andre routere så vet ikke hvem som støtter det og ikke._

Uansett,

Man kan verifisere om man har `technology-package` ved å skrive:
`show version` og lete etter `securityk9` under security table

![SecurityTable](https://image.larsenjr.no/2019-10-16_yySkIM.png)
Lagre config gjennom `do write` og reboot

NB!
Hvis den ikke virker i CPT må man skrive samme command og legge til `disable`

`license boot module c1900 technology-package securityk9 disable`
`Reboot`

Så re-enabler man packagen med kommandoen over uten `disable`

Lagre config gjennom `do write` og reboot igjen gjennom å skrive `reload`

Når man har rebootet skal man ha `technology-package` `securityk9`

### Definere access-list
Så må man definere access-list på begge routerne for at de skal få lov til å "aksessere" nettverket på andre siden.

Fra R1 (venstre router)
```
access-list 100 permit ip 172.16.15.0 0.0.0.255 192.168.0.0 0.0.0.255
```
Fra R2 (høyre router)
```
access-list 100 permit ip 192.168.0.0 0.0.0.255 172.16.15.0 0.0.0.255
```

### Konfigurere IPSEC på hver side av tunnelen

#### Router 1 - R1
```
-- En gruppe for policyes. Brukes for å spesifisere parametere. Blir det samme som access-list groups.
crypto isakmp policy 10

-- Hvilken kryptering som skal brukes. Kan bruke andre enn aes 256
 encryption aes 256
 
-- Pre-share key
 authentication pre-share

-- "Diffie-Hellman" group som definerer styrke på "key exchange" gjennom connection. Høyere gruppe, jo lenger tar det å sende / kryptere key.
 group 5
!

-- Secret key som legges til når den passerer routeren og går ut på public internett. Passord er "secretkey"
crypto isakmp key secretkey address 128.100.200.1
!

-- Definerer global "preshared key" 
crypto ipsec transform-set R1->R2 esp-aes 256 esp-sha-hmac
!

-- Definerer trafikken som skal gå igjennom. Et "pool" som sendes gjennom interface. 
crypto map IPSEC-MAP 10 ipsec-isakmp 

-- Setter IP-adresse til remote-end. Til interface på den andre routeren. 
 set peer 88.88.88.1
 
-- Diffie-Hellman group som definerer styrke på "key exchange" gjennom connection. Høyere gruppe, jo lenger tar det å sende / kryptere key.
 set pfs group5
 
-- Overstyrer levetid når man er connected til VPN
 set security-association lifetime seconds 86400
 
-- Brukes for å sette navn i "crypto ipsec transform-set". Dette må stemme!
 set transform-set R1->R2 
 
-- Matcher access-list 100 som er definert før. 
 match address 100
!
-- Spesifiserer til interface at de skal bruke "pool" `IPSEC-MAP` for IPSEC
interface GigabitEthernet0/0
 crypto map IPSEC-MAP
!
```
#### Router 2 - R2
```
-- En gruppe for policyes. Brukes for å spesifisere parametere. Blir det samme som access-list groups.
crypto isakmp policy 10
-- Hvilken kryptering som skal brukes. Kan bruke andre enn aes 256
 encryption aes 256
 
-- Definerer global "preshared key" 
 authentication pre-share
 
-- "Diffie-Hellman" group som definerer styrke på "key exchange" gjennom connection. Høyere gruppe, jo lenger tar det å sende / kryptere key.
 group 5
!

-- Secret key som legges til når den passerer routeren og går ut på public internett. Passord er "secretkey"
crypto isakmp key secretkey address 128.100.200.1
!

-- Definerer global "preshared key" 
crypto ipsec transform-set R2->R1 esp-aes 256 esp-sha-hmac
!

-- Definerer trafikken som skal gå igjennom. Et "pool" som sendes gjennom interface. 
crypto map IPSEC-MAP 10 ipsec-isakmp 

-- Setter IP-adresse til remote-end. Til interface på den andre routeren. 
 set peer 128.100.200.1
 
-- "Diffie-Hellman" group som definerer styrke på "key exchange" gjennom connection. Høyere gruppe, jo lenger tar det å sende / kryptere key.
 set pfs group5
 
-- Overstyrer levetid når man er connected til VPN
 set security-association lifetime seconds 86400
 
-- Brukes for å sette navn i "crypto ipsec transform-set". Dette må stemme!
 set transform-set R2->R1

-- Matcher access-list 100 som er definert før. 
 match address 100
!

-- Spesifiserer til interface at de skal bruke "pool" `IPSEC-MAP` for IPSEC
interface GigabitEthernet0/0
 crypto map IPSEC-MAP
!
```

Hvis du er usikker og vil sjekke selv ligger det en tutorial ute av `Danscourses` som forklarer ganske bra. Den finner du [her:](https://www.youtube.com/watch?v=Z7LwU6H5IGE)

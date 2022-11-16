# 1. Skal dokumentere hvilke api-endepunkter (ressurser) som skal brukes #
- api/employees/ <br />
  → api/employees/[id]
- api/weeks/ <br />
  → api/weeks/[id]
- api/years/ <br />

# 2. Skal til hvert api-endepunkt dokumentere hvilke verb som er tilgjengelig. Hva slags forespørsler skal de håndtere. #
- ***api/employees/*** <br />
→ [‘GET’, ‘POST’, ‘PUT’]

- ***api/employees/[id]*** <br />
→ [‘GET’, ‘POST’, ‘PUT’]

- ***api/weeks/*** <br />
→ [‘GET’, ‘POST’]

- ***api/weeks/[id]*** <br />
→ [‘GET’, ‘POST’]

- ***api/years/*** <br />
→ [‘GET’, ‘POST’]

# 3. Skal til hvert api-endepunkt dokumentere responsen og statuskoden for de ulike verbene. Hva slags data skal returneres når det går riktig / feil. #
- ***api/employees/*** <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br />
→ ‘POST’: *“ status: 201, message: ‘ CREATED MESSAGE ’ ”* <br />
→ ‘PUT’: *“ status: 200, message: ‘ CREATED/UPDATED MESSAGE ’ ”*<br />

- ***api/employees/[id]*** <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br />
→ ‘POST’: *“ status: 201, message: ‘ CREATED MESSAGE ’ ”* <br />
→ ‘PUT’: *“ status: 200, message: ‘ CREATED/UPDATED MESSAGE ’ ”*<br />

- ***api/weeks/*** <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br />
→ ‘POST’: *“ status: 201, message: ‘ CREATED MESSAGE ’ ”* <br />

- ***api/weeks/[id]*** <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br />
→ ‘POST’: *“ status: 201, message: ‘ CREATED MESSAGE ’ ”* <br />

- ***api/years*** <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br />
→ ‘POST’: *“ status: 201, message: ‘ CREATED MESSAGE ’ ”* <br />

- ***FELLES ERROR*** <br />
→ ‘ERROR 405’: *“ status: 405, data: ' Method not allowed ' ”* <br />
→ *Flere errors?* <br />

# 4. Skal dokumentere hvilke sider (urler) som skal benytte de ulike APIene og grovt hva som kan gjøres på den enkelte siden. Hvilke sider i "pages" skal opprettes og grovt hva som kan gjøres på de ulike sidene. Kan vurdere å lage en helt enkel low-fi designskisse eller forklare kort hva brukerne skal kunne gjøre på side X, Y og Z samt hvilket api-endepunkt som benyttes. #
## <ins> Forside </ins> ##
- Vise hele året <br />
→ Page: */index* <br />
→ API: */api/years* <br />

## <ins> Ikke forside </ins> ##
- Vise hvem som har ansvaret for en gitt uke <br />
→ Page: */weeks/[id]* <br />
→ API: */api/weeks/[id]* <br />

- Vise dager en gitt person har ansvaret for <br />
→ Page: */employees/[id]* <br />
→ API: */api/employees/[id]* <br />

## <ins> Kan gjøres på forsiden </ins> ##
- Vise hvem som har ansvaret for en gitt periode (uke 2-6)  <br />
→ Page: *???* <br />
→ API: */api/weeks* <br />
→ Beskrivelse: *eget API-kall som tar imot start- og slutt-nummer som parametere og returnerer tilsvarende uker* <br />

- Kunne søke etter et gitt navn  <br />
→ Page: */employees/[id]* <br />
→ API: */api/employees/[id]* <br />
→ Beskrivelse: *hente ID ved å bruke navnet, sende deretter videre til /employee/[id]* <br />

## <ins> Figma skisse: </ins> ##
* Page: /index <br />
![Figma sketch for page /index](sketch.jpg)

* Page: /???/[id] <br />
![Figma sketch for page /???/[id]](sketch.jpg)
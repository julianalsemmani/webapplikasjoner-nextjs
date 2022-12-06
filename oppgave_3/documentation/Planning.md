# 1. Skal dokumentere hvilke api-endepunkter (ressurser) som skal brukes #
**EMPLOYEES**
- api/employees/ <br />
  → api/employees/[id] <br />
  → api/employees/create <br />
  → api/employees/name/[name] <br />

**WEEKS**
- api/weeks/ <br />
  → api/weeks/[id] <br />
  → api/weeks/range

**YEARS**
- api/years/ <br />

**OVERWRITES**
- api/overwrites/ <br />

**REPORT**
- api/report/ <br />

# 2. Skal til hvert api-endepunkt dokumentere hvilke verb som er tilgjengelig. Hva slags forespørsler skal de håndtere. #
**EMPLOYEES**
- ***api/employees*** <br />
→ [‘GET’]

- ***api/employees/[id]*** <br />
→ [‘GET’, ‘PUT’]

- ***api/employees/create*** <br />
→ [‘POST’]

- ***api/employees/name/[name]*** <br />
→ [‘GET’]

**WEEKS**
- ***api/weeks/*** <br />
→ [‘GET’]

- ***api/weeks/[id]*** <br />
→ [‘GET’]

- ***api/weeks/range*** <br />
→ [‘GET’]

**YEARS**
- ***api/years*** <br />
→ [‘GET’]

**OVERWRITES**
- ***api/overwrites*** <br />
→ [‘GET’, 'POST'] 

**REPORT**
- ***api/report*** <br />
→ [‘GET’] 

# 3. Skal til hvert api-endepunkt dokumentere responsen og statuskoden for de ulike verbene. Hva slags data skal returneres når det går riktig / feil. #
**EMPLOYEES**
- ***api/employees/*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: employees ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 500, error: 'Failed getting employees' ”* <br />

- ***api/employees/[id]*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: employee ”* <br />
→ ‘PUT’: *“ status: 200, data: updatedEmployee*<br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 400, error: 'Id is missing' ”* <br />
→ ‘GET’: *“ status: 404, error: 'Employee not found' ”* <br /><br />
→ ‘PUT’: *“ status: 400, error: 'Id not found'*<br />
→ ‘PUT’: *“ status: 400, error: 'Missing data'*<br />
→ ‘PUT’: *“ status: 500, error: 'Failed updating employee by URL'*<br />

- ***api/employees/create*** <br />
*Happy-path* <br />
→ ‘POST’: *“ status: 201, data: createdEmployee*<br /> <br />
*Unhappy-path* <br />
→ ‘POST’: *“ status: 400, error: 'Missing required fields: employeeNum, name, rules'*<br />
→ ‘POST’: *“ status: 409, error: 'Employee already exists'*<br />
→ ‘POST’: *“ status: 500, error: 'Failed creating employee'*<br />

- ***api/employees/name/[name]*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: employee*<br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 400, error: 'Id is missing' ”* <br />
→ ‘GET’: *“ status: 404, error: 'Employee not found' ”* <br />

**WEEKS**
- ***api/weeks/*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: weeks ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 500, error: 'Failed getting weeks' ”* <br />

- ***api/weeks/[id]*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: week ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 400, error: 'Id is missing' ”* <br />
→ ‘GET’: *“ status: 404, error: 'Week not found' ”* <br />

- ***api/weeks/range*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: weeks ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 400, error: 'Query parameters are missing' ”* <br />
→ ‘GET’: *“ status: 403, error: 'Invalid query parameters' ”* <br />
→ ‘GET’: *“ status: 500, error: 'Failed getting weeks by query parameters' ”* <br />

**YEARS**
- ***api/years*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: years ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 500, error: 'Failed getting years' ”* <br />

**OVERWRITES**
- ***api/overwrites*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200, data: overwrites ”* <br />
→ ‘POST’: *“ status: 201, data: createdOverwrite ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 500, error: 'Failed getting overwrites' ”* <br />
→ POST: *“ status: 400, error: 'Missing required fields: dayId, employeeNum' ”* <br />
→ POST: *“ status: 500, error: 'Failed creating an overwrite' ”* <br />

**REPORT** <br />
- ***api/report*** <br />
*Happy-path* <br />
→ ‘GET’: *“ status: 200 ”* <br /> <br />
*Unhappy-path* <br />
→ ‘GET’: *“ status: 500, error: 'Failed downloading report' ”* <br />

**ERROR** <br />
- ***FELLES ERROR*** <br />
→ ‘ERROR 405’: *“ status: 405, data: ' Method not allowed ' ”* <br />

# 4. Skal dokumentere hvilke sider (urler) som skal benytte de ulike APIene og grovt hva som kan gjøres på den enkelte siden. Hvilke sider i "pages" skal opprettes og grovt hva som kan gjøres på de ulike sidene. Kan vurdere å lage en helt enkel low-fi designskisse eller forklare kort hva brukerne skal kunne gjøre på side X, Y og Z samt hvilket api-endepunkt som benyttes. #
## <ins> Forside </ins> ##
- Vise hele året <br />
→ Page: */index* <br />
→ API: */api/years* <br />
→ API: */api/weeks* <br />
→ API: */api/weeks/range* <br />

## <ins> Ikke forside </ins> ##
- Vise hvem som har ansvaret for en gitt uke <br />
→ Page: */weeks/[id]* <br />
→ API: */api/weeks/[id]* <br />

- Vise dager en gitt person har ansvaret for <br />
→ Page: */employees/[id]* <br />
→ API: */api/employees/[id]* <br />

- Opprette en bruker <br />
→ Page: */employees/create* <br />
→ API: */api/employees/create* <br />

- Opprette navn på en bruker <br />
→ Page: */employees/[id]/update* <br />
→ API: */api/employees/[id]* <br />

- Laste ned lunsjlisten i Excel-format  <br />
→ Page: */index* <br />
→ API: */api/report* <br />

- Lage overskrivelser  <br />
→ Page: */weeks/[id]/overwrites* <br />
→ API: */api/overwrite* <br />

## <ins> Kan gjøres på forsiden </ins> ##
- Vise hvem som har ansvaret for en gitt periode (uke 2-6)  <br />
→ Page: */index* <br />
→ API: */api/weeks* <br />
→ API: */api/weeks/range* <br />
→ Beskrivelse: *eget API-kall som tar imot start- og slutt-nummer som parametere og returnerer tilsvarende uker* <br />

- Kunne søke etter et gitt navn  <br />
→ Page: */index* <br />
→ API: */api/employees/name/[name]* <br />
→ Beskrivelse: *hente ansatt ved å bruke navnet, sende deretter videre til /employee/[id]* <br />

## <ins> Figma skisser: </ins> ##
* Page: /index <br />
![Figma sketch for page /index](WEBAPPLIKASJONER_index.png)

* Page: /employees/create <br />
![Figma sketch for page /employees/create](WEBAPPLIKASJONER_create.png)

## <ins> Oppgave 3.5.2: </ins> ##
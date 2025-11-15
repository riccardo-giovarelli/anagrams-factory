# Anagrams Factory
Anagrams Factory generates anagrams and displays them, paginated (optionally, excluding duplicates).

## Table of contents
- [Anagrams Factory](#anagrams-factory)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment](#environment)
    - [First run :hammer:](#first-run-hammer)
    - [Run :point\_right:](#run-point_right)
    - [Stop :hand:](#stop-hand)
  - [Development server](#development-server)
    - [App url](#app-url)
  - [Test](#test)
    - [Backend Test](#backend-test)
    - [Frontend Test](#frontend-test)
  - [Author](#author)
  - [Contacts](#contacts)
  - [License](#license)


## Prerequisites
- Node.js
- Docker

## Environment

### First run :hammer:

1 - From the folder `backend`:

```bash
  yarn
```

2 - From the project root:

```bash
  docker compose up --build
```

### Run :point_right:

From the project root:

```bash
  docker compose up
```

### Stop :hand:

From the project root:

```bash
  docker compose stop
```

## Development server
### App url
`http://localhost:8000/`

## Test

### Backend Test

From the folder `backend`:

```bash
  yarn test
```

### Frontend Test

From the folder `frontend`:

```bash
  yarn yarn cypress open
```

## Author
Riccardo Giovarelli

## Contacts
[![LinkedIn](https://img.shields.io/badge/Linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/riccardo-giovarelli) [![github](https://img.shields.io/badge/github-181717.svg?logo=github&logoColor=white)](https://github.com/riccardo-giovarelli)

## License
[MIT License](https://opensource.org/license/mit/)


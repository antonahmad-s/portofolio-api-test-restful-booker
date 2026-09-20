# Restful Booker API Automation

API automation project built with JavaScript, Mocha, Chai, Axios, AJV, and GitHub Actions.

The project uses the public Restful Booker API to demonstrate a practical API automation setup: reusable API clients, separated test data, positive and negative coverage, response validation, end-to-end checks, and CI execution.

## Project scope

### Authentication

- Login with valid credentials
- Invalid username
- Invalid password
- Missing credentials
- Auth response schema validation

### Booking

- List bookings
- Create booking
- Create booking without optional `additionalneeds`
- Create booking with an incomplete payload
- Get an existing booking
- Get a non-existing booking
- Invalid booking IDs (`999999999`, `0`, `-1`, `abc`)
- Full update with `PUT`
- Partial update with `PATCH`
- PUT without a token
- PUT with an invalid token
- PATCH without a token
- PATCH with an invalid token
- DELETE without a token
- DELETE with an invalid token
- Delete with a valid token
- Verify the booking returns `404` after deletion
- Booking response schema validation

### Health

- `GET /ping` smoke check

### End-to-end

```text
Login
  -> Create booking
  -> Get booking
  -> Full update (PUT)
  -> Partial update (PATCH)
  -> Read again and verify persisted changes
  -> Delete booking
  -> Get booking again and verify 404
```

## API endpoints used

```text
POST   /auth
GET    /booking
GET    /booking/{id}
POST   /booking
PUT    /booking/{id}
PATCH  /booking/{id}
DELETE /booking/{id}
GET    /ping
```

Documentation:
https://restful-booker.herokuapp.com/apidoc/index.html

The regression suite is based on the documented endpoints used by the project. Undocumented filter scenarios such as `firstname`, `lastname`, or date query parameters are not included in the main test suite.

## Project structure

```text
.github/workflows/       GitHub Actions workflow
docs/                    Test strategy
src/clients/             API request layer
src/config/              Environment configuration
src/helpers/             Test data and schema utilities
src/schemas/             JSON schemas
tests/auth/              Authentication tests
tests/booking/           Booking CRUD and authorization tests
tests/health/            API health check
tests/e2e/               End-to-end lifecycle
```

## How it is organized

Tests do not call Axios directly. Request construction lives in the API client layer, while test files focus on scenarios and assertions.

Test data is kept in `src/helpers/testData.js` so the same payloads can be reused across scenarios.

AJV is used for JSON Schema validation on API responses.

Protected booking operations use the Restful Booker token as a cookie. JSON requests also send `Accept: application/json` explicitly.

## Requirements

- Node.js 20+
- npm 10+

## Setup

```bash
git clone https://github.com/antonahmad-s/portofolio-api-test-restful-booker.git
cd portofolio-api-test-restful-booker
npm install
cp .env.example .env
```

Set the required Restful Booker credentials in `.env` before running the authenticated tests.

## Run the tests

Run the full test suite:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

Generate the Mochawesome report:

```bash
npm run test:report
```

Reports are generated under:

```text
reports/api-report.html
reports/api-report.json
```

## CI

GitHub Actions runs linting, API tests, and report generation on pushes and pull requests configured by the workflow.

## Notes about Restful Booker

Restful Booker is a public training/test API. Its data and availability can change.

Some negative tests allow a small set of expected HTTP outcomes where the public service is not fully deterministic. In a controlled production environment, those assertions should be tightened to the exact API contract.

## Next improvements

- Retry handling for transient network errors
- Request and response logging with sensitive values masked
- Smoke and regression test tagging
- OpenAPI contract validation
- Parallel execution
- Docker-based execution
- Additional security checks

## Author

Anton Ahmad Susilo
QA Engineer / Test Automation

GitHub: https://github.com/antonahmad-s

## License

MIT

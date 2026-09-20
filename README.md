# Senior QA API Automation Framework

Production-style API automation portfolio project using **JavaScript, Mocha, Chai, Axios, AJV and GitHub Actions**.

## Why this project

This repository demonstrates senior QA engineering practices beyond basic endpoint checks:

- API client abstraction
- Positive and negative testing
- Authentication
- CRUD coverage
- JSON Schema validation
- Data-driven test data helpers
- End-to-end API lifecycle testing
- Environment configuration
- Linting
- HTML/JSON reporting
- CI pipeline with GitHub Actions

## Application Under Test

**Restful Booker**

- Base URL: https://restful-booker.herokuapp.com
- Documentation: https://restful-booker.herokuapp.com/apidoc/index.html

Main endpoints:

```text
POST   /auth
GET    /booking
GET    /booking/{id}
POST   /booking
PUT    /booking/{id}
PATCH  /booking/{id}
DELETE /booking/{id}
```

> The public service is a learning/test API. Its data and behavior can change, so tests intentionally focus on documented contracts and explicit assertions.

## Architecture

```text
tests
  |
  v
API clients
  |
  v
Axios HTTP layer
  |
  v
Restful Booker
  |
  +--> Status assertions
  +--> Business assertions
  +--> JSON Schema assertions
```

## Project Structure

```text
.github/workflows/       CI pipeline
src/clients/             API abstraction
src/config/              Environment configuration
src/helpers/              Test data and schema utilities
src/schemas/              JSON schemas
tests/auth/               Authentication tests
tests/booking/            CRUD + negative tests
tests/e2e/                End-to-end lifecycle
reports/                   Generated reports
```

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
git clone <your-repository-url>
cd senior-qa-api-automation
npm install
cp .env.example .env
```

## Run tests

```bash
npm test
```

## Run lint

```bash
npm run lint
```

## Generate Mochawesome report

```bash
npm run test:report
```

Report output:

```text
reports/api-report.html
reports/api-report.json
```

## Test Strategy

### Authentication

- Valid credentials
- Invalid username
- Invalid password
- Missing credentials
- Token schema validation

### Booking

- Create booking
- Retrieve booking
- List bookings
- Update booking
- Patch booking
- Delete booking
- Unknown resource
- Invalid authorization

### E2E

```text
Login
  -> Create booking
  -> Get booking
  -> Update booking
  -> Delete booking
  -> Verify deletion
```

## Senior QA Focus

The framework is designed to demonstrate:

1. Separation of test intent from transport implementation.
2. Reusable API clients.
3. Contract/schema validation.
4. Risk-oriented positive and negative coverage.
5. Deterministic test setup where practical.
6. CI execution on every pull request and push.
7. Test reporting as a build artifact.

## Known limitations

The API is a public test service. It may be reset, throttled, or behave differently over time. Some negative assertions intentionally accept a small set of documented/observed HTTP outcomes rather than pretending a public third-party environment is perfectly deterministic.

Before using this repository in a real organization, replace those permissive assertions with the exact contract expected from your controlled test environment.

## Suggested future improvements

- Retry policy for transient network failures
- Request/response logging with secret masking
- Correlation IDs
- Contract testing against OpenAPI
- Parallel execution strategy
- Environment-specific configuration
- Test tagging/smoke/regression suites
- Dockerized execution
- Security checks for secrets
- Performance smoke tests
- Allure reporting

## Portfolio talking points

When presenting this project in an interview, discuss:

- Why an API client layer is preferable to putting Axios calls directly in tests.
- How schema validation catches contract drift.
- How negative tests expose authorization and validation gaps.
- How CI turns the suite into a quality gate.
- Which assertions should be strict versus tolerant when testing an external public service.
- How you would evolve this framework for a production microservices environment.

## License

MIT

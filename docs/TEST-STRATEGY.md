# API Test Strategy

## Scope

Functional API automation for authentication and booking lifecycle behavior.

## Test Levels

- Smoke: authentication + create/read booking
- Regression: full CRUD + negative coverage
- E2E: booking lifecycle

## Quality Risks

- Authentication/authorization failures
- Contract/schema drift
- Incorrect CRUD behavior
- Resource lifecycle inconsistencies
- Validation gaps

## Exit Criteria

For a controlled environment, the recommended release gate is:

- 100% smoke pass
- No critical/high severity defects open
- Regression pass rate agreed by the team
- No schema/contract breaking changes

## Note

This public API is not a release gate for a real product. The criteria above are a template for portfolio demonstration and should be adapted to a real system.

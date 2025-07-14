# Testing Guide

This project uses Vitest for unit testing. The testing setup includes:

## Test Framework

- **Vitest**: Fast unit testing framework with native ES modules support
- **@testing-library/jest-dom**: Additional jest-dom matchers for better assertions

## Running Tests

### Run tests once

```bash
npm run test:run
```

### Run tests in watch mode

```bash
npm test
```

### Run tests with UI

```bash
npm run test:ui
```

## Test Coverage

The current test suite covers:

### Database Service (`src/services/database_service.test.ts`)

- **addPlace()**: Tests successful place addition and error handling
- **getPlaces()**: Tests retrieving all places, empty results, and error scenarios
- **getPlaceById()**: Tests fetching specific places by ID and error cases

#### Test Cases:

- ✅ Successfully add a place
- ✅ Handle errors when adding a place fails
- ✅ Successfully retrieve all places
- ✅ Return empty array when no places found
- ✅ Handle database connection errors
- ✅ Successfully retrieve a place by ID
- ✅ Handle "place not found" errors
- ✅ Handle database timeout errors

## Mocking Strategy

The tests use Vitest's mocking capabilities to:

- Mock the Supabase client completely
- Test isolated functionality without external dependencies
- Simulate various success and error scenarios
- Verify correct method calls and parameters

## Test File Structure

```
src/
├── services/
│   ├── database_service.ts       # Source code
│   └── database_service.test.ts  # Unit tests
└── test/
    └── setup.ts                  # Test setup and configuration
```

## Configuration Files

- `vitest.config.ts`: Main Vitest configuration
- `tsconfig.test.json`: TypeScript configuration for tests
- `src/test/setup.ts`: Test environment setup

## Notes

- Tests run in a jsdom environment to simulate browser behavior
- Environment variables are mocked for testing
- All external dependencies (Supabase) are properly mocked
- Error console outputs during tests are expected for error scenario tests

import { getEmployeeName, getEmployeeUri } from '../oidcSelectors';

describe('when selecting employee name', () => {
    test('should return employee name', () => {

        const oidc = {
            user: {
                id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MjUyNTUzMzgsImV4cCI6MTUyNTI1NTYzOCwiaXNzIjoiaHR0cHM6Ly93d3ctc3lzLmxpbm4uY28udWsvYXV0aCIsImF1ZCI6ImFwcCIsIm5vbmNlIjoiZTc0N2Y0YTExMDI5NDE0ODlhOTlmOWI5YzNjYWIxZGQiLCJpYXQiOjE1MjUyNTUzMzgsImF0X2hhc2giOiJWSi0wSGt0SW9ydTRLRWZXdXg4UlJnIiwic2lkIjoiNzE2NDlkM2JmYzA4YWVlNmRlN2Y0MjNmZTRlMzY0MDMiLCJzdWIiOiIvZW1wbG95ZWVzLzMzMDY3IiwiYXV0aF90aW1lIjoxNTI1MjQ2NzExLCJpZHAiOiJsaW5uIiwiZW1wbG95ZWUiOiIvZW1wbG95ZWVzLzMzMDY3IiwiZmFtaWx5X25hbWUiOiJDYW1wYmVsbCIsImdpdmVuX25hbWUiOiJBZGFtIiwibmFtZSI6IkFkYW0gQ2FtcGJlbGwiLCJlbWFpbCI6ImFkYW0uY2FtcGJlbGxAbGlubi5jby51ayIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkYW1jIiwiYW1yIjpbImV4dGVybmFsIl19.b7clXK1jtYGEJNas8Eid8TX5U6Mg7mOPHpbHR9rd5mqHXAZInM548pqQ4XKrFAU1NoODOscELnidV8zM0uQfqS9Ly_VO6ogVw9tj7mMxrPBAz1HRQrs4nT4spOEeI-LqXTRV8XlttuyKMb_rlhIfWt5qFXI57suZ22con_wmhVUTHEMo49L8lmmWZI_7qZ3jdCXf1g_tBfYcwvFG5EXqH33e5lx30miH2oBbwhWp_SKKMMq-07oLXNCV9A9qrJ4mTrGHF8NIwrkSs8LovM_gTfI1AYj4-8H4760azNVpTjKu4CNXtXp0rbKSm72tKqanlpdIYrUBsSL6JIiOWyoYJw',
                session_state: 'MiFW5igJLeOxHRWXDUfBT9abcURUIt609ONou10LMlU.ed321254d06698df826e00577b8b9cc5',
                access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MjUyNTUzMzgsImV4cCI6MTUyNTI1ODkzOCwiaXNzIjoiaHR0cHM6Ly93d3ctc3lzLmxpbm4uY28udWsvYXV0aCIsImF1ZCI6Imh0dHBzOi8vd3d3LXN5cy5saW5uLmNvLnVrL2F1dGgvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiYXBwIiwic3ViIjoiL2VtcGxveWVlcy8zMzA2NyIsImF1dGhfdGltZSI6MTUyNTI0NjcxMSwiaWRwIjoibGlubiIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImFzc29jaWF0aW9ucyJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.HHcZOsrzv3wG3kkHefSiRVHaxY1Mk9SUeIbeEsvpbUG9JW2U_oc1r2ad504vlR0of_gC9zyPnBTsX4w2ieu1OK-iLBFHdQRoaHsUXLW6eYeFj8UwXek14YAYb81wuPVAj0sFXQwEVI9IIrpYHsRTeMM5Dg8pofbAfhVnNePcS4nYgFAQFO1s5DdsPEArIwS38EFYLsbqZVvK8t_JbL5D1YDk21HR7Jgcem95wtT4KckVaM21bVELqiXpBGxQNZFUhNFbSe1hM4pbP6ppINNh8ntJeXbfIr0fhsQEjbUTeKMUkP-d32Jp7x7AHXcSAVuLfd2r2clkBkR-b1SWczHvRw',
                token_type: 'Bearer',
                scope: 'openid profile email associations',
                profile: {
                    sid: '71649d3bfc08aee6de7f423fe4e36403',
                    sub: '/employees/33067',
                    auth_time: 1525246711,
                    idp: 'linn',
                    employee: '/employees/33067',
                    family_name: 'Campbell',
                    given_name: 'Adam',
                    name: 'Adam Campbell',
                    email: 'adam.campbell@linn.co.uk',
                    preferred_username: 'adamc',
                    amr: [
                        'external'
                    ]
                },
                expires_at: 1525258938
            },
            isLoadingUser: false
        };

        const expected = 'Adam Campbell';
        expect(getEmployeeName(oidc)).toEqual(expected);
    });
});

describe('when selecting employee uri', () => {
    test('should return employee uri', () => {

        const oidc = {
            user: {
                id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MjUyNTUzMzgsImV4cCI6MTUyNTI1NTYzOCwiaXNzIjoiaHR0cHM6Ly93d3ctc3lzLmxpbm4uY28udWsvYXV0aCIsImF1ZCI6ImFwcCIsIm5vbmNlIjoiZTc0N2Y0YTExMDI5NDE0ODlhOTlmOWI5YzNjYWIxZGQiLCJpYXQiOjE1MjUyNTUzMzgsImF0X2hhc2giOiJWSi0wSGt0SW9ydTRLRWZXdXg4UlJnIiwic2lkIjoiNzE2NDlkM2JmYzA4YWVlNmRlN2Y0MjNmZTRlMzY0MDMiLCJzdWIiOiIvZW1wbG95ZWVzLzMzMDY3IiwiYXV0aF90aW1lIjoxNTI1MjQ2NzExLCJpZHAiOiJsaW5uIiwiZW1wbG95ZWUiOiIvZW1wbG95ZWVzLzMzMDY3IiwiZmFtaWx5X25hbWUiOiJDYW1wYmVsbCIsImdpdmVuX25hbWUiOiJBZGFtIiwibmFtZSI6IkFkYW0gQ2FtcGJlbGwiLCJlbWFpbCI6ImFkYW0uY2FtcGJlbGxAbGlubi5jby51ayIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkYW1jIiwiYW1yIjpbImV4dGVybmFsIl19.b7clXK1jtYGEJNas8Eid8TX5U6Mg7mOPHpbHR9rd5mqHXAZInM548pqQ4XKrFAU1NoODOscELnidV8zM0uQfqS9Ly_VO6ogVw9tj7mMxrPBAz1HRQrs4nT4spOEeI-LqXTRV8XlttuyKMb_rlhIfWt5qFXI57suZ22con_wmhVUTHEMo49L8lmmWZI_7qZ3jdCXf1g_tBfYcwvFG5EXqH33e5lx30miH2oBbwhWp_SKKMMq-07oLXNCV9A9qrJ4mTrGHF8NIwrkSs8LovM_gTfI1AYj4-8H4760azNVpTjKu4CNXtXp0rbKSm72tKqanlpdIYrUBsSL6JIiOWyoYJw',
                session_state: 'MiFW5igJLeOxHRWXDUfBT9abcURUIt609ONou10LMlU.ed321254d06698df826e00577b8b9cc5',
                access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MjUyNTUzMzgsImV4cCI6MTUyNTI1ODkzOCwiaXNzIjoiaHR0cHM6Ly93d3ctc3lzLmxpbm4uY28udWsvYXV0aCIsImF1ZCI6Imh0dHBzOi8vd3d3LXN5cy5saW5uLmNvLnVrL2F1dGgvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiYXBwIiwic3ViIjoiL2VtcGxveWVlcy8zMzA2NyIsImF1dGhfdGltZSI6MTUyNTI0NjcxMSwiaWRwIjoibGlubiIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImFzc29jaWF0aW9ucyJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.HHcZOsrzv3wG3kkHefSiRVHaxY1Mk9SUeIbeEsvpbUG9JW2U_oc1r2ad504vlR0of_gC9zyPnBTsX4w2ieu1OK-iLBFHdQRoaHsUXLW6eYeFj8UwXek14YAYb81wuPVAj0sFXQwEVI9IIrpYHsRTeMM5Dg8pofbAfhVnNePcS4nYgFAQFO1s5DdsPEArIwS38EFYLsbqZVvK8t_JbL5D1YDk21HR7Jgcem95wtT4KckVaM21bVELqiXpBGxQNZFUhNFbSe1hM4pbP6ppINNh8ntJeXbfIr0fhsQEjbUTeKMUkP-d32Jp7x7AHXcSAVuLfd2r2clkBkR-b1SWczHvRw',
                token_type: 'Bearer',
                scope: 'openid profile email associations',
                profile: {
                    sid: '71649d3bfc08aee6de7f423fe4e36403',
                    sub: '/employees/33067',
                    auth_time: 1525246711,
                    idp: 'linn',
                    employee: '/employees/33067',
                    family_name: 'Campbell',
                    given_name: 'Adam',
                    name: 'Adam Campbell',
                    email: 'adam.campbell@linn.co.uk',
                    preferred_username: 'adamc',
                    amr: [
                        'external'
                    ]
                },
                expires_at: 1525258938
            },
            isLoadingUser: false
        };

        const expected = '/employees/33067';
        expect(getEmployeeUri(oidc)).toEqual(expected);
    });
});
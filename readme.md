# Voting Application

# What ??
- A functionality where user can give vote to the given set of candidates.

-----------------------------------------------------------

# Voting app functionality
- User Sign in / Sign Up
- See the list of candidates
- Vote one of the candidate, after voting, user can't vote again.
- There is a route which shows the list of candidates and their live vote counts sorted by their vote count.
- User data must contain their one unique govt. id proof named : aadhar card number
- There should be one admin who can only maintain the table of candidates and he can't able to vote at all.
- User can change their password
- User can login with aadhar card number and password.

------------------------------------------------------------

# Routes

- User Authentication
    - /signup : POST - Create a new user account.
    - /login : POST - Login in to an existing account. [aadhar card number + password]
- Voting 
    - /candidates : GET - Get the list of candidates.
    - /vote/:candidateId : POST - Vote for a specific candidate.
- Vote Counts
    - /vote/counts : GET - Get the list of candidates sorted by their vote counts.
- User Profile
    - /profile : GET - Get the user's profile information.
    - /profile/password : PUT - Change the user's Password.
- Admin Candidate Management
    - /candidates : POST - Create a new candidate.
    - /candidates/:candidateId : PUT - Update an existing candidate.
    - /candidates/:candidateId : DELETE- Delete a candidate from the list.

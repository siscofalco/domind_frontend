## Description

This is an app that is responsible for improving the patient-psychologist digital relationship, becoming a practical way to require exercises to patients as well as to have patient information at disposal.

## User Stories

-  **404:** As an user I can see a 404 page if I try to reach a page that does not exist.
-  **Sign up:** As an psychologist I can sign up in the platform so that I can start using the app.
-  **Log in:** As a patient I can log in to the platform so that I can make my daily activities.
-  **Log out:** As a user I can logout from the platform so no one else can use it.
-  **Add Patient** As a psychologist I can add patients to my profile.
-  **Edit Patient profiles** As a psychologist I can edit my patients.
-  **Delete Patient profiles** As a psychologist I can delete my patients.
-  **Add activity** As a psychologist I can add any activity to any patient.
-  **Finish activity** As a patient I can finish my daily activity.
-  **Add session** As a psychologist I can add any session to any patient.
-  **See results** As a psychologist I can see any activity or session results from any of my patients.
-  **Search patient** As a psychologist I can search any of my patients.

<br>


# Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | WelcomePage          | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to profile after signup |
| `/login`                  | LoginPage            | patient and pshycologist `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/activity-one`           | ActivityOnePage   | patient only `<PrivateRoute>`  | Shows the daily activity.                             |
| `/activity-two`        | ActivityTwoPage   | patient only `<PrivateRoute>`  | Shows the daily activity.                                           |
| `/profile`        | ProfilePage | pshycologist only `<PrivateRoute>`  | Pshycologist profile                           |
| `/profile/:id`         | PatientProfilePage                  | pshycologist only `<PrivateRoute>`  | See the patient's profile                                   
| `/profile/add`     | AddPatientPage      | pshycologist only  `<PrivateRoute>` | Add a patient                              |
| `/profile/patients/:id` | EditPatientPage      | pshycologist only `<PrivateRoute>`  | Edit a patient                               |
| `/profile/patients/:id` | DeletePatientPage      | pshycologist only `<PrivateRoute>`  | Delete a patient                               |     
| `/profile/patients/:id` | DeletePatientPage      | pshycologist only `<PrivateRoute>`  | Delete a patient                               |       
| `/profile/activity/:id` | ActivityResultsPage      | pshycologist only `<PrivateRoute>`  | Activity results page                               |    


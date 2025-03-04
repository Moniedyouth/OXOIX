import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { testData, getFreshUserData } from "../fixtures/test-data";
import { logInfo } from "../helpers/logger";
import { RegistrationFormComponent } from "../components/registration-form.component";
import { ProfilePage } from "../page-objects/profile-page";

test.describe("RocketPlay User Registration and configure profile settings", () => {
  let homePage: HomePage;
  let userData: ReturnType<typeof getFreshUserData>;
  let loginUser;
  let registrationForm: RegistrationFormComponent;
  let profilePage: ProfilePage;

  test.beforeAll(async () => {
    logInfo("Preparing user data");
    userData = getFreshUserData();
    loginUser = testData.registration.static
    logInfo(`Test will use email for new user creation: ${userData.email}`);
  });

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationForm = new RegistrationFormComponent(page);
    profilePage = new ProfilePage(page);
  });

  test("1. User can register with valid credentials", async () => {
    await test.step("Register new user", async () => {
      await registrationForm.goToRegistrationForm();
      
      // 1.1 Fill in the required fields (Email, Password).
      await registrationForm.fillInformationForRegistrationNewUser(userData.email, userData.password);
      
      // 1.2 Check if the website correctly detected the currency and country.
      await registrationForm.verifyCanadianLocalization();
      
      // 1.3 Verify that the newsletter checkbox is disabled.
      // 1.4 Verify that the "18+" checkbox is enabled.
      await registrationForm.verifyCheckboxStates();
      
      // 1.5 Confirm the registration.
      await registrationForm.submitRegistration();

      // 1.6 Check if the registration was successful.
      // await registrationForm.verifyAccountCreated();
      logInfo("Registration completed successfully");

    });    
    await test.step('2. User can configure profile settings', async () => {
      // 2.1 Navigate to the user profile
      await homePage.loginUser(loginUser.email, loginUser.password);
      await homePage.header.isUserLoggedIn();
      await homePage.header.goToProfile();

      await profilePage.verifyProfilePageLoaded();
      
      // 2.2 Select "Ontario" state from the dropdown
      // await profilePage.selectOntarioState();
      
      // // 2.3 Set user gender
      // await profilePage.setGender();
      
      // 2.4 Fill in the birth date
      // const { day, month, year } = testData.profile.birthDate;
      // await profilePage.setBirthDate(day, month, year);
      
      // 2.5 Save entered data
      await profilePage.saveProfile();
      
      // // 2.6 Verify that the data was saved
      await profilePage.verifyProfileData('Ontario', true, '12', '12', '1995');
      
      logInfo('Profile configuration test step completed successfully');
    });
  
    await test.step('3. User can logout from profile page', async () => {
      // // 3.1 Logout from the profile page
      await profilePage.logout();
      
      // // 3.2 Verify successful logout
      await homePage.verifySuccessfulLogout();
      
      logInfo('Logout test step completed successfully');
    });
  });
});

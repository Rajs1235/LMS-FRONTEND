import { Builder, By, until } from "selenium-webdriver";

async function fullFlow() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    const BASE_URL = "http://localhost:5173";

    // ===== SIGNUP =====
    await driver.get(`${BASE_URL}/signup`);

    const email = `test${Date.now()}@gmail.com`;

    await driver.findElement(By.id("signupName")).sendKeys("Raj");
    await driver.findElement(By.id("signupEmail")).sendKeys(email);
    await driver.findElement(By.id("signupPassword")).sendKeys("123456");
    await driver.findElement(By.id("signupBtn")).click();

    console.log("✅ Signup done");

    // ===== HANDLE SIGNUP ALERT =====
    await driver.wait(until.alertIsPresent(), 5000);
    let signupAlert = await driver.switchTo().alert();
    console.log("📢 Signup Alert:", await signupAlert.getText());
    await signupAlert.accept();

    // ===== WAIT FOR LOGIN PAGE =====
    await driver.wait(until.urlContains("login"), 8000);
    await driver.wait(until.elementLocated(By.id("email")), 8000);

    // ===== LOGIN =====
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("loginBtn")).click();

    // ===== HANDLE LOGIN ALERT =====
    await driver.wait(until.alertIsPresent(), 5000);
    let loginAlert = await driver.switchTo().alert();
    console.log("📢 Login Alert:", await loginAlert.getText());
    await loginAlert.accept();

    // ===== DASHBOARD =====
    await driver.wait(until.urlContains("dashboard"), 8000);
    await driver.wait(until.elementLocated(By.id("dashboard")), 8000);
    console.log("✅ Login success");

    // ===== GO TO APPLY PAGE =====
    await driver.get(`${BASE_URL}/apply`);

    // wait for form
    await driver.wait(until.elementLocated(By.id("loanProduct")), 8000);

    // ===== FILL FORM =====
    await driver.findElement(By.id("customerName")).sendKeys("Raj");
    await driver.findElement(By.id("loanEmail")).sendKeys(email);

    // safer dropdown selection
   // wait until dropdown has options loaded
await driver.wait(async () => {
  const options = await driver.findElements(By.css("#loanProduct option"));
  return options.length > 1; // first is placeholder
}, 8000);

// select second option safely
const options = await driver.findElements(By.css("#loanProduct option"));
await options[1].click();

   await driver.findElement(By.id("units")).sendKeys("10");
await driver.findElement(By.id("nav")).sendKeys("100");

// safe value under eligibility
await driver.findElement(By.id("loanAmount")).sendKeys("400");

    await driver.findElement(By.id("applyBtn")).click();

    // ===== SUCCESS MESSAGE =====
    let msg = await driver.wait(
      until.elementLocated(By.id("successMsg")),
      8000
    );

    console.log("✅ Loan Applied:", await msg.getText());

  } catch (err) {
    console.error("❌ Test Failed:", err);
  } finally {
    await driver.quit();
  }
}

fullFlow();
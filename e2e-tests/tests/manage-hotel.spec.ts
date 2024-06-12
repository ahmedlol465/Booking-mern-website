import { test, expect } from '@playwright/test'; 
import path from "path"

const UI_URL = "http://localhost:5173/";



test.beforeEach(async ({ page }) => {

    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();
  
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  
    await page.locator("[name=email]").fill("adk@gmail.com");
    await page.locator("[name=password]").fill("123456");
  
    await page.getByRole("button", { name: "Login" }).click();
  
    await expect(page.getByText("sign in successfull")).toBeVisible();
    
})

test("should allow user to add a new hotel", async ({ page }) => {

    await page.goto(`${UI_URL}add-hotel`)

 

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="Description"]').fill("dalknskd");  // has somthing error in Des
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budgeting").click();

  await page.getByLabel("Cable TV").check();
  await page.getByLabel("Breakfast").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByText("Hotel added successfully")).toBeVisible();

})
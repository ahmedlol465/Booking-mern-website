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

    await page.goto(`${UI_URL}`)

    await page.getByPlaceholder("Where do you want to go?").fill("das")
    await page.getByRole("button", {name: "Search"}).click()

    await expect(page.getByText("Hotels Found in das")).toBeVisible()
    await expect(page.getByText("sadasd")).toBeVisible()
    
 
})



test("should show hotel details", async({ page }) => {
  await page.goto(UI_URL)

    
  await page.getByPlaceholder("Where do you want to go?").fill("das")
  await page.getByRole("button", {name: "Search"}).click()

    await page.getByText("Dublin GetWay").click();
    
  await expect(page).toHaveURL(/detail/)

    await expect(page.getByRole("button", { name: "BookNow" })).toBeVisible();
  
})


test("should book hotel", async({ page }) => {
  await page.goto(UI_URL)

    
  await page.getByPlaceholder("Where do you want to go?").fill("das")

  const date = new Date()
  date.setDate(date.getDate() + 3)
  const formateData = date.toISOString().split("T")[0]
await page.getByPlaceholder("Check-out Date").fill(formateData)


  await page.getByRole("button", {name: "Search"}).click()

    await page.getByText("Dublin GetWay").click();
    
    await page.getByRole("button", { name: "BookNow" }).click()

  await expect(page.getByText("Total Cost: $66.00")).toBeVisible()

  const stripeFrame = page.frameLocator("iframe").first()
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242 4242 4242 4242")
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04.30")

  await stripeFrame.locator('[placeholder="CVC"]').fill("242")
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225")
  
  await page.getByRole("button", { name: "Confirm Booking" }).click()

  await expect(page.getByText("Booking Saved!")).toBeVisible()


  })
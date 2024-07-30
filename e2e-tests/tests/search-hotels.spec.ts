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
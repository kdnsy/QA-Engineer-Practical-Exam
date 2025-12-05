import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  //Step 1: Navigation to Login Page
  await page.goto('https://www.saucedemo.com/');

  //Step 2.1: Logging in with a Username that does not belong in the Database
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard');
  await page.locator('form').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  //Login was unsuccessful
  await page.locator('[data-test="error"]').click();

  //Step 2.2: Logging in with a Username with incorrect cases
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('Standard_User');
  await page.locator('[data-test="login-button"]').click();
  //Login was unsuccessful
  await page.locator('[data-test="error"]').click();

  //Step 2.3: Logging in with Correct Username "standard_user" and Password 
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  //Login was successful
  await expect(page).toHaveURL(/inventory.html/);

  //Step 3: Checking of Items in the Inventory and Adding it to card
  //Item 1: Sauce Labs Backpack
  await page.locator('[data-test="item-4-img-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Sauce Labs Backpack"
    - text: /Sauce Labs Backpack carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();
  //Item 2: Sauce Labs Bike Light
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-0-img-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Sauce Labs Bike Light"
    - text: /Sauce Labs Bike Light A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();
  //Item 3: Sauce Labs Bolt T-Shirt
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-1-img-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Sauce Labs Bolt T-Shirt"
    - text: /Sauce Labs Bolt T-Shirt Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();
  //Item 4: Sauce Labs Fleece Jacket
    await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-5-img-link"]').click();
   await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Sauce Labs Fleece Jacket"
    - text: /Sauce Labs Fleece Jacket It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();
  //Item 5: Sauce Labs Onesie
    await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-2-img-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Sauce Labs Onesie"
    - text: /Sauce Labs Onesie Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();
  //Item 6: Test.allTheThings() T-Shirt (Red)
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-3-img-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - img "Test.allTheThings() T-Shirt (Red)"
    - text: /Test\\.allTheThings\\(\\) T-Shirt \\(Red\\) This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
  await page.locator('[data-test="add-to-cart"]').click();

  //Step 4: Navigating to Cart Page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="cart-list"]')).toMatchAriaSnapshot(`
    - text: QTY Description 1
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Remove"
    - text: "1"
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Remove"
    - text: "1"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Remove"
    - text: "1"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Remove"
    - text: "1"
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Remove"
    - text: "1"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Remove"
  `);
  await page.locator('[data-test="checkout"]').click();

  //Step 5: Navigating to Checkout Page
  await expect(page.locator('[data-test="checkout-info-container"]')).toMatchAriaSnapshot(`
    - textbox "First Name"
    - textbox "Last Name"
    - textbox "Zip/Postal Code"
    - button "Go back Cancel":
      - img "Go back"
      - text: ""
    - button "Continue"
  `);
  //Putting incomplete details on checkout
  await page.locator('[data-test="continue"]').click();
  await page.locator('div').filter({ hasText: 'Error: First Name is required' }).nth(5).click();

//Putting complete details on checkout
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Standard');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('1111');
  await page.locator('[data-test="continue"]').click();

//Step 6: Navigating to Checkout Overview Page and Checking out Items
  await expect(page.locator('[data-test="cart-list"]')).toMatchAriaSnapshot(`
    - text: QTY Description 1
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+ 1/
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+ 1/
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+ 1/
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+ 1/
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+ 1/
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    `);
  await page.locator('[data-test="finish"]').click();
  //Checkout Complete
  await page.locator('[data-test="back-to-products"]').click();
  
  //Step 7: Navigating to Navigation Tab to Logout user
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  //Logout Complete
});

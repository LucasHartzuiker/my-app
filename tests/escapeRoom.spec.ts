import { test, expect } from '@playwright/test';
  // Full walkthrough pass test
test('Escape Room Full Walkthrough', async ({ page }) => {
  await page.goto('http://localhost:3000/escape-room');

  // Stage 1
  await page.waitForSelector('h2:has-text("Format Code Correctly")', { timeout: 10000 });
  await page.fill('textarea', 'function test() {\n  console.log("Hello");\n}');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Stage complete!');
    await dialog.dismiss();
  });
  await page.click('button:has-text("Submit")');

  // Stage 2
  await page.waitForSelector('h2:has-text("Generate Numbers 0–100")', { timeout: 10000 });
  await page.fill('textarea', '[...Array(101).keys()]');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Stage complete!');
    await dialog.dismiss();
  });
  await page.click('button:has-text("Submit")');

  // Stage 3
  await page.waitForSelector('h2:has-text("Port CSV to JSON")', { timeout: 10000 });
  await page.click('button:has-text("Convert")');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Stage complete!');
    await dialog.dismiss();
  });
  await page.click('button:has-text("Submit")');

  // Final screen
  await page.waitForTimeout(1000);
  const finalMessage = await page.locator('h2').last().textContent();
  expect(finalMessage).toContain('You escaped');
});
  // Fail test for stage 1
test('Escape Room Stage 1 Failure', async ({ page }) => {
  await page.goto('http://localhost:3000/escape-room');

  await page.waitForSelector('h2:has-text("Format Code Correctly")', { timeout: 10000 });
  await page.fill('textarea', 'function test() { console.log("Hello"); }'); //  wrong format

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Try again!');
    await dialog.dismiss();
  });

  await page.click('button:has-text("Submit")');
});
// run.js
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        devtools: false,
        headless: false
    });


    const page = await browser.newPage();
    await page.setViewport({width: 1024, height: 1024})

    // Browser operations
    const base_url = 'https://www.weather.go.kr/weather/climate/past_cal.jsp?stn=108&obs=1&x=21&y=15&'


    for (mm = 9; mm < 10; mm++) {
        await page.goto(base_url + 'yy=2002&mm=' + mm, {waitUnitl: 'networkidle'})
        // .then(() => page.waitForNavigation())
        const base_date_selecotr = '#content_weather > table > tbody > '
        for (week = 0; week < 5; week++) {
            const date_element = 'tr:nth-child(' + (week * 2 + 1) + ') > td:nth-child(7)'
            const weather_element = 'tr:nth-child(' + ((week + 1) * 2) + ') > td:nth-child(7)'
            const date_text = await page.$eval(date_element, el => el.textContent);
            const weather_text = await page.$eval(weather_element, el => el.textContent);
            console.log(date_text)
            console.log(weather_text)

        }``
        await page.screenshot({path: 'google' + mm + '.png'})
    }


    //if we have a page instance, just using `waitFor`
    await page.waitFor(300);

    await browser.close();
})();
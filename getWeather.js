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

    for (yy = 2002; yy < 2020; yy++) {
        for (mm = 1; mm < 13; mm++) {
            // await page.waitForNavigation()
            await page.goto(base_url + 'yy=' + yy + '&mm=' + mm, {waitUnitl: 'networkidle'})
            const base_date_selecotr = '#content_weather > table > tbody > '
            for (week = 0; week < 5; week++) {
                for (dd = 1; dd < 8; dd++) {
                    try {
                        const date_element = base_date_selecotr + 'tr:nth-child(' + (week * 2 + 1) + ') > td:nth-child(' + dd + ')'
                        const weather_element = base_date_selecotr + 'tr:nth-child(' + ((week + 1) * 2) + ') > td:nth-child(' + dd + ')'
                        let date_text = await page.$eval(date_element, el => el.textContent);
                        if (date_text.trim() == '') {
                            continue
                        } else {
                            date_text = await date_text.replace('일', '')
                            date_text = (date_text[1] ? date_text : "0" + date_text[0])
                        }
                        date_text = date_text.trim()

                        let weather_text = await page.$eval(weather_element, el => el.textContent);
                        weather_text = weather_text.replace(/℃/gi, " ")
                        weather_text = weather_text.replace("일", " ")
                        weather_text = weather_text.replace(" - ", "0.0mm")
                        weather_text = weather_text.replace("mm", "")
                        weather_text = weather_text.replace("평균기온:", "")
                        weather_text = weather_text.replace("최고기온:", "")
                        weather_text = weather_text.replace("최저기온:", "")
                        weather_text = weather_text.replace("평균운량:", "")
                        weather_text = weather_text.replace("강수량:", "")
                        weather_text = weather_text.trim()


                        console.log(
                            "%d.%s.%s %s", yy, (mm.toString()[1] ? mm.toString() : "0" + mm.toString()[0]), date_text, weather_text
                        )
                        // console.log(date_text)
                        // console.log(weather_text)

                    }
                    catch (e) {
                        break
                    }
                }

            }

        }

        //2002.5.25 평균기온:19.9 최고기온:26.6 최저기온:14.0 평균운량:0.4 강수량:0.0
    }
    // await page.screenshot({path: 'google' + mm + '.png'})


    //if we have a page instance, just using `waitFor`
    await page.waitFor(300);

    await browser.close();
})();
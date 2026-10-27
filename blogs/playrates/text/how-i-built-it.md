# How I built it

PlayRates is built using React on the frontend; a Node/Express backend; with Supabase for a PostgreSQL database and authentication; and is deployed using Vercel. This stack allowed for quick and easy development, due to my comfort with JavaScript when beginning the project, and reliable software with cheap costs through the free tiers of Supabase and Vercel.

Despite this, if I had to start over again, I would confidently replace my backend choice with Go. The Go programming language is much faster, and provides many features that help a backend excel in efficiency for a web application, such as goroutines for concurrency, which will be a big help as the app and user base continues to scale. At the time of starting the project, I had no experience with the language, but having since built other backend services in Go, it would be a no-brainer for me today. I do plan to eventually migrate the backend over to Go, as I believe this will massively improve speed and reliability, therefore improving user experience when using PlayRates.

One very important thing that continues to assist me during the development process is the local environment I built. This environment boots up Supabase in a Docker container, and builds a large test database of fake users, logs, reviews, etc. This allows me to test features on realistic-looking UI, and simulate how these changes will affect the live platform.

Another way I continue to work professionally during the development of PlayRates is through a strong testing process. This involves a test suite of over 1,400 tests, enforced code coverage of 95%+, and Continuous Integration that prevents any failing pull requests from merging into main, and therefore deploying on Vercel. Whilst PlayRates started as a solo hobby project, it now has a live user base and must be reliable and secure.

## Picking it back up

As I mentioned before, I initially started this project at the end of 2024, before starting my Apprenticeship and working as a Software Developer full-time. This project was soon after I had begun learning React and Node/Express, and therefore was a big learning process for me at the time, and I implemented everything by hand.

I decided to drop this project at the time, as I didn't have the skills to implement a real database, authentication, or other important functionalities that would be important for a live application. I was actively looking for an apprenticeship at that point, and knew that with time I would gain the skills to be able to return, and publish a refined version of this passion project.

Fast-forward to now, and I have picked PlayRates back up. At this point, I have spent almost 2 years working as a full-time Software Developer, gained lots of experience maintaining large-scale web applications, and designing functionality. I believe this experience was critical in allowing me to refine the previous version of PlayRates, and build an app that was ready for real users.

This was also assisted by the development of AI-assisted programming, and my professional experience with these tools. As much as this is a big difference compared to the manually coded prototype from 2024, I am confident in my ability to use AI tools to be highly productive, whilst still ensuring a high quality application, that complies with all requirements such as security, and privacy.

## A rushed decision that led to a refactor

When first building the app, I originally used the RAWG API for pulling games and their details. Whilst it initially looked like the best choice, I quickly encountered some issues:

- The API limits were quite low, and would not support a large user base.
- The images provided, especially game covers, weren't optimal for how I wanted to use them on PlayRates.
- The game descriptions were formatted in different ways, and led to some issues with game details displaying incorrectly.

After encountering these problems, I did some more research and found out that IGDB was the most popular and effective API for pulling video game details. However, at this point I had already committed to RAWG, and built a lot around the structure and data the API provided.

When I finally decided to migrate to IGDB, this led to a refactor of the codebase. This migration was a great decision, and IGDB provides the perfect images and details for usage on PlayRates; however, this situation taught me that research in advance on technologies that are being used is crucial for choosing the right tool for the job, and preventing future refactoring and development time wasted.

# What went well

Firstly, one massive improvement within this project compared to my previous projects using a similar tech stack, was my usage of re-usable React components. I took a much more methodical approach in the components I was creating to allow for easy scalability and much cleaner and easy to read code. One example of this, was the creation of a reusable Popup component. In comparison, my previous project [PlayRates](/projects/playrates), I copy and pasted the same code each time I wanted to create a new popup, which was time consuming and very inefficient. On the other hand, this time, I was able to wrap each unique popup in my reusable Popup component, enter a few properties like title and description, and it would handle all of the logic automatically, allowing me to build at a much faster pace, and also ensuring the popup design and behaviour was uniform throughout the project.

```
<Popup title="Delete thing" description="Are you sure you want to delete this thing?">
  ... popup contents here
</Popup>
```

Another big improvement I noticed between this project and my last, is my web design skills. Although a skill that I have not consciously put research into, I believe my design skills have been improving at a linear rate throughout my time as a Web Developer, and made a big jump during the building of Clothing Shop. Whilst I'm confident a large factor in this is related to my improved usage and creation of React components and uniformity throughout the website, I also took inspiration from other clothing sites (like Hollister and Bershka) throughout planning and development and implemented them into my own, as I wanted to create a professional and realistic feeling e-commerce site.

Finally, another thing I believe went well was my use of the backend to perform all calculations and filtering, which had 2 main advantages:

1. Performing these in Go allowed for quicker execution, and provided data to the frontend at a faster rate on page load
2. In a real-world e-commerce platform, calculations during checkout would need to be completed in the backend anyway for security purposes, therefore its a good standard to implement

Whilst the dataset I used was small and did not see extremely significant differences, a real-world e-commerce website with thousands of products would see much more efficient results using this approach, especially with multiple filters needing to be applied to the data and served to the user quickly.

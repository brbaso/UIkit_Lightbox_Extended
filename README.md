# UIkit_Lightbox_Extended
##UIkit lightbox extended functionality

This project was made as a result of a work I did for one of my clients.
The task was to make a gallery, masonry style with filters and ability that related items could be shown in modal box.

Since it turned out that the task was not completely trivial I eventually decided to publish the project and make 
it available for anyone who may find it useful.

The project is entirely based and depends on the [UIkit front-end framework](http://getuikit.com/).

You can find and download it at [http://getuikit.com/docs/documentation_get-started.html](http://getuikit.com/docs/documentation_get-started.html).

Once downloded copy **lightbox-ext.js** and **lightbox-ext.min.js** files to the UIkit's **js/components/** folder so it
 can be loaded and used later in a project(of course, you can choose different folder to place these files just 
 change path in the head.php file accordingly).

##Example

The best way to see how UIkit lightbox extended component works is to browse the example folder and see it's files and structure.

Download zip file, unpack it and upload the 'example' folder to your PHP enabled server (php 5.4.x or higher). Once it
is finished point your browser to the 'example' folder, e.g. yourdomain/example, and you should see the gallery example. 
 
Please see the [live example](http://brbaso.com/uikit-lightbox-extended/)

##Example explained

Structure of the example folder:

    /example
**UIkit standard folders/files:**

        /css
            <!-- UIkit with the basic style -->
            uikit.css
            uikit.min.css
        
            <!-- UIkit with Gradient style -->
            uikit.gradient.css
            uikit.gradient.min.css 
        
            <!-- UIkit with Almost flat style -->
            uikit.almost-flat.css
            uikit.almost-flat.min.css
        
            <!-- Advanced components -->
            /components
        
        /fonts
            <!-- FontAwesome webfont -->
            fontawesome-webfont.ttf
            fontawesome-webfont.woff
            fontawesome-webfont.woff2
            FontAwesome.otf
        
        /js
            <!-- JavaScript and minified version -->
            uikit.js
            uikit.min.js
        
            <!-- Advanced components -->
            /components
                .
                .
                .
                <!-- Added files  -->
                **lightbox-ext.js**
                **lightbox-ext.min.js**
                .
                .
                .
        
            <!-- Core components -->
            /core
        
**Additional folder/files neded to make this example lives:**
        
        <!-- categorized images files for this example -->
        /images
        
        /resource
            <!-- sorce.php and data.php files - used to prepare data for rendering in the example  -->
            data.php
            sorce.php
    
    <!-- html header and main index file -->
    head.php
    index.php


Let's take a look at **head.php** file to see how does it look like:

```html

    <head>
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">        
        ...
        ...
        <!-- load uikit.min.css - Main UIkit stylesheet -->
        <link rel="stylesheet" href="css/uikit.min.css">
        
        <!-- main style sheet - custom stylesheet for additional styling -->
        <link rel="stylesheet" href="css/main.css" type="text/css" media="screen">
        
        <!-- load jquery lib - JQuery library  -->
        <script src="js/jquery.min.js"></script>
        
        <!-- load uikit.min.js - Main UIkit js file -->
        <script src="js/uikit.min.js"></script>
        
        <!-- load grid.js - UIkit Grig component-->
        <script src="js/components/grid.min.js"></script>
        
        <!-- load lightbox-ext.js, or lightbox-ext.min.js for production here -->
        <script src="js/components/lightbox-ext.js"></script>
        <!--script src="js/components/lightbox-ext.min.js"></script-->
    </head>
```
All comments are pretty much self explanatory and just to say here that this is almost standard use of UIkit 
framework -  the only difference is that we load **lightbox-ext.js**(or **lightbox-ext.min.js** for production 
environment) instead of the original UIkit **lightbox.js** file.

Also, there is the main.css file loaded and used for additional styling.


 

** more to come .... **


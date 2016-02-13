# UIkit_Lightbox_Extended
##UIkit lightbox extended functionality

This project was made as a result of a work I did for one of my clients.
The task was to make a gallery, masonry style with filters and ability that related items could be shown in modal box.

Since it turned out that the task was not completely trivial I eventually decided to publish the project and make 
it available for anyone who may find it useful.

The project is entirely based and depends on the [UIkit front-end framework](http://getuikit.com/).

You can find and download it at [http://getuikit.com/docs/documentation_get-started.html](http://getuikit.com/docs/documentation_get-started.html).

Once downloded copy **lightbox-ext.js** and **lightbox-ext.min.js** files to the UIkit **js** folder so it can be 
loaded and used later in a project.

##Example

The best way to see how UIkit extended lightbox component works is to browse the example folder and see it's files and structure.

Download zip file, unpack it and upload the 'example' folder to your PHP enabled server (php 5.4.x or higher). Once it
is finished point your browser to the 'example' folder, e.g. yourdomain/example, and you should see the gallery example. 
 
Please see the [live example](http://brbaso.com/uikit-lightbox-extended/)

##Example explained

Structure of the example folder:

    /example
<!-- **UIkit standard folders/files**  -->
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
        
<!-- **Additional folder/files neded to make this example lives**  -->


Let's take a look at **head.php** file in the example to see how it should look like:

```php
<head>
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Example of UIkit lightbox extended functionality,
    lightbox with related items grid">
    <meta name="keywords" content="uikit, gallery, grid, UIkit lightbox, masonry, lightbox extended ">
    <meta name="author" content="Slobodan Brbaklic">
    <title>Gallery - UIkit Lightbox exteneded - Modal with Related Items Grid</title>
    <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:700,400">
    
    <!-- load uikit.min.css -->
    <link rel="stylesheet" href="css/uikit.min.css">
    
    <!-- main style sheet -->
    <link rel="stylesheet" href="css/main.css" type="text/css" media="screen">
    
    <!-- load jquery lib -->
    <script src="js/jquery.min.js"></script>
    
    <!-- load uikit.min.js -->
    <script src="js/uikit.min.js"></script>
    
    <!-- load grid.js -->
    <script src="js/components/grid.min.js"></script>
    
    <!-- load lightbox-ext.js, or lightbox-ext.min.js for production here -->
    <script src="js/components/lightbox-ext.js"></script>
    <!--script src="js/components/lightbox-ext.min.js"></script-->
</head>
```
All comments are pretty much self explanatory and just to say here that this is almost standard use of UIkit framwork - 
the only difference is that we load **lightbox-ext.js**(or **lightbox-ext.min.js** for production environment) instead
of the original UIkit **lightbox.js** file.

Also, there is main.css file loaded and used for additional styling of the gallery.


 

** more to come .... **


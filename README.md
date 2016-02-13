# UIkit_Lightbox_Extended
**UIkit lightbox extended functionality**

This project was made as a result of a work I did for one of my clients.
The task was to make a gallery, masonry style with filters and ability that related items could be shown in modal box.

Since it turned out that the task was not completely trivial I eventually decided to publish the project and make 
it available for anyone who may find it useful.

The project is enirely based and depends on the [UIkit front-end framework](http://getuikit.com/).

**Example**

The best way to see how UIkit extended lightbox component works is to browse the example folder and see it's files and structure.

Download zip file, unpack it and upload the 'example' folder to your PHP enabled server (php 5.4.x or higher). Once it
is finished point your browser to the 'example' folder, e.g. yourdomain/example, 
and you should see the gallery example. 
 
Please see the [live example](http://brbaso.com/uikit-lightbox-extended/)

**How to use**

First of all download UIkit framework. You can find it at [http://getuikit.com/docs/documentation_get-started.html]
(http://getuikit.com/docs/documentation_get-started.html).

Once UIkit downloded, unpack it and copy **css** (Contains all UIkit CSS files and minified versions), 
**fonts**(Contains fonts used in UIkit) and **js**(Contains all UIkit JavaScript files and minified versions) folders
 to your new gallery project.

Next you should make sure that you load all neccessary files to the gallery page - see **head.php** file in the example:

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

** more to come .... **


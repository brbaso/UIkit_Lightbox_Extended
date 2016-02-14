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

The best way to see how UIkit lightbox extended component works is to browse the example folder and see its files and structure.

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
                ...
                
                <!-- Added files  -->
                **lightbox-ext.js**
                **lightbox-ext.min.js**
                
                ...
        
            <!-- Core components -->
            /core
        
**Additional folder/files needed to make this example lives:**
        
        <!-- categorized images files for this example -->
        /images
        
        /resource
            <!-- sorce.php and data.php files - used to prepare data for rendering in the example  -->
            data.php
            sorce.php
    
    <!-- html header and main index file -->
    head.php
    index.php

**UIkit standard folders/files** above are quite straight forward with addition of **lightbox-ext.js** and 
**lightbox-ext.min.js** files to the **js/components** folder to be aware.

The **/images** folder contains image files organized into categories folders.

The **/resource** folder contains files which are responsible for providing all data necessary for this example:
- **source.php** file is an array which defines data.
- **data.php** is a simple class which accepts array from the **source.php** and with the **galleryItems** method which 
returns array with processed data ready for usage.

It is to be said that both of previous files are here only in order to make this example works. Obviously the data 
could be prepared in other way and acquired from another source(database or other) - all depending on your needs. The
 main and only goal here is to get final array of data ready to be used.
 
- **head.php** defines all files to load into page head section:

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

- **index.php** is our main file where we assign data attributes needed for lightbox-ext functionality:

```php

    <!DOCTYPE html>
    <html class="" lang="en-gb" dir="ltr">
    <?php

    /**
     * require needed files
     */
    require_once('head.php');
    
    /**
     * raw array source data
     */
    require_once('resource/source.php');
    
    /**
     * Data class to handle sorce data and form an array ready for use
     */
    require_once('resource/data.php');
    
    /**
     * get data object and array of gallery items.
     */
    $data = new Data($source);
    $gallery_items = $data->galleryItems();
    
    /**
     * find the URL of the gallery
     */
    $url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    
    ?>
    <body class="">
    
    <div id="grid" class="grid gallery">
        <div class="uk-block uk-padding-remove content-block">
            <div class="uk-container uk-container-center">
                <div class="uk-grid uk-grid-collapse">
                    <div class="uk-width-1-1">
    
                        <!-- Gallery grid filters -->
                        <ul class="uk-subnav uk-subnav-pill slide-menus" id="filter">
    
                            <!-- First filter is All, to display all items -->
                            <li data-uk-filter="" class="uk-active category-button">
                                <a href="#">All</a>
                            </li>
    
                            <!-- loop through the gallery items array and find categories to form grid filters -->
                            <?php foreach ($gallery_items['categories'] as $cat) { ?>
    
                                <li data-uk-filter="<?php echo $cat; ?>" class="category-button">
                                    <a class="" href="#">
                                        <?php echo $cat; ?>
                                    </a>
                                </li>
    
                            <?php } ?>
                        </ul>
    
                        <!-- start of the dynamic grid -->
                        <div data-uk-grid="{gutter: 20, controls: '#filter'}"
                             class="uk-grid-width-small-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-4">
    
                            <?php
                            /**
                             * loop through the gallery items array and assign all data neccesary to get the extended
                             * lightbox functionality
                             */
                            $i = 0;
                            foreach ($gallery_items['galleryitems'] as $gi) {
                                ?>
    
                                <!-- start grid elements -->
                                <div data-uk-filter="<?php echo $gi['category_urlkey']; ?>"  id="li-<?php echo $gi['item_id']; ?>">
                                    <div class="uk-panel-box uk-padding-remove gallery-thumb-panel">
    
                                        <!-- Actual lightbox element with data assigned:
    
                                         - href:href attribute, here used as "unique" modal identifier
                                         - id: unique id attribute
                                         - class: class popups, important because we will loop through all 'popups' when
                                           category filter changed
                                         - data-category: data category , needed later when we loop through all popups
                                         - data-uk-lightbox: default lightbox group, on page load it is all - to display
                                            all items
                                         - data-lightbox-type: lightbox type - image, video, you tube or vimeo
                                         - data-date: here we can display copy,Author and date
                                         - data-lightbox-thumb: 'thumb' to display in the light box grid(related items),
                                           in this example if image we use it itself as a thumb actually+ (defined in the
                                           Data class ), and if not an image we use defined thumbs from within
                                           data source (for youtube, video, vimeo )
                                         - data-lightbox-href: This is source which will be displayed when modal is
                                            opened, defined in gallery items array
                                            in modal it shows bellow the conten(image, vide ...)
                                         - data-lightbox-header: lightbox header
                                         - data-lightbox-footer: assign data to lightbox footer  -->
                                        <a
                                            href="#modal_<?php echo $gi['item_id']; ?>"
                                            id="modal_<?php echo $i; ?>"
                                            class="popups"
                                            data-category="<?php echo $gi['category_urlkey']; ?>"
                                            data-uk-lightbox="{group:'all'}"
                                            data-lightbox-type="<?php echo $gi['type']; ?>"
                                            data-date="&copy;<?php echo $gi['author']; ?>, Posted on <?php echo $gi['date']; ?>"
                                            data-lightbox-thumb="<?php echo ($gi['type'] == 'image') ? $url . 'images/' . $gi['category_urlkey'] . '/' . $gi['thumb'] : $gi['thumb']; ?>"
                                            data-lightbox-href="<?php echo ($gi['type'] == 'image') ? $url . 'images/' . $gi['category_urlkey'] . '/' . $gi['image'] : $gi['image']; ?>"
                                            data-lightbox-header="<?php echo $gi['name']; ?>"
                                            data-lightbox-footer="<?php echo $gi['content']; ?>"
                                            >
    
                                        <!-- img src 'thumb' to display in dynamic grid ,in this example if image we use it
                                         itself as a thumb actually (defined in the Data class ),
                                        and if not an image we use defined thumbs from within
                                        data source (for youtube, video, vimeo ) -->
                                            <img src="<?php echo ($gi['type'] == 'image') ? $url . 'images/' . $gi['category_urlkey'] . '/' . $gi['thumb'] : $gi['thumb']; ?>">
                                        </a>
    
                                        <!-- define grid boxes -->
                                        <div class="uk-grid  uk-margin-remove">
    
                                            <!-- adding 'short' content to grid box  -->
                                            <div class="uk-width-1-1 gallery-content">
                                                <?php echo $gi['short_content']; ?>
                                            </div>
    
                                            <!-- adding som social buttons to grid box , not neccessary but nice  -->
                                            <div class="uk-width-1-1 gallery-social">
                                                <a class="uk-icon-button uk-icon-hover uk-icon-instagram  uk-align-right uk-margin-remove"
                                                   href="#" target="_blank"></a>
                                                <a class="uk-icon-button uk-icon-hover uk-icon-pinterest  uk-align-right uk-margin-remove"
                                                   href="#" target="_blank"></a>
                                                <a class="uk-icon-button uk-icon-hover uk-icon-twitter  uk-align-right uk-margin-remove"
                                                   href="#" target="_blank"></a>
                                                <a class="uk-icon-button uk-icon-hover uk-icon-facebook  uk-align-right uk-margin-remove"
                                                   href="#" target="_blank"></a>
                                            </div>
    
                                            <!-- adding Author, date ... to grid box   -->
                                            <div class="uk-width-1-1  gallery-date">
                                                &copy;<?php echo $gi['author']; ?>, Posted on <?php echo $gi['date']; ?>
                                            </div>
    
                                        </div>
                                    </div>
                                </div>
    
                                <?php
                                $i++;
                            } ?>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>   
        /**
         * We need this script to make sure that when a different data grid filter is changed the lightbox 'group'
         * option  is assigned to the items which by their category belong to the filter chosen.
         * On page load default filter and group option is 'all' - all gallery items are displayed .
         */
        $(document).ready(function () {
    
            /** click on the grid filter(category) button*/
            $('.category-button').on('click', function (e) {
    
                var fltr;
                e.preventDefault();
    
                /* get data filter attribute value*/
                fltr = $(this).attr('data-uk-filter');
    
                /* loop through all 'popups' - all grid items displayed */
                    $('.popups').each(function (ix) {
    
                        /* get specific category data for each grid item */
                        var cat;
                        cat = $('#modal_' + ix).attr('data-category');
    
                        /* compare actual category data of the item with the clicked filter value;
                        if data match assign its data category as a new lightbox group option - this is neccessary so
                        we make sure that only grid elements within a category display when corresponding filter clicked */
                        if (cat == fltr) {
                            $(this).attr('data-uk-lightbox', '{group:\'' + cat + '\'}');
    
                        /* if date don't match we just assign value 'all' as the lightbox group option and show all grid
                         items */
                        } else {
                            $(this).attr('data-uk-lightbox', '{group:\'all\'}');
                        }
    
                    });
    
            });
    
        });
    </script>
    
    </body>
    </html>


```
 

** more to come .... **


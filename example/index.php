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

                                        <!-- adding some social buttons to grid box , not necessary but nice  -->
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
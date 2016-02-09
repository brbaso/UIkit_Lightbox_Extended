<?php

/**
 * @author    brbaso@gmail.com
 * @copyright do whatever you want to do
 * @license   MIT
 */


/**
 * Data class - gets data from raw source array and prepares them in a convenient way for usage in this example.
 * Obviously, in your project you can retrieve and organize data either from database or some other source.
 *
 */
class Data
{

    /**
     * @var array $source
     */
    protected $source = array();

    /**
     * @param array $source
     */
    public function __construct($source)
    {
        $this->source = $source;
    }

    /**
     * data galleryitems - contains all data necessary to set the gallery in this example up
     *
     * @return array
     */

    public function galleryItems()
    {
        $galleryitems = [];
        $categories = [];
        $i = 1;

        $src = $this->getSource();

        foreach ($src as $cat => $itms) {

            $categories[] = $cat;
            $j = 1;

            foreach ($itms as $item) {

                $category_name = ucfirst($cat);

                    //find if image and get data
                if ($item['type'] == 'image' & preg_match('/\bjpg\b|\bjpeg\b|\bpng\b|\bgif\b|\bsvg\b/i', $item['name'])) {
                    $it = explode('.', $item['name']);
                    $itm_name = ucfirst($it[0]);
                    $itm_urlkey = $it[0];
                    $image = $item['name'];
                    // image thumb - we use the image itself in this example
                    $thumb = $item['name'];

                    //find if youtube and get data
                } elseif ($item['type'] == 'youtube' & preg_match('/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/i', $item['name']) || preg_match('/youtu\.be\/(.*)/i', $item['name'])) {
                    $itm_name = ucfirst($item['type'] . '-' . $j . '-' . $i);
                    $itm_urlkey = $item['type'] . '-' . $j . '-' . $i;
                    $image = $item['name'];
                    // youtube thumb
                    $thumb = $item['thumb'];

                    //find if video and get data
                } elseif ($item['type'] == 'video' & preg_match('/\bmp4\b|\bwebm\b|\bogv\b/i', $item['name'])) {
                    $itm_name = ucfirst($item['type'] . '-' . $j . '-' . $i);
                    $itm_urlkey = $item['type'] . '-' . $j . '-' . $i;
                    $image = $item['name'];
                    // video thumb
                    $thumb = $item['thumb'];

                    //find if vimeo and get data
                } elseif ($item['type'] == 'vimeo' & preg_match('/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/i', $item['name'])) {
                    $itm_name = ucfirst($item['type'] . '-' . $j . '-' . $i);
                    $itm_urlkey = $item['type'] . '-' . $j . '-' . $i;
                    $image = $item['name'];
                    // vimeo thumb
                    $thumb = $this->getVimeoThumb($item['vid']);
                }

                // make some random dates to have 'published' date of the items - not necessary but nice
                // Convert to timestamps
                $start = strtotime("2 months ago");
                $end = strtotime("yesterday");

                // Generate random number using above bounds
                $val = rand($start, $end);

                // Convert back to date format
                $date = date('M j', $val);

                // get items into array finally
                $galleryitems[] = [
                    'item_id' => $j . $i,
                    'type' => $item['type'],
                    'category' => $i,
                    'category_urlkey' => $cat,
                    'category_name' => $category_name,
                    'name' => $itm_name,
                    'urlkey' => $itm_urlkey,
                    'short_content' => 'Shortly about ' . $itm_name,
                    'content' => 'Some more information about what it is all about in the ' . $itm_name . ' or some other info',
                    'image' => $image,
                    'thumb' => $thumb,
                    'author' => $item['author'],
                    'date' => $date
                ];
                $j++;
            }
            $i++;
        }

        // pick some random galleryitems to empty short content and content, just to show how those items appear in the gallery
        $random_keys = array_rand($galleryitems, 10);
        foreach ($random_keys as $key) {
            // let's get image gallery items only, not youtube or vimeo
            if ($galleryitems[$key]['type'] == 'image') {
                $galleryitems[$key]['short_content'] = '';
                $galleryitems[$key]['content'] = '';
            }
        }

        // collect categories and galleryitems and put them into an array to return
        $items = [
            'categories' => $categories,
            'galleryitems' => $galleryitems
        ];

        return $items;

    }

    /**
     * @return mixed
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * Gets a vimeo thumbnail url - thanks to http://stackoverflow.com/users/1378646/erdal-g
     *
     * @param mixed $id A vimeo id (ie. 1185346)
     * @return thumbnail's url
     */
    public function getVimeoThumb($id)
    {
        $data = file_get_contents("http://vimeo.com/api/v2/video/$id.json");
        $data = json_decode($data);
        return $data[0]->thumbnail_large;
    }
}
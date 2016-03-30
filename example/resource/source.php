<?php
/**
 * @author    brbaso@gmail.com
 * @copyright do whatever you want to do
 * @license   MIT
 */

/**
 *
 * data source array - contains categorized images and videos to be shown in the gallery.
 * Allowed image types: jpg|jpeg|png|gif|svg.
 * In this example the jpg images have been taken from http://lorempixel.com/ .
 * All video clips have been taken from https://www.youtube.com and http://vimeo.com.
 * Allowed 'standalone'(not youtube or vimeo) video types: mp4|webm|ogv.
 * In this example the mp4 video has been taken from  http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4.
 *
 * @var array $source
 */
$source = [
    'Interesting Animals' => [

            [
                'name' => 'animals-h-c-300-640-8.jpg',
                'dir' => 'animals',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'animals-h-g-480-640-10.jpg',
                'dir' => 'animals',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'animals-q-c-640-300-1.jpg',
                'dir' => 'animals',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'animals-q-c-640-555-1.jpg',
                'dir' => 'animals',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'http://vimeo.com/1084537',
                'type' => 'vimeo',
                'vid' => '1084537',
                'author' => 'Blender Foundation',
            ],

            [
                'name' => 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg',
                'author' => 'Blender Foundation',
            ],

            [
                'name' => 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
                'type' => 'video',
                'thumb' => 'images/mp4Pplaceholder.jpg',
                'author' => 'Blender Foundation',
            ]
    ],
    'City' => [

            [
                'name' => 'city-h-c-480-640-6.jpg',
                'dir' => 'city',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'https://www.youtube.com/watch?v=6kfnAuS5Tsc',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/6kfnAuS5Tsc/maxresdefault.jpg',
                'author' => 'Stuart\'s HQ travel videos',
            ],

            [
                'name' => 'city-q-c-640-480-6.jpg',
                'dir' => 'city',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'city-q-c-640-480-9.jpg',
                'dir' => 'city',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'https://vimeo.com/151361681',
                'type' => 'vimeo',
                'vid' => '151361681',
                'author' => 'Justin Heaney',
            ],

            [
                'name' => 'city-q-c-640-640-8.jpg',
                'dir' => 'city',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'city-q-g-640-480-1.jpg',
                'dir' => 'city',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'Amazing Food' => [

            [
                'name' => 'food-h-c-300-640-3.jpg',
                'dir' => 'food',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'food-h-c-480-640-6.jpg',
                'dir' => 'food',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'food-h-g-480-640-4.jpg',
                'dir' => 'food',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'food-q-c-640-300-10.jpg',
                'dir' => 'food',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'https://vimeo.com/42571674',
                'type' => 'vimeo',
                'vid' => '42571674',
                'author' => 'Kwestia Smaku',
            ],

            [
                'name' => 'food-q-c-640-480-1.jpg',
                'dir' => 'food',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'People' => [

            [
                'name' => 'people-h-c-480-640-2.jpg',
                'dir' => 'people',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'people-h-c-480-640-7.jpg',
                'dir' => 'people',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'people-q-c-640-300-9.jpg',
                'dir' => 'people',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'people-q-c-640-480-4.jpg',
                'dir' => 'people',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'people-q-c-640-640-7.jpg',
                'dir' => 'people',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'Modern Transport' => [

            [
                'name' => 'transport-h-c-480-640-5.jpg',
                'dir' => 'transport',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'https://www.youtube.com/watch?v=cJDFpLptJyg',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/cJDFpLptJyg/maxresdefault.jpg',
                'author' => 'Just4fun290',
            ],

            [
                'name' => 'transport-h-g-480-640-4.jpg',
                'dir' => 'transport',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'transport-q-c-640-300-9.jpg',
                'dir' => 'transport',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'transport-q-c-640-480-5.jpg',
                'dir' => 'transport',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],

            [
                'name' => 'transport-q-c-640-640-6.jpg',
                'dir' => 'transport',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
];
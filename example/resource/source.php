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
 * All images are stored in /images/[image category]/ folder of this example.
 * All video clips have been taken from https://www.youtube.com and http://vimeo.com.
 * Allowed 'standalone'(not youtube or vimeo) video types: mp4|webm|ogv.
 * In this example the mp4 video has been taken from  http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4.
 *
 * @var array $source
 */
$source = [
    'animals' => [
        '0' =>
            [
                'name' => 'animals-h-c-300-640-8.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '1' =>
            [
                'name' => 'animals-h-g-480-640-10.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '2' =>
            [
                'name' => 'animals-q-c-640-300-1.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '3' =>
            [
                'name' => 'animals-q-c-640-555-1.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '4' =>
            [
                'name' => 'http://vimeo.com/1084537',
                'type' => 'vimeo',
                'vid' => '1084537',
                'author' => 'Blender Foundation',
            ],
        '5' =>
            [
                'name' => 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg',
                'author' => 'Blender Foundation',
            ],
        '6' =>
            [
                'name' => 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
                'type' => 'video',
                'thumb' => 'images/mp4Pplaceholder.jpg',
                'author' => 'Blender Foundation',
            ]
    ],
    'city' => [
        '0' =>
            [
                'name' => 'city-h-c-480-640-6.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '1' =>
            [
                'name' => 'https://www.youtube.com/watch?v=6kfnAuS5Tsc',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/6kfnAuS5Tsc/maxresdefault.jpg',
                'author' => 'Stuart\'s HQ travel videos',
            ],
        '2' =>
            [
                'name' => 'city-q-c-640-480-6.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '3' =>
            [
                'name' => 'city-q-c-640-480-9.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '4' =>
            [
                'name' => 'https://vimeo.com/151361681',
                'type' => 'vimeo',
                'vid' => '151361681',
                'author' => 'Justin Heaney',
            ],
        '5' =>
            [
                'name' => 'city-q-c-640-640-8.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '6' =>
            [
                'name' => 'city-q-g-640-480-1.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'food' => [
        '0' =>
            [
                'name' => 'food-h-c-300-640-3.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '1' =>
            [
                'name' => 'food-h-c-480-640-6.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '2' =>
            [
                'name' => 'food-h-g-480-640-4.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '3' =>
            [
                'name' => 'food-q-c-640-300-10.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '4' =>
            [
                'name' => 'https://vimeo.com/42571674',
                'type' => 'vimeo',
                'vid' => '42571674',
                'author' => 'Kwestia Smaku',
            ],
        '5' =>
            [
                'name' => 'food-q-c-640-480-1.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'people' => [
        '0' =>
            [
                'name' => 'people-h-c-480-640-2.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '1' =>
            [
                'name' => 'people-h-c-480-640-7.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '2' =>
            [
                'name' => 'people-q-c-640-300-9.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '3' =>
            [
                'name' => 'people-q-c-640-480-4.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '4' =>
            [
                'name' => 'people-q-c-640-640-7.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
    'transport' => [
        '0' =>
            [
                'name' => 'transport-h-c-480-640-5.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '1' =>
            [
                'name' => 'https://www.youtube.com/watch?v=cJDFpLptJyg',
                'type' => 'youtube',
                'thumb' => 'http://img.youtube.com/vi/cJDFpLptJyg/maxresdefault.jpg',
                'author' => 'Just4fun290',
            ],
        '2' =>
            [
                'name' => 'transport-h-g-480-640-4.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '3' =>
            [
                'name' => 'transport-q-c-640-300-9.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '4' =>
            [
                'name' => 'transport-q-c-640-480-5.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
        '5' =>
            [
                'name' => 'transport-q-c-640-640-6.jpg',
                'type' => 'image',
                'author' => 'LoremPixel.com',
            ],
    ],
];
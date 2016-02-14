/*! UIkit 2.23.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
/* Extended version, showing related items grid using UIkit Grid component */
(function (addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) { // AMD
        define("uikit-lightbox", ["uikit"], function () {
            return component || addon(UIkit);
        });
    }

})(function (UI) {

    "use strict";

    var modal, cache = {};

    UI.component('lightbox', {

        defaults: {
            "group": false,
            "duration": 400,
            "keyboard": true
        },

        index: 0,
        items: false,

        boot: function () {

            UI.$html.on('click', '[data-uk-lightbox]', function (e) {

                e.preventDefault();

                var link = UI.$(this);


                if (!link.data("lightbox")) {

                    UI.lightbox(link, UI.Utils.options(link.attr("data-uk-lightbox")));
                }

                link.data("lightbox").show(link);
            });

            // keyboard navigation
            UI.$doc.on('keyup', function (e) {

                if (modal && modal.is(':visible') && modal.lightbox.options.keyboard) {

                    e.preventDefault();

                    switch (e.keyCode) {
                        case 37:
                            modal.lightbox.previous();
                            break;
                        case 39:
                            modal.lightbox.next();
                            break;
                    }
                }
            });
        },

        init: function () {

            var siblings = [];

            this.index = 0;
            this.siblings = [];

            if (this.element && this.element.length) {

                var domSiblings = this.options.group ? UI.$([
                    '[data-uk-lightbox*="' + this.options.group + '"]',
                    "[data-uk-lightbox*='" + this.options.group + "']"
                ].join(',')) : this.element;

                domSiblings.each(function (elidx) {

                    var ele = UI.$(this);

                    siblings.push({

                        // adding here neccessary data attributes
                        'source': ele.attr('data-lightbox-href'),
                        'thumb': ele.attr('data-lightbox-thumb'),
                        'header': ele.attr('data-lightbox-header'),
                        'footer': ele.attr('data-lightbox-footer'),
                        'date': ele.attr('data-date'),
                        'type': ele.attr("data-lightbox-type") || 'auto',
                        'link': ele,
                        'sblng_index': elidx
                    });
                });

                this.index = domSiblings.index(this.element);
                this.siblings = siblings;

            } else if (this.options.group && this.options.group.length) {
                this.siblings = this.options.group;
            }


            this.trigger('lightbox-init', [this]);
        },

        show: function (index) {

            // recalculate siblings - needed because we change context depending on the filter chosen
            var g_obj = UI.Utils.options(this.element.attr("data-uk-lightbox"));

            // do this only if group(filter changed)
            if (g_obj.group != this.options.group) {

                var siblings = [];

                this.index = 0;
                this.siblings = [];
                this.options.group = g_obj.group;

                var domSiblings = this.options.group ? UI.$([
                    '[data-uk-lightbox*="' + this.options.group + '"]',
                    "[data-uk-lightbox*='" + this.options.group + "']"
                ].join(',')) : this.element;

                domSiblings.each(function (elidx) {

                    var ele = UI.$(this);

                    siblings.push({
                        'source': ele.attr('data-lightbox-href'),
                        'thumb': ele.attr('data-lightbox-thumb'),
                        'header': ele.attr('data-lightbox-header'),
                        'footer': ele.attr('data-lightbox-footer'),
                        'visitlink': ele.attr('data-lightbox-visitlink'),
                        'date': ele.attr('data-date'),
                        'type': ele.attr("data-lightbox-type") || 'auto',
                        'link': ele,
                        'sblng_index': elidx
                    });

                });

                this.index = domSiblings.index(this.element);
                this.siblings = siblings

            }
            this.modal = getModal(this);

            // stop previous animation
            this.modal.dialog.stop();
            this.modal.content.stop();

            var $this = this, promise = UI.$.Deferred(), data, item;

            index = index || 0;

            // index is a jQuery object or DOM element
            if (typeof(index) == 'object') {

                this.siblings.forEach(function (s, idx) {
                    if (index[0] === s.link[0]) {
                        index = idx;
                    }
                });
            }

            // fix index if needed
            if (index < 0) {
                index = this.siblings.length - index;
            } else if (!this.siblings[index]) {
                index = 0;
            }

            item = this.siblings[index];

            // define data object here with all neccessary additions
            data = {
                "lightbox": $this,
                "source": item.source,
                "header": item.header,
                "footer": item.footer,
                "date": item.date,
                "type": item.type,
                "index": index,
                "promise": promise,
                "item": item,
                "meta": {
                    "content": '',
                    "hdr": '',
                    "ftr": '',
                    "related": '',
                    "width": null,
                    "height": null,
                    "r_width": null,
                    "r_height": null
                }
            };

            /*
             define header and footer HTML/content
             TODO - make social icons optional, and manageable - make them as input data or lightbox options ..?
             */
            var hdr = '', ftr = '';

            if (data.header) {

                hdr = '<div class="uk-modal-head uk-margin-remove">\
								<div class="uk-modal-header uk-grid uk-margin-remove" style=""><div class="uk-width-large-7-10">' + data.header + '</div>\
								<div class="uk-width-large-3-10 uk-padding-remove" >\
								<a class="uk-icon-button uk-icon-hover uk-icon-instagram  uk-align-right uk-margin-remove" href="#" target="_blank"></a>\
								<a class="uk-icon-button uk-icon-hover uk-icon-pinterest  uk-align-right uk-margin-remove" href="#" target="_blank"></a>\
								<a class="uk-icon-button uk-icon-hover uk-icon-twitter  uk-align-right uk-margin-remove" href="#" target="_blank"></a>\
								<a class="uk-icon-button uk-icon-hover uk-icon-facebook  uk-align-right uk-margin-remove" href="#" target="_blank"></a>\
								</div>\
								</div>';
            }

            if (data.footer) {

                ftr = '<div class="uk-modal-footer">' + data.footer + '</div>';

            }

            // assign it to the data meta
            data.meta.hdr = hdr;
            data.meta.ftr = ftr;

            // add siblings to related_grid
            var related_greed_html = '<div id="related_grid" class="uk-grid-width-1-2  uk-margin-remove" data-uk-grid >';

            this.siblings.forEach(function (sblng, idex) {

                related_greed_html += '<div data-sibling-index="' + sblng.sblng_index + '" id="sblng_' + sblng.sblng_index + '" class="sibling"><img src="' + sblng.thumb + '"></div>';

            });

            related_greed_html += '</div>';

            // assign related_greed_html to the data meta
            data.meta.related = related_greed_html;

            this.index = index;

            this.modal.content.empty();

            if (!this.modal.is(':visible')) {
                this.modal.content.css({width: '', height: ''}).empty();

                // make related_greed behaves same as the content
                this.modal.related.css({r_width: '', r_height: ''}).empty();
                this.modal.modal.show();
            }

            this.modal.loader.removeClass('uk-hidden');

            promise.promise().done(function () {

                $this.data = data;
                $this.fitSize($this.data);

                // to make sure that UIKit grid component doesn't fire until all images loaded let's promise and wait a bit
                var $imgs = $this.modal.dialog.find('#related_grid img[src!=""]');

                // if there's no images, just return an already resolved promise
                if (!$imgs.length) {
                    return $.Deferred().resolve().promise();
                }

                // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
                var dfds = [];
                var im = [];

                $imgs.each(function () {

                    var dfd = $.Deferred();
                    dfds.push(dfd);
                    var img = new Image();
                    img.onload = function () {
                        dfd.resolve();
                    };
                    img.onerror = function () {
                        dfd.resolve();
                    };
                    img.src = this.src;

                });

                $.when.apply($, dfds).then(function () {

                    // images are there let's fire the UIKit grid
                    UIkit.grid(UI.$('#related_grid'), {gutter: 5});

                });

            }).fail(function () {

                data.meta.content = '<div class="uk-position-cover uk-flex uk-flex-middle uk-flex-center"><strong>Loading resource failed!</strong></div>';
                data.meta.width = 400;
                data.meta.height = 300;
                $this.data = data;
                $this.fitSize(data);

            });

            $this.trigger('showitem.uk.lightbox', [data]);

        },

        fitSize: function () {

            var $this = this,
                data = this.data,
                pad = this.modal.dialog.outerWidth() - this.modal.dialog.width(),
                dpadTop = parseInt(this.modal.dialog.css('margin-top'), 10),
                dpadBot = parseInt(this.modal.dialog.css('margin-bottom'), 10),
                dpad = dpadTop + dpadBot,
                content = data.meta.content,
                related = data.meta.related,
                duration = $this.options.duration;

            if (this.siblings.length > 1) {

                content = [
                    content,
                    '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous uk-hidden-touch" data-lightbox-previous></a>',
                    '<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next uk-hidden-touch" data-lightbox-next></a>'
                ].join('');
            }

            // calculate width, add related grid width to vars definition
            var tmp = UI.$('<div>&nbsp;</div>').css({
                'opacity': 0,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'max-width': $this.modal.dialog.css('max-width'),
                'padding': $this.modal.dialog.css('padding'),
                'margin': $this.modal.dialog.css('margin')
            }), maxwidth, maxheight, w = data.meta.width, h = data.meta.height, r_w = data.meta.r_width, r_h = data.meta.r_height;

            tmp.appendTo('body').width();

            maxwidth = tmp.width();
            maxheight = window.innerHeight - dpad;

            // define here related grid width depending on responsive break point (768 px)
            if (maxwidth <= 738) {

                data.meta.r_width = maxwidth;

            } else {

                data.meta.r_width = 240;
            }

            // related grid width
            r_w = data.meta.r_width;

            tmp.remove();

            this.modal.dialog.find('.uk-modal-caption').remove();
            this.modal.dialog.find('.uk-modal-head').remove();
            this.modal.dialog.find('.uk-modal-header').remove();
            this.modal.dialog.find('.uk-related-header').remove();
            this.modal.dialog.find('.uk-modal-footer').remove();
            this.modal.dialog.find('.td.uk-button').remove();

            if (maxwidth < data.meta.width) {

                h = Math.floor(h * (maxwidth / w));
                w = maxwidth;

            }

            if (maxheight < h) {

                h = Math.floor(maxheight);
                w = Math.ceil(data.meta.width * (maxheight / data.meta.height));

            }


            // add content
            this.modal.content.css('opacity', 0).width(w).html(content);
            this.modal.dialog.find('.uk-modal-head').css('opacity', 0);

            //  and related content
            this.modal.related.width(r_w).html(related);
            this.modal.related.prepend('<div class="uk-related-header  uk-padding-remove"> Related Images</div>');

            this.modal.closer.addClass('uk-hidden');

            if ($this.modal.data('mwidth') == w && $this.modal.data('mheight') == h) {
                duration = 0;
            }

            var dh = h + pad,
                t = Math.floor(window.innerHeight / 2 - dh / 2) - dpad;

            // recalculate here height since we could have active header, image footer and modal footer with their own heights
            // we do it only for screens wider that 768px
            if (maxwidth > 738) {

                var modal_header_height = $this.modal.dialog.find('.uk-modal-header').outerHeight(),
                    image_footer_height = $this.modal.dialog.find('.image-footer').outerHeight(),
                    modal_footer_height = $this.modal.dialog.find('.uk-modal-footer').outerHeight();

                if (maxheight < (h + modal_header_height + image_footer_height + modal_footer_height + t)) {

                    t = 10;
                    h = Math.floor(maxheight) - modal_header_height - image_footer_height - modal_footer_height - t;
                    w = Math.ceil(data.meta.width * (h / data.meta.height));
                }

                $this.modal.dialog.find('.source').height(h);

            } else {

                t = 10;

            }

            // deal with iframe types (you tube, vimeo ...)
            if (data.type == 'iframe') {

                var frame_width = this.modal.content.find('iframe:first').width();
                var frame_height = this.modal.content.find('iframe:first').height();

                // handle some big iframes, for respnsive > 768px
                if (maxwidth > 738) {

                    if (maxwidth < (frame_width + r_w + 40) || maxheight < (frame_height + modal_header_height + image_footer_height + modal_footer_height + t)) {

                        t = 10;

                        // define here maxwidth
                        w = maxwidth - r_w - 150;
                        this.modal.content.find('iframe:first').height(h).width(w);

                    }

                } else {

                    t = 10;
                    w = maxwidth;
                    this.modal.content.find('iframe:first').height(h).width(w);

                }

            }

            this.modal.dialog.animate({width: (w + r_w + 40), height: h + pad, top: t}, duration, 'swing', function () {

                $this.modal.loader.addClass('uk-hidden');

                $this.modal.content.css({width: w}).animate({'opacity': 1}, function () {

                    $this.modal.closer.removeClass('uk-hidden');

                });

                $this.modal.dialog.find('.uk-modal-head').animate({'opacity': 1}, function () {/**/
                });

                $this.modal.data({'mwidth': w, 'mheight': h});
            });

        },

        // we need this to show sibling when clicked ( within related grid )
        show_sibling: function (sidx) {

            this.show(sidx);

        },

        next: function () {

            this.show(this.siblings[(this.index + 1)] ? (this.index + 1) : 0);

        },

        previous: function () {

            this.show(this.siblings[(this.index - 1)] ? (this.index - 1) : this.siblings.length - 1);
        }

    });

    // Plugins

    UI.plugin('lightbox', 'image', {

        init: function (lightbox) {

            lightbox.on("showitem.uk.lightbox", function (e, data) {

                if (data.type == 'image' || data.source && data.source.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {

                    var resolve = function (source, related, width, height) {

                        // added all meta to data object
                        data.meta = {
                            'content': '<div data-active-sibling="' + data.index + '" class="uk-width-1-1 active_sibling">' + data.meta.hdr + '<img class="uk-padding-remove uk-align-center source " src ="' + source + '"><div data-active-sibling="' + data.index + '" class="uk-width-1-1 image-footer">' + data.date + '</div>' + data.meta.ftr + '</div>',
                            'related': '<div id="sub_grid" class="uk-width-1-1">' + related + '</div>',
                            'width': width,
                            'height': height
                        };

                        data.type = 'image';
                        data.promise.resolve();

                    };


                    if (!cache[data.source]) {

                        var img = new Image();

                        img.onerror = function () {
                            data.promise.reject('Loading image failed');
                        };

                        img.onload = function () {

                            cache[data.source] = {width: img.width, height: img.height};
                            resolve(data.source, data.meta.related, cache[data.source].width, cache[data.source].height);

                            // highlight the 'active' sibling
                            UI.$('.sibling').each(function () {

                                if ($(this).data('sibling-index') == data.index) {
                                    $(this).addClass('sibling-highlight');
                                }

                            });

                        };

                        img.src = data.source;

                    } else {

                        resolve(data.source, data.meta.related, cache[data.source].width, cache[data.source].height, data.meta.r_width, data.meta.r_height);

                        // highlight the 'active' sibling
                        UI.$('.sibling').each(function () {

                            if ($(this).data('sibling-index') == data.index) {
                                $(this).addClass('sibling-highlight');
                            }

                        });

                    }
                }
            });
        }
    });

    UI.plugin("lightbox", "youtube", {

        init: function (lightbox) {

            var youtubeRegExp = /(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/,
                youtubeRegExpShort = /youtu\.be\/(.*)/;


            lightbox.on("showitem.uk.lightbox", function (e, data) {

                var id, matches, resolve = function (id, related, width, height) {

                    // added all meta to data object
                    data.meta = {
                        'content': '<div data-active-sibling="' + data.index + '" class="uk-width-1-1 active_sibling">' + data.meta.hdr + '<iframe src="//www.youtube.com/embed/' + id + '" width="' + width + '" height="' + height + '" style="max-width:100%;"></iframe><div data-active-sibling="' + data.index + '" class="uk-width-1-1 image-footer">' + data.date + '</div>' + data.meta.ftr + '</div>',
                        'related': '<div id="sub_grid" class="uk-width-1-1">' + related + '</div>',
                        'width': width,
                        'height': height
                    };

                    data.type = 'iframe';

                    data.promise.resolve();
                };

                if (matches = data.source.match(youtubeRegExp)) {
                    id = matches[2];
                }

                if (matches = data.source.match(youtubeRegExpShort)) {
                    id = matches[1];
                }

                if (id) {

                    if (!cache[id]) {

                        var img = new Image(), lowres = false;

                        img.onerror = function () {
                            cache[id] = {width: 640, height: 320};
                            resolve(id, data.meta.related, cache[id].width, cache[id].height);
                        };

                        img.onload = function () {
                            //youtube default 404 thumb, fall back to lowres
                            if (img.width == 120 && img.height == 90) {
                                if (!lowres) {
                                    lowres = true;
                                    img.src = '//img.youtube.com/vi/' + id + '/0.jpg';
                                } else {
                                    cache[id] = {width: 640, height: 320};
                                    resolve(id, data.meta.related, cache[id].width, cache[id].height);
                                }
                            } else {
                                cache[id] = {width: img.width, height: img.height};
                                resolve(id, data.meta.related, img.width, img.height);
                            }

                            // highlight the 'active' sibling
                            UI.$('.sibling').each(function () {

                                if ($(this).data('sibling-index') == data.index) {
                                    $(this).addClass('sibling-highlight');
                                }

                            });

                        };

                        img.src = '//img.youtube.com/vi/' + id + '/maxresdefault.jpg';


                    } else {
                        resolve(id, data.meta.related, cache[id].width, cache[id].height);

                        // highlight the 'active' sibling
                        UI.$('.sibling').each(function () {

                            if ($(this).data('sibling-index') == data.index) {
                                $(this).addClass('sibling-highlight');
                            }

                        });
                    }

                    e.stopImmediatePropagation();
                }
            });
        }
    });

    UI.plugin("lightbox", "vimeo", {

        init: function (lightbox) {

            var regex = /(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/, matches;


            lightbox.on("showitem.uk.lightbox", function (e, data) {

                var id, resolve = function (id, related, width, height) {

                    // added all meta to data object
                    data.meta = {
                        'content': '<div data-active-sibling="' + data.index + '" class="uk-width-1-1 active_sibling">' + data.meta.hdr + '<iframe src="//player.vimeo.com/video/' + id + '" width="' + width + '" height="' + height + '" style="width:100%;box-sizing:border-box;"></iframe><div data-active-sibling="' + data.index + '" class="uk-width-1-1 image-footer">' + data.date + '</div>' + data.meta.ftr + '</div>',
                        'related': '<div id="sub_grid" class="uk-width-1-1">' + related + '</div>',
                        'width': width,
                        'height': height
                    };

                    data.type = 'iframe';

                    data.promise.resolve();
                };

                if (matches = data.source.match(regex)) {

                    id = matches[2];

                    if (!cache[id]) {

                        UI.$.ajax({
                            type: 'GET',
                            url: 'http://vimeo.com/api/oembed.json?url=' + encodeURI(data.source),
                            jsonp: 'callback',
                            dataType: 'jsonp',
                            success: function (vimeo_data) {
                                cache[id] = {width: vimeo_data.width, height: vimeo_data.height};
                                resolve(id, data.meta.related, cache[id].width, cache[id].height);

                                // highlight the 'active' sibling
                                UI.$('.sibling').each(function () {

                                    if ($(this).data('sibling-index') == data.index) {
                                        $(this).addClass('sibling-highlight');
                                    }

                                });

                            }
                        });


                    } else {
                        resolve(id, data.meta.related, cache[id].width, cache[id].height);

                        // highlight the 'active' sibling
                        UI.$('.sibling').each(function () {

                            if ($(this).data('sibling-index') == data.index) {
                                $(this).addClass('sibling-highlight');
                            }

                        });
                    }

                    e.stopImmediatePropagation();
                }
            });
        }
    });

    UI.plugin("lightbox", "video", {

        init: function (lightbox) {

            lightbox.on("showitem.uk.lightbox", function (e, data) {


                var resolve = function (source, related, width, height) {

                    // added all meta to data object
                    data.meta = {
                        'content': '<div data-active-sibling="' + data.index + '" class="uk-width-1-1 active_sibling">' + data.meta.hdr + '<video class="uk-responsive-width" src="' + source + '" width="' + width + '" height="' + height + '" controls></video><div data-active-sibling="' + data.index + '" class="uk-width-1-1 image-footer">' + data.date + '</div>' + data.meta.ftr + '</div>',
                        'related': '<div id="sub_grid" class="uk-width-1-1">' + related + '</div>',
                        'width': width,
                        'height': height
                    };

                    data.type = 'video';

                    data.promise.resolve();
                };

                if (data.type == 'video' || data.source.match(/\.(\bmp4\b|\bwebm\b|\bogv\b)$/i)) {

                    if (!cache[data.source]) {

                        var vid = UI.$('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr('src', data.source).appendTo('body');

                        var idle = setInterval(function () {

                            if (vid[0].videoWidth) {
                                clearInterval(idle);
                                cache[data.source] = {width: vid[0].videoWidth, height: vid[0].videoHeight};
                                resolve(data.source, data.meta.related, cache[data.source].width, cache[data.source].height);
                                vid.remove();

                                // highlight the 'active' sibling
                                UI.$('.sibling').each(function () {

                                    if ($(this).data('sibling-index') == data.index) {
                                        $(this).addClass('sibling-highlight');
                                    }

                                });
                            }

                        }, 20);


                    } else {
                        resolve(data.source, data.meta.related, cache[data.source].width, cache[data.source].height);

                        // highlight the 'active' sibling
                        UI.$('.sibling').each(function () {

                            if ($(this).data('sibling-index') == data.index) {
                                $(this).addClass('sibling-highlight');
                            }

                        });

                    }
                }
            });
        }
    });

    function getModal(lightbox) {

        if (modal) {
            modal.lightbox = lightbox;
            return modal;
        }

        // init lightbox container
        modal = UI.$([
            '<div class="uk-modal">',
            '<div class="uk-modal-dialog uk-modal-dialog-lightbox uk-slidenav-position" style="margin-left:auto;margin-right:auto;width:200px;height:200px;top:' + Math.abs(window.innerHeight / 2 - 200) + 'px;">',
            '<a href="#" class="uk-modal-close uk-close uk-close-alt"></a>',

            // add here initially uk-lightbox-content and uk-lightbox-related containers
            '<div class="uk-grid uk-margin-remove">',
            '<div class="uk-lightbox-content uk-padding-remove uk-width-6-10"></div>',
            '<div class="uk-lightbox-related uk-width-1-10 uk-margin-remove uk-padding-remove"></div>',
            '</div>',
            '<div class="uk-modal-spinner uk-hidden"></div>',
            '</div>',
            '</div>'
        ].join('')).appendTo('body');

        modal.dialog = modal.find('.uk-modal-dialog:first');
        modal.content = modal.find('.uk-lightbox-content:first');
        modal.related = modal.find('.uk-lightbox-related:first');
        modal.loader = modal.find('.uk-modal-spinner:first');
        modal.closer = modal.find('.uk-close.uk-close-alt');
        modal.modal = UI.modal(modal, {modal: false});

        // next / previous
        modal.on("swipeRight swipeLeft", function (e) {
            modal.lightbox[e.type == 'swipeLeft' ? 'next' : 'previous']();
        }).on("click", "[data-lightbox-previous], [data-lightbox-next]", function (e) {
            e.preventDefault();
            modal.lightbox[UI.$(this).is('[data-lightbox-next]') ? 'next' : 'previous']();
        });

        // on related items sibling click show it in the lightbox
        modal.on('click', '.sibling', function (ev) {
            ev.preventDefault();
            modal.lightbox['show_sibling']($(this).data('sibling-index'));
        });

        // destroy content on modal hide
        modal.on("hide.uk.modal", function (e) {
            modal.content.html('');
            modal.related.html('');
        });

        UI.$win.on('load resize orientationchange', UI.Utils.debounce(function (e) {
            if (modal.is(':visible') && !UI.Utils.isFullscreen()) modal.lightbox.fitSize();

            // need here to fire UIkit grid on related items when screen size changes
            var grid = UIkit.grid(UI.$('#related_grid'), {gutter: 5});
        }.bind(this), 100));

        modal.lightbox = lightbox;

        return modal;
    }

    UI.lightbox.create = function (items, options) {

        if (!items) return;

        var group = [], o;

        items.forEach(function (item) {

            group.push(UI.$.extend({
                'source': '',

                'type': 'auto',
                'link': false
            }, (typeof(item) == 'string' ? {'source': item} : item)));
        });

        o = UI.lightbox(UI.$.extend({}, options, {'group': group}));

        return o;
    };

    return UI.lightbox;

});
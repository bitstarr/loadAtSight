# LoadAtSight

Load AJAX content if an element is visible or becomes visible (depending on an event).

A little bit code is taken from [Ajax-include pattern](https://github.com/filamentgroup/Ajax-Include-Pattern/).

## Context
You build a responsive website and want to load secondary information (sidebars, etc.) when they are really needed.

Let's think about a mobile first responsive website:
 * There is a box that you won't show on small screens.
 * The user turns its device or uses a mid sized screen.
 * Now there is enough space for this box.
 * Because you like performance, you don't load the content of the box for every user.
 * Instead you load it when the box is (or becomes) visible.

So you initial page load is less and you don't need to load bits you won't use on small screens. Great, isn't it?

## Usage
    <div class="box">
        <div class="offers">
            <ul>
                [sweet offers]
            </ul>
        </div>
        <aside class="benefits js-loadatsight" data-append="pages/benefits.html">
        </aside>
    </div>

    .offers { width: 100%; }
    .benefits { display: none; width: 30%; }
    @media only screen and (min-width: 50em) {
        .offers,
        .benefits { display: table-cell; }
        .offers { width: 70%; }
    }

    $('.js-loadatsight').loadAtSight();

## Bower Installation
    bower install load-at-sight

## Options
### windowEvents
On which events of the `window` object should we react.

default: `load`

### loadingClass
The element will get a CSS class to while the AJAX request runs.

default: `is-loading`

## On reszing
As you might know could it be a performance issue to use the plain resize event. I prefer a custom event which delays a certain time so there will be no fireworks.

For example a technique as Matt Perry mentions [in a comment at CSS-Tricks](http://css-tricks.com/snippets/jquery/done-resizing-event/#comment-1585739).

    $('.js-loadatsight').loadAtSight({
        windowEvents: 'load calmresize'
    });

## Licence
MIT

## Thoughts

You could also use [Ajax-include pattern](https://github.com/filamentgroup/Ajax-Include-Pattern/) in combination with [bindWithDelay](https://github.com/bgrins/bindWithDelay/) but i preferred to use less code for this particular job.

This plugin is no a jack of all trades. Its usage ist bound to a well definded case - to load two or three boxes on demand. Feel free to spin this idea forward and fork the project.

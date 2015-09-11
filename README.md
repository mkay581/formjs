[![Build Status](https://travis-ci.org/mkay581/form-js.svg?branch=master)](https://travis-ci.org/mkay581/form-js)

# FormJS

This library provides a simple API to manipulate a form or its related elements with JavaScript.
Supports IE10+, all modern browsers, and mobile.

It also provides some very useful things to make forms a lot easier for developers, including the following.

* Detect change events and new values
* Set and get values
* Hard-to-style native form elements get a "UI version" that allows for easy CSS styling
* Easily map form elements by attributes (like "name" and "type")
* Uses live HTMLCollections, making everything stateless to account for on-the-fly DOM updates
* Even handles submit buttons
* Works on mobile devices too

It supports:

 * Checkboxes
 * Radio Buttons
 * Input Fields
 * Dropdowns
 * Entire forms

## Usage

### Styling form elements

Let's say you wanted to style a dropdown menu with the following html:

```html
<select>
    <option value="MD">Maryland</option>
    <option value="VA" selected>Virginia</option>
    <option value="DC">Washington, DC</option>
</select>
```

With this library, you can do this:

```javascript
var dropdown = new Dropdown({
    el: document.getElementsByTagName('select')[0]
});
```

Which will change your HTML into this:

```html
<div class="dropdown-wrapper">
    <div class="dropdown-container">
        <div class="dropdown-value-container">Virginia</div>
        <div class="dropdown-option-container">
            <div class="dropdown-option" data-value="MD">Maryland</div>
            <div class="dropdown-option dropdown-option-selected" data-value="VA">Virginia</div>
            <div class="dropdown-option" data-value="DC">Washington, DC</div>
        </div>
    </div>
    <select>
        <option value="MD">Maryland</option>
        <option value="VA" selected>Virginia</option>
        <option value="DC">Washington, DC</option>
    </select>
</div>
```

Then you can style the dropdown using CSS (and just hide the `<select>` element).


### Programmatically change the element's value

Each class comes with a set of utility methods so you can change the elements via JS. Using the example above, you
could do the following:

```javascript
// set the selected value programmatically
dropdown.setValue('DC');

// get the new data value
dropdown.getValue(); // => "DC"

// get the display value
dropdown.getDisplayValue(); // => "Washington, DC"
```

### Listening to change events

You can also listen to events on form elements. Given the following input element...


```html
<input type="text" value="" placeholder="Enter text here" />
```

You can do the following:

```javascript
var inputField = new InputField({
    el: document.getElementsByTagName('input')[0],
    onChange: function (el) {
        // user has finished typing into the field!
    },
    onKeyDownChange: function (el) {
        // the user has typed a key into the field!
    }
});
// set the value
inputField.setValue('My text'); // set new value
// get the new value
inputField.getValue(); // => "My text"
```

## Examples
 
Examples can be found in the [examples](https://github.com/mkay581/formjs/blob/master/examples) page.

## Release History

 * 2015-03-26   v1.0.0  Official release.

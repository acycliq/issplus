// Some user-defined leaflet controls for the dapi chart

// Toggle button to turn layers on and off
var customControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('input');
        container.type = "button";
        container.title = "Toggle genes on/off";
        container.value = "Hide genes";

        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "80px 30px";
        container.style.width = '80px';
        container.style.height = '30px';


        function toggle(button) {
            if (button.value == "Hide genes") {
                button.value = "Show genes"
                button.innerHTML = "Show genes"
                removeLayers();
            } else if (button.value == "Show genes") {
                button.value = "Hide genes"
                button.innerHTML = "Hide genes"
                addLayers();
            }
        }

        container.onmouseover = function () {
            container.style.backgroundColor = 'pink';
        }
        container.onmouseout = function () {
            container.style.backgroundColor = 'white';
        }

        container.onclick = function () {
            toggle(this);
            console.log('buttonClicked');
        }


        return container;
    }
});
//map.addControl(new customControl());


// toggle button (again)
// Toggle button to turn layers on and off
// you may also want to try this one: http://www.bootstraptoggle.com/
var switchControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.setAttribute('rel', 'tooltip');
        container.setAttribute('data-placement', 'bottom');
        container.title = "Show genes?";
        //container.style = "width: 100px";

        // Use a child input.
        var input = L.DomUtil.create('input');
        input.type = "checkbox";
        input.title = "Some title";
        input.value = "On";
        // Insert the input as child of container.
        container.appendChild(input);


        function toggle(event) {
            if (event.target.checked === false) {
//                    button.value="Show genes"
//                    button.innerHTML="Show genes"
                removeLayers();
            } else if (event.target.checked === true) {
//                    button.value="Hide genes"
//                    button.innerHTML="Hide genes"
                addLayers();
            }
        }

        jQuery(input).bootstrapSwitch({
            size: 'mini',
            state: true,
            onText: 'Yes',
            offText: 'No',
            // http://bootstrapswitch.site/options.html
            onSwitchChange: function (event) {
                console.log('buttonClicked', event.target.checked);
                toggle(event);
            }
        });

        return container;
    }
});
// map.addControl(new switchControl());


// make placeholder for the spinner gif
function addControlPlaceholders(map) {
    var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;
        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
    createCorner('verticalcenter', 'horizontalcenter');

}

// addControlPlaceholders(map);


// Do the spinner control
var spinnerControl = L.Control.extend({
    options: {position: 'verticalcenterhorizontalcenter'},

    onAdd: function (map) {

        var container = L.DomUtil.create('div');
        container.id = "pleasewait";
        container.style = "display: none";

        var img = L.DomUtil.create('img');
        img.src = "./dashboard/data/img/spinner.gif";

        container.appendChild(img);

        return container;
    }
});
// map.addControl(new spinnerControl());

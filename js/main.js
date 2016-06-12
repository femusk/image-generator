// За доработка:
// - изборник на фонтови од Google Fonts

$(document).ready(function () {

  var femusk_photo = $('#femusk_photo');
  var femusk_text = $('.femusk-text');
  var femusk_id = $('#femusk_id');
  var femusk_input_id = $('#femusk_input_id');
  var femusk_time = $('#femusk_time');
  var femusk_input_time = $('#femusk_input_time');
  var femusk_date = $('#femusk_date');
  var femusk_input_date = $('#femusk_input_date');
  var femusk_btn_save = $('#femusk_btn_save');
  var femusk_btn_randomize = $('#femusk_btn_randomize');
  var femusk_input_color_bg = $('#femusk_input_color_bg');

  // Draw the initial canvas
  femusk_update_all_colors();

  femusk_btn_randomize.on('click', femusk_update_all_colors);

  femusk_input_id.on('change keyup', femusk_update_id);
  femusk_input_id.on('change keyup', femusk_draw_canvas);

  femusk_input_date.on('change keyup', femusk_update_date);
  femusk_input_date.on('change keyup', femusk_draw_canvas);

  femusk_input_time.on('change keyup', femusk_update_time);
  femusk_input_time.on('change keyup', femusk_draw_canvas);

  femusk_input_color_bg.on('change', femusk_update_color_bg);
  femusk_input_color_bg.on('change', femusk_draw_canvas);

  function femusk_update_all_colors() {
    femusk_photo.css('background-color', femusk_get_random_hex_color);
    femusk_text.css('color', invertColor(getHexColor(femusk_photo.css('background-color'))));
    femusk_input_id.val(femusk_id.text());
    femusk_input_date.val(femusk_date.text());
    femusk_input_time.val(femusk_time.text());
    femusk_input_color_bg.val(getHexColor(femusk_photo.css('background-color')));
    femusk_draw_canvas();
  }

  function femusk_update_id() {
    femusk_id.text(femusk_input_id.val());
  }

  function femusk_update_date() {
    femusk_date.text(femusk_input_date.val());
  }

  function femusk_update_time() {
    femusk_time.text(femusk_input_time.val());
  }

  function femusk_draw_canvas() {
    html2canvas(femusk_photo, {
      onrendered: function (canvas) {
        //document.body.appendChild(canvas);
        femusk_btn_save.attr('href', canvas.toDataURL());
        femusk_btn_save.attr('download', 'femusk-#' + femusk_input_id.val() + '.png');
      }
    });
  }

  function femusk_update_color_bg() {
    femusk_photo.css('background-color', getHexColor(femusk_input_color_bg.val()));
  }

  function femusk_get_random_hex_color() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  // http://stackoverflow.com/a/30381663/3190066
  function getHexColor(color) {
    //if color is already in hex, just return it...
    if (color.indexOf('#') !== -1)
      return color;

    //leave only "R,G,B" :
    color = color
            .replace("rgba", "") //must go BEFORE rgb replace
            .replace("rgb", "")
            .replace("(", "")
            .replace(")", "");
    color = color.split(","); // get Array["R","G","B"]

    // 0) add leading #
    // 1) add leading zero, so we get 0XY or 0X
    // 2) append leading zero with parsed out int value of R/G/B
    //    converted to HEX string representation
    // 3) slice out 2 last chars (get last 2 chars) => 
    //    => we get XY from 0XY and 0X stays the same
    return  "#"
            + ('0' + parseInt(color[0], 10).toString(16)).slice(-2)
            + ('0' + parseInt(color[1], 10).toString(16)).slice(-2)
            + ('0' + parseInt(color[2], 10).toString(16)).slice(-2);
  }

  // https://jsfiddle.net/salman/f9Re3/
  function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
  }

  function complementHex(hexValue) {
    var reqHex = "";
    for (var i = 0; i < 6; i++) {
      reqHex = reqHex + (15 - parseInt(hexValue[i], 16)).toString(16);
    }
    return reqHex;
  }

});


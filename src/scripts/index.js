// import 'es6-promise/auto'
import 'flot/jquery.flot'

$(function() {
  $('#liseen').text('wo cao ,zenme fuck')
  $.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });

})
function Sudoku(options) {
    if (!options.$container) return;
    
    var grid = [], $contents = options.$container.append($('<table class="board" cellspacing="0" cellpadding="0"><tbody id="container"></tbody></table><input type="button" class="btn-submit" value="CHECK SOLUTION!"><input type="button" class="btn-clear margin-left10" value="CLEAR">')), 
            $container = $contents.find('#container');
    $contents.find('.btn-submit').on('click', function(e) {
        if (isWinner()) {
            var answer = confirm("Congratulations! You Won!");
            if (answer)
                clearBoard();
        }
        else {
            var answer = confirm("It did not work out!");
        }
    });
    $contents.find('.board').on('focusout', function(e) {
         var $target = $(e.target), val = parseInt($(e.target).val()),
         tcol = parseInt($target.data('tc')), trow = parseInt($target.data('tr'));
         if (isNaN(val) || val < 1 || val > 9) {
             $target.val('');
             grid[tcol][trow] = '';
         }
         else {
             grid[tcol][trow] = val;
         }
     });
     $('.btn-clear').on('click', function(e) {
         clearBoard();
     })
     function clearBoard() {
         for (var i = 0; i < 9;i++) {
             for (var j = 0; j < 9;j++) {
                 grid[i][j] = '';
             }
             var cells = $('.cell-input')
             for (var i = 0; i < cells.length; i++) {
                 $(cells[i]).val('');
             }
         }
     }
     function checkVert() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var currVal = grid[i][j];
                for (var k = j + 1; k < 9; k++) {
                    if (grid[i][k] == currVal || currVal == 'undefined') {
                        return false;
                    }
                }
            }
        }
        return true;
     }
    function checkHoriz() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var currVal = grid[j][i];
                for (var k = j + 1; k < 9; k++) {
                    if (grid[k][i] == currVal || currVal == 'underfined') {
                        return false;
                    } 
                }
            }
        }
        return true;
    }
    function initGrid() {
        for (var l = 0; l < 9; l++) {
            grid[l] = [];
        }
    } 
    function checkSquares() {
        for (var y = 0; y < 9; y+=3) {
            for (var x = 0; x < 9; x+=3) {
                var k = checkSquare(x,y)
                if (!k)
                    return false;
            }
        }
        return true;
    }
    function checkSquare(startCol, startRow) {
        var hash = {}, val;
        for (var i = startCol; i < startCol + 3; i++) {
            for (var j = startRow; j < startRow + 3; j++) {
                val = grid[i][j];
                if (!val || val == 'undefined' || hash[val])
                    return false;
                else
                    hash[val] = true;
            }
        }
        return true;
    }
    function isWinner() {
        return checkVert() && checkHoriz() && checkSquares();
    }
    function buildTable () {   
        initGrid();
        for (var j = 0; j < 9; j++) {
            var $row = $("<tr></tr>");
            var tclass = '';
            if (j === 3 || j === 6) {
                tclass = 'b1';
            }
            for (var i = 0; i < 9; i++) {
                var bclass = tclass;
                if ( i === 3 || i === 6 ) {
                    bclass += ' b0';
                }
                $row.append('<td class="cell ' + bclass + '"><input class="cell-input" data-tc=' + i + ' data-tr=' + j + ' size=1 autocomplete="off" maxlength=1></td>');
            }
            $container.append($row)
        }
    }
    buildTable();
}

$(document).ready(function(){
    console.log('UNO');

    let users = {
        count: 0,
    };

    let round = 0;

    $('[js-new-player]').submit(function(event) {
        event.preventDefault();
        let $this = $(this);

        let $name = $this.find('input');
        let name = $name.val().trim();

        if(name.length == 0)
            return;

        users.count++;
        users[users.count] = 0;

        let $item = `<div class="table-item">${name}</div>`;
        $('.table-header').find('.table-line').append($item);

        $item = `<div class="table-item" name="${users.count}">0</div>`;
        $('.table-total').find('.table-line').append($item);

        $item = `<div class="table-item"><input name="${users.count}" type="number" placeholder="Score"/></div>`;
        $('.table-footer').find('[js-submit]').before($item);

        $name.val('');
    });

    $('[js-score-add]').submit(function(event) {
        event.preventDefault();
        let $this = $(this);
        let $inputs = $this.find('input');

        let $total = $('.table-total');

        let $line = $('<div class="table-line"></div>');
        $('.table-body').append($line);

        round++;

        let $item = `<div class="table-item">Round ${round}</div>`;
        $line.append($item);


        $inputs.each(function(index, $input) {
            $input = $($input);

            let name = $input.attr("name");
            let value = $input.val().trim();
            if(value.length == 0 || value.length == '-')
                value = 0;
            else
                value = parseInt(value);

            let $item = $(`<div class="table-item">${value}</div>`);
            $line.append($item);

            if(value < 0)
                $item.addClass('green');
            else
                $item.addClass('red');
            
            users[name] += value;

            if(users[name] == 500)
                users[name] = 0;

            $total.find('[name=' + name + ']').html(users[name]);

            $input.val('0');
        });
    });
});
// $(document).ready(async function () {
//     const todos = await $.getJSON('/todos');
//     // console.log(todos);
//     showTodos(todos);

//     $('#inputField').focus();

//     $('#inputForm').on('submit', function () {
//         let data = $('#inputField').val();
//         $.ajax({
//             type: "POST",
//             url: "/todos",
//             data: { text: data },
//             success: function (data) {

//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     })

//     $('#todo-list').on('click', '.text', function () {
//         console.log($(this));
//         updateTodo($(this))
//     })

//     $('#todo-list').on('click', '.delete', function () {
//         let id = $(this).data('id');
//         alert(id);
//         $.ajax({
//             type: "DELETE",
//             url: "/todos/:id",
//             data: id,
//             success: function (data) {

//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })
//     })
// })


// function showTodos(todos) {
//     for (let item of todos) {
//         showTodo(item)
//     }
// }

// function showTodo(todo) {
//     let elem = $(`<li><span class="text ${todo.isCompleted ? 'completed' : ''}">${todo.text}</span> <span data-id="${todo.id}" class="delete">X</span></li>`)
//     $('#todo-list').prepend(elem)
//     elem.data('id', todo.id)
//     elem.data('isCompleted', todo.isCompleted)
// }

// function updateTodo(elem) {
//     $.ajax({
//         type: 'PUT',
//         url: `/todos/${elem.parent().data('id')}`,
//         data: { isCompleted: !elem.parent().data('isCompleted') }
//     })
//     elem.toggleClass('completed')
// }

// function removeTodo(id) {
//     console.log(id)
//     $.ajax({
//         type: 'POST',
//         url: `/todos/delete`,
//         data: {
//             id: id
//         },
//         success: function (data) {
//             alert(data);
//         }
//     })
//     // elem.remove();

// }

// function createTodo() {
//     const userInput = $('#inputField').val();
//     $.ajax({
//         type: 'POST',
//         url: '/todos',
//         data: userInput,
//         success: function (data) {
//             alert(data);
//         }
//     })
//     $('#inputField').val('');
//     $('#inputField').focus();
//     showTodo(createTodo);
// }

$.get('/todos', function (data) {
    console.log(data);
});

$('#addTodoButton').click(function (e) {
    // e.preventDefaut();
    // const formData = $(this).serialize();
    // $.post('/todos', formData, function (data) {
    //     console.log(data);
    // });

    let text = $('#newTodoText').val();
    // console.log("Pre Ajax : ", text);
    // let storeData = {
    //     text: text
    // }
    $.ajax({
        type: "POST",
        url: "/todos",
        data: { text },
        success: function (data) {
            location.reload();
        },
        error: function (error) {
            console.log(err);
        }
    })
});

// $('#todo-list').on('submit', '.delete-item-form', function (e) {
//     e.preventDefault();
//     var actionUrl = $(this).attr('action');
//     $itemToDelete = $(this).closest('.list-group-item')
//     debugger
// })

$('#todo-list').on('click', '.edit-button', function () {
    $(this).parent().siblings('.edit-item-form').toggle();
})
// $('#todo-list').on('submit', '.edit-item-form', function (e) {
//     e.preventDefault();
//     var text = $('#update-text').val();
//     console.log("AJAX: ", text);
//     var id = $('#update-text-id').val();
//     console.log('AJAX: ', id);
//     $originalItem = $(this).parent('.list-group-item');
//     $.ajax({
//         url: `/todos/${id}`,
//         data: { text },
//         type: 'PUT',
//         originalItem: $originalItem,
//         success: function (data) {
//             // this.originalItem.html(
//             //     `<form class="edit-item-form">
//             //     <input type="hidden" id="hidden_todo_id" name="todo_id" value=<%=todo.id%>>
//             //     <div class="form-group">
//             //         <label>Item Text</label>
//             //         <input type="text" id="update-text" value="<%= todo.text %>" name="todo[text]"
//             //             class="form-control">
//             //     </div>
//             //     <button class="btn btn-primary">Update Item</button>
//             // </form>
//             // <span class="lead">
//             //     <%= todo.text %>
//             //         <%= todo.id %>
//             // </span>
//             // <div class="pull-right">
//             //     <button class="btn btn-sm btn-warning edit-button">Edit</button>
//             //     <form style="display: inline" method="POST" action="/todos/<%=todo._id%>?_method=DELETE">
//             //         <button type="submit" class="btn btn-sm btn-danger">Delete</button>
//             //     </form>
//             // </div>
//             // <div class="clearfix"></div>`
//             // )
//         }
//     })
// })

$('#todo-list').on('submit', '.edit-item-form', function (e) {
    e.preventDefault();
    var toDoItem = $(this).serialize();
    console.log(toDoItem);
    var actionUrl = $(this).attr('action');
    console.log(actionUrl);
    $originalItem = $(this).parent('.list-group-item');
    $.ajax({
        url: actionUrl,
        data: toDoItem,
        type: 'PUT',
        originalItem: $originalItem,
        success: function (data) {
            this.originalItem.html(
                `<form action="/todos/${data.id}" method="POST" class="edit-item-form">
                <div class="form-group">
                    <label>Item Text</label>
                    <h1>
                        ${data.id}
                    </h1>
                    <input type="text" value="${data.text}" name="text" class="form-control">
                </div>
                <button class="btn btn-primary">Update Item</button>
            </form>
            <span class="lead">
                ${data.text}
                    ${data.id}
            </span>
            <div class="pull-right">
                <!-- <button class="btn btn-sm btn-warning edit-button">Edit</button> -->
                <button class="btn btn-warning edit-button"></button>
                <form style="display: inline" method="POST" action="/todos/<%=todo._id%>?_method=DELETE">
                    <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                </form>
            </div>
            <div class="clearfix"></div>`
            );
            location.reload() //Reloading the page after form submission automatically
        }
    })
})


// Delete TODO
// $('form').submit(function(e){
//     e.preventDefault();
//     var formAction = $(this).attr('action');
//     $.ajax({
//         url: formAction,
//         type: 'DELETE',
//         success: function(data){
//             debugger
//         }
//     })
// })

$('#todo-list').on('submit', '.delete-item-form', function(e){
    e.preventDefault();
    var confirmResponse = confirm('ARE YOU SURE?');
    if(confirmResponse){
        var actionUrl = $(this).attr('action');
        $itemToDelete = $(this).closest('.list-group-item');
        $.ajax({
            url: actionUrl,
            type: 'DELETE',
            itemToDelete: $itemToDelete,
            success: function(data){
                this.itemToDelete.remove();
            }
        })
    }
    else{
        $(this).find('button').blur();
    }
})
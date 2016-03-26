/**
 * Simple demo
 */
$(function() {
    $("button.alert, button.closable").on("click", function() {
        semanticModal.alert({
            title: "Alert - Modal Title",
            message: "This is a simple modal alert",
            allowMultiple: false
        });
    });

    $("button.confirm").on("click", function() {
        semanticModal.confirm({
            title: "Prompt - Modal Title",
            message: "Do you want to confirm?",
            allowMultiple: false,
            callback: function(value) {
                console.log(value);
            }
        });
    });

    $("button.prompt").on("click", function() {
        semanticModal.prompt({
            title: "Prompt - Modal Title",
            message: "Could you enter a value?",
            allowMultiple: false,
            callback: function(value) {
                console.log(value);
            }
        });
    });

    $("button.dialog").on("click", function() {
        semanticModal.dialog({
            title: "Custom Dialog - Modal Title",
            message: function() {
                return "Message passed by a function"
            },
            buttons: {
                "Nice": {
                    "class": "red", "action": function($modal) {
                        alert("You clicked at button from custom modal");
                        $modal.modal('hide');
                    }
                },
                "Cancel": {
                    "action": function($modal) {
                        alert("Do nothing");
                        $modal.modal('hide');
                    }
                }
            }
        });
    });

    $("button.not-closable").on("click", function() {
        semanticModal.alert({
            title: "Modal title",
            message: "A modal not closable",
            closable: false
        });
    });

    $("button.modal-type").on("click", function() {
        semanticModal.alert({
            title: "Modal title",
            message: "A modal not closable",
            type: $(this).data("type")
        });
    });
});
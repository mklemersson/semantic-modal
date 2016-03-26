/**
    @license MIT license
    @author Michael michaelklemersson10@gmail.com
    @version: 1.0.0
**/
;(function($) {
    if(typeof $ !== "undefined") {
        if(typeof $.fn.modal !== "undefined") {
            var _makeModal = function(settings) {
                if(typeof settings === "undefined" ||
                          settings == {} ||
                          settings === "")
                    throw "Undefined options to modal";

                settings = $.extend({
                    title: "Modal Title",
                    size: "normal",
                    closable: true,
                    allowMultiple: true,
                    callback: function(result) {},
                    buttons: {
                        "Ok": { "class": "ui primary button", "action": function($modal) {
                            $modal.modal('hide');
                        } }
                    }
                }, (typeof settings === "object" ? settings : { message: settings }));

                var _instance = $("<div/>", {
                    "id": "semantic-modal-instance-" + $(".ui.modal.semantic-modal").length+1,
                    "class": "ui modal semantic-modal"
                });

                // Modal size
                if(typeof settings.size !== "undefined" && $.inArray(settings.size, ["small", "normal", "large"]) > -1) {
                    _instance.addClass(settings.size);
                }

                // Close button
                if(typeof settings.closable === true) {
                    _instance.append($("<i/>", { "class": "icon close" }));
                }

                // Modal header
                var _modalType = (typeof settings.type !== "undefined" ? settings.type : "default"),
                    _backGroundColorModalHeader = "#ffffff";

                switch (_modalType) {
                    case "info":
                        _backGroundColorModalHeader = "#2185d0";
                        break;
                    case "primary":
                        _backGroundColorModalHeader = "#1678c2";
                        break;
                    case "success":
                        _backGroundColorModalHeader = "#21ba45";
                        break;
                    case "warning":
                        _backGroundColorModalHeader = "#fbbd08";
                        break;
                    case "danger":
                        _backGroundColorModalHeader = "#d01919";
                        break;
                }

                _instance.append(
                    $("<div/>", {
                        "class": "header",
                        "text": (typeof settings.title === "string" ? settings.title : "Modal title")
                    }).css("background-color", _backGroundColorModalHeader)
                        .css("color", (_backGroundColorModalHeader != "#ffffff" ? "white" : "black"))
                );

                // Modal content
                var _contentModal = "";
                if(typeof settings.message === "string") {
                    _contentModal = settings.message;
                }
                else if(typeof settings.message === "function") {
                    _contentModal = settings.message.call();
                }

                _instance.append($("<div/>", {
                    "class": "content" ,
                    "html": _contentModal
                }));

                _instance.settings = settings;

                // Modal buttons
                if(typeof settings.buttons === "object") {
                    //console.log(settings.buttons);
                    var _modalFooter = $("<div/>", { "class": "actions" });
                    $.each(settings.buttons, function(indexLabel) {
                        var _button = $("<button/>", {
                            "class": "ui button " + (typeof this.className !== "undefined" ? this.className : ""),
                            "text": indexLabel
                        });

                        if(typeof this.icon !== "undefined" && typeof this.icon === "string" && $.trim(this.icon) !== "") {
                            _button.append($("<i/>", { "class": this.icon }));
                        }

                        //console.log(this);
                        if(typeof this.action === "function") {
                            _button.on("click", function() {
                                settings.buttons[indexLabel].action(_instance);
                            });
                        }
                        _modalFooter.append(_button);
                    });
                    _instance.append(_modalFooter);
                }

                return _instance;
            };

            window.semanticModal = {
                _modal: null,

                alert: function(message) {
                    this._modal = _makeModal(message);
                    this._modal
                        .modal('setting', 'closable', this._modal.settings.closable)
                        .modal('show');
                    return this;
                },

                confirm: function(settings) {
                    this._modal = _makeModal({
                        message: (typeof settings === "string" ? message : settings.message),
                        callback: (typeof settings === "object" ? settings.callback : function(value) {}),
                        title: (typeof settings === "object" ? settings.title : "Modal Title"),
                        buttons: {
                            "Ok": { "className": "primary", "action": function($dialog) {
                                $dialog.settings.callback(true);
                                $dialog.modal('hide');
                            } },
                            "Cancel": { "className": "red", "action": function($dialog) {
                                $dialog.settings.callback(false);
                                $dialog.modal('hide');
                            } }
                        }
                    });
                    this._modal
                        .modal('setting', 'closable', this._modal.settings.closable)
                        .modal('show');
                    return this;
                },

                prompt: function(settings) {
                    this._modal = _makeModal({
                        callback: (typeof settings === "object" ? settings.callback : function(value) {}),
                        title: (typeof settings === "object" ? settings.title : "Modal Title"),
                        message: function() {
                            return $("<div/>", {
                                "class": "ui one column grid container"
                            }).append(
                                $("<p/>", { "text": (typeof settings === "string" ? settings : "Enter a value"), "class": "column", "style": "margin-bottom: 0;" })
                            ).append(
                                $("<div/>", { "class": "column" }).append(
                                    $("<div/>", { "class": "ui fluid input" }).append(
                                        $("<input/>", { "class": "prompt-input", "autofocus": true, "placeholder": "Enter a value" })
                                    )
                                )
                            );
                        },
                        buttons: {
                            "Ok": { "className": "primary", "action": function($dialog) {
                                $dialog.settings.callback($dialog.find("input.prompt-input").val());
                                $dialog.modal('hide');
                            } },
                            "Cancel": { "className": "red", "action": function($dialog) {
                                $dialog.settings.callback("");
                                $dialog.modal('hide');
                            } }
                        }
                    });
                    this._modal
                        .modal('setting', 'closable', this._modal.settings.closable)
                        .modal('show');
                    return this;
                },

                dialog: function(settings) {
                    this._modal = _makeModal(settings);
                    this._modal
                        .modal('setting', 'closable', this._modal.settings.closable)
                        .modal('show');
                    return this;
                }
            };
        }
        else {
            throw "Semantic Modal component is not defined";
        }
    }
    else {
        throw "jQuery is not defined";
    }
})(jQuery);

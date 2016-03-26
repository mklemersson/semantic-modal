/**
    @author Michael michaelklemersson10@gmail.com
    @version: 1.0.0
**/
;(function($) {
    if(typeof $ !== "undefined") {
        if(typeof $.fn.modal !== "undefined") {
            var _makeModal = function(settings) {
                var _instance = $("<div/>", {
                    "id": "semantic-modal-instance-" + $(".ui.modal.semantic-modal").length+1,
                    "class": "ui modal semantic-modal"
                });

                // Modal size
                if(typeof settings.size !== "undefined" && $.inArray(settings.size, ["small", "normal", "large"]) > -1) {

                }

                // Close button
                if(settings.closable) {
                    _instance.append($("<i/>", { "class": "close" }));
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
                );

                // Modal content
                var _contentModal = "";
                if(typeof settings.message === "string") {
                    _contentModal = settings.message;
                }
                else if(typeof settings.message === "function") {
                    _contentModal = settings.message.call();
                }
                else
                    _contentModal = "";
                _instance.append($("<div/>", {
                    "class": "content" ,
                    "html": _contentModal
                }));

                // Modal buttons
                if(typeof settings.buttons !== "undefined" && settings.buttons.length) {
                    var _modalFooter = $("<div/>", { "class": "actions" });
                    $.each(settings.buttons, function(indexLabel) {
                        var _button = $("<button/>", {
                            "class": "ui button " + (typeof this.className !== "undefined" ? this.className : ""),
                            "text": indexLabel
                        });

                        if(typeof this.icon !== "undefined" && typeof this.icon === "string" && $.trim(this.icon) !== "") {
                            _button.append($("<i/>", { "class": this.icon }));
                        }

                        if(typeof this.action === "function") {
                            _button.on("click", function() {
                                this.action(_instance);
                            });
                        }
                        _modalFooter.append(_button);
                    });
                    _instance.append(_modalFooter);
                }

                return _instance;
            };

            return window.semanticModal = {
                _modal: null,

                alert: function(message) {
                    this._modal = _makeModal({
                        title: "Alert",
                        message: message,
                        buttons: {
                            "Ok": { "class": "primary", "action": function($dialog) { $dialog.modal('hide'); } }
                        }
                    });
                    this._modal.modal('show');
                    return this;
                },

                confirm: function(message) {
                    this._modal = _makeModal({
                        title: "Confirm",
                        message: message,
                        callback: function(result) {},
                        buttons: {
                            "Ok": { "class": "primary", "action": function($dialog) {
                                this.callback(true);
                                $dialog.modal('hide');
                            } },
                            "Cancel": { "class": "red", "action": function($dialog) {
                                this.callback(false);
                                $dialog.modal('hide');
                            } }
                        }
                    });
                    this._modal.modal('show');
                    return this;
                },

                prompt: function(message) {
                    this._modal = _makeModal({
                        title: "Prompt",
                        message: function() {
                            return $("<div/>", {
                                "class": "ui one column grid container"
                            }).append(
                                $("<p/>", { "text": "Enter a value", "class": "column" })
                            ).append(
                                $("<input/>", { "class": "prompt-input", "autofocus": true, "placeholder": "Enter a value" })
                            );
                        },
                        callback: function(result) {},
                        buttons: {
                            "Ok": { "class": "primary", "action": function($dialog) {
                                this.callback($dialog.find("input.prompt-input").val());
                                $dialog.modal('hide');
                            } },
                            "Cancel": { "class": "red", "action": function($dialog) {
                                this.callback("");
                                $dialog.modal('hide');
                            } }
                        }
                    });
                    this._modal.modal('show');
                    return this;
                },

                dialog: function(settings) {
                    this._modal = _makeModal(settings);
                    this._modal.modal('show');
                    return this;
                }
            };

            // window.semanticModal = function(modalType, options) {
            //     var _DEFAULT_OPTIONS = {
            //         allowMultiple: true,
            //         autofocus: false,
            //         closable: true,
            //         duration: 200,
            //         blurring: true,
            //         header: "Modal Title",
            //         buttons: {
            //             "Ok": {
            //                 icon: false,
            //                 className: "primary",
            //                 action: function($modal) {
            //                     console.log("primary click");
            //                     $modal.modal('hide');
            //                 }
            //             },
            //
            //             "Cancel": {
            //                 icon: false,
            //                 className: "red",
            //                 action: function($modal) {
            //                     console.log("cancel click");
            //                     $modal.modal('hide');
            //                 }
            //             }
            //         }
            //     },
            //
            //     _SETTINGS = $.extend(_DEFAULT_OPTIONS, options),
            //
            //     _MODAL_TYPES = ["alert", "dialog", "confirm", "prompt"];
            //
            //
            //
            //     if(_MODAL_TYPES[modalType] != "undefined") {
            //         if(modalType == "alert" ||
            //             modalType == "prompt" ||
            //             modalType == "confirm") {
            //                 if(typeof options !== "string" || $.trim(options) == "") {
            //                     throw "Undefined or invalid message for dialog";
            //                 }
            //             }
            //
            //         var _instance = null;
            //         switch (modalType) {
            //             case "confirm":
            //                 _instance = _makeModal({
            //                     message: function() {
            //                         return $("<div/>", {
            //                             "class": "ui one column grid container"
            //                         }).append(
            //                             $("<p/>", { "text": "Enter a value", "class": "column" })
            //                         );
            //                     },
            //                     buttons: {
            //                         "Ok": {
            //                             action: function($modal) {
            //                                 $modal.hide();
            //                                 return true;
            //                             }
            //                         },
            //                         "Cancel": {
            //                             action: function($modal) {
            //                                 $modal.hide();
            //                                 return false;
            //                             }
            //                         }
            //                     }
            //                 });
            //                 break;
            //
            //             case "prompt":
            //                 _instance = _makeModal({
            //                     message: function() {
                                    // return $("<div/>", {
                                    //     "class": "ui one column grid container"
                                    // }).append(
                                    //     $("<p/>", { "text": "Enter a value", "class": "column" })
                                    // ).append(
                                    //     $("<input/>", { "class": "prompt-input", "autofocus": true, "placeholder": "Enter a value" })
                                    // );
            //                     },
            //                     buttons: {
            //                         "Ok": {
            //                             action: function($modal) {
            //                                 $modal.hide();
            //                                 return $modal.find("input.prompt-input").val();
            //                             }
            //                         },
            //                         "Cancel": _SETTINGS.buttons["Cancel"],
            //                     }
            //                 });
            //                 break;
            //
            //             case "dialog":
            //                 _instance = _makeModal(_SETTINGS);
            //                 break;
            //
            //             default:
            //                 _instance = _makeModal({
            //                     message: function() {
            //                         return $("<div/>", {
            //                             "class": "ui one column grid container"
            //                         }).append(
            //                             $("<p/>", { "text": "Enter a value", "class": "column" })
            //                         );
            //                     },
            //                     buttons: {
            //                         "Ok": _SETTINGS.buttons["Ok"]
            //                     }
            //                 });
            //                 break;
            //         }
            //
            //         $("body").append(_instance);
            //
            //         return {
            //             show: function() {
            //                 _instance.modal('show');
            //             },
            //
            //             hide: function() {
            //                 _instance.modal('hide');
            //             },
            //
            //             alert: function(options) {
            //                 return _makeModal();
            //             }
            //         };
            //     }
            //     else {
            //         throw "Invalid dialog type, dialogs types: " + _MODAL_TYPES;
            //     }
            // };
        }
        else {
            throw "Semantic Modal component is not defined";
        }
    }
    else {
        throw "jQuery is not defined";
    }
})(jQuery);

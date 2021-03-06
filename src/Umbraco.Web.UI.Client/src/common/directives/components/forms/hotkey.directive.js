/**
 * @ngdoc directive
 * @name umbraco.directives.directive:headline
 **/
angular.module("umbraco.directives")
    .directive('hotkey', function($window, keyboardService, $log) {

        return function(scope, el, attrs) {

            var options = {};
            var keyCombo = attrs.hotkey;

            if (!keyCombo) {
                //support data binding
                keyCombo = scope.$eval(attrs["hotkey"]);
            }

            // disable shortcuts in input fields if keycombo is 1 character
            if (keyCombo) {

                if (keyCombo.length === 1) {
                    options = {
                        inputDisabled: true
                    };
                }

                keyboardService.bind(keyCombo, function() {

                    var element = $(el);
                    var activeElementType = document.activeElement.tagName;
                    var clickableElements = ["A", "BUTTON"];

                    if (element.is("a,div,button,input[type='button'],input[type='submit'],input[type='checkbox']") && !element.is(':disabled')) {

                        if (element.is(':visible') || attrs.hotkeyWhenHidden) {

                            // when keycombo is enter and a link or button has focus - click the link or button instead of using the hotkey
                            if (keyCombo === "enter" && clickableElements.indexOf(activeElementType) === 0) {
                                document.activeElement.click();
                            } else {
                                element.click();
                            }

                        }

                    } else {
                        element.focus();
                    }

                }, options);

                el.on('$destroy', function() {
                    keyboardService.unbind(keyCombo);
                });

            }

        };
    });

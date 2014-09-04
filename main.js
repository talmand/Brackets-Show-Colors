/*
* Copyright (c) 2014 Travis Almand. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    
    'use strict';
    
    var AppInit         = brackets.getModule('utils/AppInit'),
        EditorManager   = brackets.getModule('editor/EditorManager'),
        DocumentManager = brackets.getModule('document/DocumentManager'),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils");
    
    var editor, cm, document;
    var hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;
    
    function hexColor($this) {
        
        var string = $this.text();
        var css = {
            'border-left-color': string
        };
        
        $this.css(css).attr('data-color', 'hex');
        
    }
    
    function rgbColor($this) {
        
        var $numbers = $this.nextAll('.cm-number').slice(0, 3);
        
        var css = {
            'border-left-color': 'rgb(' + $numbers.eq(0).text() + ',' + $numbers.eq(1).text() + ',' + $numbers.eq(2).text() + ')'
        };
        
        $this.css(css).attr('data-color', 'hex');
        
    }
    
    function rgbaColor($this) {
        
        var $numbers = $this.nextAll('.cm-number').slice(0, 4);
        
        var css = {
            'border-left-color': 'rgb(' + $numbers.eq(0).text() + ',' + $numbers.eq(1).text() + ',' + $numbers.eq(2).text() + $numbers.eq(3).text() + ')'
        };
        
        $this.css(css).attr('data-color', 'hex');
        
    }
    
    function showColors() {
        if (editor._codeMirror.doc.mode.name === 'css') {
            $('.CodeMirror-lines').find('.cm-atom').each(function () {
                var $this = $(this);
                if ($this.text().match(hexRegex)) {
                    hexColor($this);
                } else if ($this.text() === 'rgb') {
                    rgbColor($this);
                } else if ($this.text() === 'rgba') {
                    rgbaColor($this);
                } else {
                    $this.css('border-left-style', 'none');
                }
            });
        }
    }
    
    function update() {
        
        editor = EditorManager.getCurrentFullEditor();
        
        ExtensionUtils.loadStyleSheet(module, "main.css")
            .done(function () {
                editor._codeMirror.refresh();
            });
        
        var delay = setTimeout(showColors, 100);
        
        $(editor).on('update', showColors);
        
    }
    
    AppInit.appReady(update);
    $(DocumentManager).on('currentDocumentChange', update);
    
});
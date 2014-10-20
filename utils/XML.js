var _log = require("./Logger.js"),
    _libxmljs,
    _fs,
    _path,
    _jsutilsModuleXML = function () {

        var _vars = {},
            _me,
            _Base = function(config) {

                function _readfile (file, type) {
                    var content;
                    if (type && (type in file) && file[type]) {
                        try {
                            content = _fs.readFileSync(file[type] , {encoding: "utf8"});
                        } catch (e) {
                            _log.warn("[js.utils] Cannot read the specified path ", e);
                        }
                    }
                    return content;
                }

                var xml, xsd,
                    file, content;

                if (config) {

                    // try getting libxmljs
                    try {
                        _libxmljs = (_libxmljs || require('libxmljs'));
                        _fs = (_fs || require("fs"));
                        _path = (_path || require("path"));

                    } catch (e) {
                        // do nothing libxmljs probably not installed...
                        _log.warn("[js.utils] Probably libxmljs module is missing, make sure you have installed it properly 'npm install libxmljs'")
                    }

                    file = ("file" in config ? config.file : undefined);
                    content = ("content" in config ? config.content : undefined);

                    if (file) {
                        xsd = _readfile(file, "xsd");
                        xml = _readfile(file, "xml");
                    }

                    if (content) {
                        xsd = ("xsd" in content ? content.xsd : undefined);
                        xml = ("xml" in content ? content.xml : undefined);
                    }
                }

                return {xml: xml, xsd:xsd};
            };

        _me = {

            internal: function (refs) {
                _vars = refs;

            },

            /**
             *  Validate an XML file against an XSD (Supported as Node Module only)
             *  The passed argument can be a file or string content.
             *
             *  Note: content arguments override the file read.
             *
             * @param config {Object} The configuration for validating the XML content
             *      file {String} The path to the xsd file
             *          - xml The xml content path
             *          - xsd The xsd content path
             *      content {String} The content to be parsed
             *          - xml The xml string content
             *          - xsd The xsd string content
             *
             * @return {Boolean} true in case valid or else false
             */
            validate: function (config) {

                var base = new _Base(config),
                    warningmsg = "[js.utils XML] failed to get the xml or xsd content ",
                    xsd = base.xsd,
                    xml = base.xml;

                if (!xsd || !xml) {
                    _log.warn(warningmsg);
                    return false;
                }
                var xsddoc,
                    xmldoc,
                    docs,
                    bool = false;

                docs = _me.getDocument({content: {xml: xml, xsd:xsd}});
                if (docs) {
                    xsddoc = docs.xsd;
                    xmldoc = docs.xml;

                    if (xmldoc && xmldoc) {
                        bool = xmldoc.validate(xsddoc);

                    } else {
                        _log.warn(warningmsg);
                    }
                }

                return bool;
            },

            /**
             *  Validate an XML file against an XSD (Supported as Node Module only)
             *  The passed argument can be a file or string content.
             *
             *  Note: content arguments override the file read.
             *
             * @param config {Object} The configuration for validating the XML content
             *      file {String} The path to the xsd file
             *          - xml The xml content path
             *          - xsd The xsd content path
             *      content {String} The content to be parsed
             *          - xml The xml string content
             *          - xsd The xsd string content
             * @return {Object} {xsd, xml}
             */
            getDocument: function(config) {

                function _error(type, result) {

                    if (type && result && result[type]) {
                        _log.error("[js.utils XML] ", type, ": ", result[type].errors );
                    }
                }

                var base = new _Base(config),
                    xsd = base.xsd,
                    xml = base.xml,
                    result = {};

                    try {
                        if (xsd) {
                            result.xsd = _libxmljs.parseXmlString(xsd);
                        }
                        if (xml) {
                            result.xml = _libxmljs.parseXmlString(xml);
                        }

                    } catch (e) {

                        _log.error("[js.utils XML] Reporter.validate error: ", e);
                        _error("xml", result);
                        _error("xsd", result);
                    }

                return result;
            }


        };

        return _me;
    }();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {

        // nodejs support
        _jsutilsModuleXML.internal({
            _: require("underscore"),
            arrayutils: require("./Array.js")
        });
        module.exports = _jsutilsModuleXML;

    }
} else {
    define(["underscore", "jsutilsArrayModule"], function (underscoreref, arrayref) {

        _jsutilsModuleXML.internal({_: _, arrayutils: arrayref});

        delete _jsutilsModuleXML.validate;
        return _jsutilsModuleXML;
    });
}


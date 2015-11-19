'use strict';

var _ = require('underscore');
var util = require('util');

var CreateURI = function (config) {
    config = config || {};
    config.hosts = config.hosts || [];
    config.options = config.options || {};

    var hosts = config.hosts;
    var hostsArray = [];
    var options = config.options;
    var optionsArray = [];

    var authInfo = '';
    if (config.user && config.password) {
        authInfo = config.user + ':' + config.password + '@';
    }

    function buildOptions(obj) {
        for (var key in obj) {
            if (obj[key].constructor === {}.constructor) {
                buildOptions(obj[key]);
            } else {
                optionsArray.push(key + '=' + obj[key]);
            }
        }
    }

    buildOptions(options);

    if (config.hosts.length) {
        _.each(hosts, function (host) {
            hostsArray.push(host.server + ':' + host.port);
        });
        var connectionOptions = '';
        if (optionsArray.length) {
            connectionOptions += '?' + optionsArray.join('&');
        }
        return util.format('mongodb://%s%s/%s%s', authInfo, hostsArray.join(','), config.database, connectionOptions);
    } else {
        throw new Error('hosts cannot be empty');
    }
};

module.exports = {
    createURI: CreateURI
};

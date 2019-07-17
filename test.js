require([
    './chart'
], function(chartUtilFactory) {
    'use strict';

    var chartUtil = {
        centerBuildState: chartUtilFactory("centerBuildState"),
        centerPersonNum: chartUtilFactory("centerPersonNum"),
        centerAlarm: chartUtilFactory("centerAlarm"),
        propertyBuildState: chartUtilFactory("propertyBuildState"),
        propertyWarehouse: chartUtilFactory("propertyWarehouse"),
        manageBuildState: chartUtilFactory("manageBuildState"),
        manageArchives: chartUtilFactory("manageArchives")
    }

    setTimeout(function () {
        chartUtil.centerBuildState.test();
        chartUtil.centerPersonNum.test();
        chartUtil.centerAlarm.test();
        chartUtil.propertyBuildState.test();
        chartUtil.propertyWarehouse.test();
        chartUtil.manageBuildState.test();
        chartUtil.manageArchives.test();
    }, 1000);
});
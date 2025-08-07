sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'listreportpage/test/integration/FirstJourney',
		'listreportpage/test/integration/pages/PROJECTList',
		'listreportpage/test/integration/pages/PROJECTObjectPage'
    ],
    function(JourneyRunner, opaJourney, PROJECTList, PROJECTObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('listreportpage') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePROJECTList: PROJECTList,
					onThePROJECTObjectPage: PROJECTObjectPage
                }
            },
            opaJourney.run
        );
    }
);
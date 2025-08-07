sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'custompage/test/integration/FirstJourney',
		'custompage/test/integration/pages/PROJECTMain'
    ],
    function(JourneyRunner, opaJourney, PROJECTMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('custompage') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePROJECTMain: PROJECTMain
                }
            },
            opaJourney.run
        );
    }
);
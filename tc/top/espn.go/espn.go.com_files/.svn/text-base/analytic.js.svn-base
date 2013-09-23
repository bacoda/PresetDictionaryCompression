/* Page Tracking Java Script*/
/* v11Jun08.0 */
function anClearVars() {
	var i;
	for (i=0; i<=50; i++) {
		s_omni["prop"+i] = '';
		s_omni["eVar"+i] = '';
	}
	for (i=0; i<=5; i++) {
		s_omni["hier"+i] = '';
	}
	s_omni.events = '';
	s_omni.products = '';
}
function anSetDefaultProps(anSiteSection,anContentSection,anContentSubSection,anContentSubSubSection,anLeafPageName,anStoryId) {
	anSiteSectionL2 =anSiteSection;
	anPageNameL4 = anContentSection;
	anHier1 = anContentSection;
	if(anContentSubSection){
		anSiteSectionL2 =anSiteSectionL2 + ":" + anContentSubSection;
		anPageNameL4 = anPageNameL4 + ":" + anContentSubSection;
		anHier1 = anHier1 + ":" + anContentSubSection;
	}
	if (anContentSubSubSection){
		anSiteSectionL2 = anSiteSectionL2 + ":" + anContentSubSubSection
		anPageNameL4 = anPageNameL4 + ":" + anContentSubSubSection
		anHier1 = anHier1 + ":" + anContentSubSubSection
	}
	if (anLeafPageName) {
		anPageNameL4 = anPageNameL4 + ":" + anLeafPageName
		if (anStoryId) {
			anPageNameL4 = anPageNameL4 + ":" + anStoryId
			anHier1 = anHier1 + ":" + anLeafPageName
		}
	}
}

function anTrackPageView(anExec,anSiteSection,anContentSection,anContentSubSection,anContentSubSubSection,anContentType,anLeafPageName,anStoryId) {
	if(anExec==0)s_omni.exec=anExec;
	anSetDefaultProps(anSiteSection,anContentSection,anContentSubSection,anContentSubSubSection,anLeafPageName,anStoryId);
	s_omni.pageName = anPageNameL4;
	s_omni.server = window.location.host;
	s_omni.channel = anContentSection;
	s_omni.prop1 = anSiteSection;
	s_omni.prop4 = anContentType;
	s_omni.prop5 = anSiteSectionL2;
	if(typeof(omniRegStatus) != "undefined" && omniRegStatus != "") s_omni.prop29=omniRegStatus;
	s_omni.hier1 = anHier1;
	s_omni.eVar13 = s_omni.pageName;
	var s_code=s_omni.t();if(s_code)document.write(s_code)
}
function anTrackLink(anLinkURL,anSiteSection,anLinkPos,anLinkId) {
	anClearVars();
	s_omni.linkTrackVars='prop1,prop9';
	s_omni.linkTrackEvents='None';
	s_omni.prop1 = anSiteSection;
	s_omni.prop9 = anLinkPos+"+"+anLinkId;
	s_omni.tl(anLinkURL,"o",anLinkPos+"+"+anLinkId)
}
function anTrackEvent(anLinkURL,anLinkPos,anLinkId) {
	anClearVars();
	s_omni.linkTrackVars='prop1,prop9';
	if(anLinkPos.toLowerCase().indexOf("customize")!=-1){
		s_omni.linkTrackVars = s_omni.linkTrackVars + ',eVar6,events';
		s_omni.linkTrackEvents = 'event5';
		s_omni.eVar6 = anLinkPos+"+"+anLinkId;
		s_omni.events = 'event5';
	} else if((anLinkPos.toLowerCase().indexOf("join")!=-1)
	||(anLinkPos.toLowerCase().indexOf("draft")!=-1)
	||(anLinkPos.toLowerCase().indexOf("reactivate")!=-1)){
		s_omni.linkTrackVars = s_omni.linkTrackVars + ',eVar8,events';
		s_omni.linkTrackEvents = 'event6';
		s_omni.eVar8 = anLinkPos+"+"+anLinkId;
		s_omni.events = 'event6';
	} else if(anLinkPos.toLowerCase().indexOf("register")!=-1){
		s_omni.linkTrackVars = s_omni.linkTrackVars + ',purchaseId,transactionId,eVar23,events';
		s_omni.linkTrackEvents = 'event4';
		s_omni.purchaseId = anLinkId;
		s_omni.transactionId = anLinkId;
		s_omni.eVar23 = anLinkPos;
		s_omni.events = 'event4';
	}
	s_omni.prop9 = anLinkPos+"+"+anLinkId;
	s_omni.tl(anLinkURL,"o",anLinkPos+"+"+anLinkId);
}

function anSetLang(anLang) {
	s_omni.prop17 = anLang;
	s_omni.eVar9 = anLang;
}


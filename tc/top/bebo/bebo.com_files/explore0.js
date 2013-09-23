YAHOO.namespace("BEBO");
YAHOO.BEBO.ExploreTab = (function() {
$D = YAHOO.util.Dom;
    return {
        init: function() {
            var isOpen = false;

            var oMenu = new YAHOO.widget.Menu("dorky", {
               context: ["dropdown-context", "tl", "bl"],
               monitorresize:false,
               zIndex:10000,
               submenuhidedelay: 250,
               //position:"dynamic",
               autosubmenudisplay: true
            });
          
            var toggleIt = function() {
               if (!isOpen) {
                  arrowOn();
                  oMenu.show();
                  isOpen = true;
               } else {
                  arrowOff();
                  oMenu.hide();
                  isOpen = false;
               }
            };

            var onBeforeHide = function() {
               setTimeout(hideIt, 100);
            };

            var hideIt = function() {
               isOpen = false;
               arrowOff();
            }

            var arrowOn = function() {
               var arrow_off = new $D.get('explore_arrow_off')
               var arrow_on = new $D.get('explore_arrow_on')
               arrow_off.style.display = 'none';
               arrow_on.style.display = 'inline';
            };

            var arrowOff = function() {
               if (!isOpen) {
                  var arrow_off = new $D.get('explore_arrow_off')
                  var arrow_on = new $D.get('explore_arrow_on')
                  arrow_off.style.display = 'inline';
                  arrow_on.style.display = 'none';
               }
            };

            oMenu.addItems([

            {
                text: "VIDEO",
                url: "/Video.jsp"
            },
            {
                text: "MUSIC",
                url: "/Bands.jsp"
            },
            {
                text: "APPS",
                url: "/c/apps/browse_apps"
            },
            {
                text: "SKINS",
                url: "/SkinCharts.jsp"
            },
            {
                text: "AUTHORS",
                url: "/Books.jsp"
            },
            {
                text: "GROUPS",
                url: "/ProfileSurf.jsp?Type=GR"
            },
            {
                text: "BEBO NATION",
                url: "BeboNation.jsp"
            }
            ]);


            oMenu.render(document.body);
            oMenu.subscribe("beforeHide", onBeforeHide);
            //oMenu.show();
            //oMenu.subscribe("show", oMenu.focus);
            //YAHOO.util.Event.addListener("explore-dropdown", "mouseover", YAHOO.BEBO.ExploreTab.mouseOver, null, this);
            YAHOO.util.Event.addListener("explore-dropdown", "click", toggleIt, null, oMenu);
            YAHOO.util.Event.addListener("explore-dropdown", "mouseover", arrowOn, null, oMenu);
            YAHOO.util.Event.addListener("explore-dropdown", "mouseout", arrowOff, null, oMenu);
            //YAHOO.util.Event.addListener("explore-dropdown", "mouseout", hideIt, null, oMenu);
        }
    }
})();

YAHOO.util.Event.onContentReady("explore-dropdown", YAHOO.BEBO.ExploreTab.init);

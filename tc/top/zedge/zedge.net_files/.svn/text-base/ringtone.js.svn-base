var rtp_playing="none";

function rtpMakeCall(str)
{
	if ($(rtp_playing))
    	$(rtp_playing).rtpAsFunction('stopplay');
}

function rtpJsFunction(aString)
{
	if((rtp_playing!="none")&&(rtp_playing!=aString))
	{
		rtpMakeCall(rtp_playing);
	}
    rtp_playing=aString;
}

function rtpRefresh(rt_player)
{
	rt_player.rtpAsRefresh('over');
}
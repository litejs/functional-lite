
!function(S){

	//** String.utf8
	S.utf8_encode = function() {
		return unescape( encodeURIComponent( this ) )
	}

	S.utf8_decode = function() {
		return decodeURIComponent( escape( this ) )
	}
	//*/



}(String.prototype)

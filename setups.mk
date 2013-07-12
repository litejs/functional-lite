


setups = sha1 sha1-hmac sha1-hmac-pbkdf2 sha256 sha256-hmac sha256-hmac-pbkdf2

flags-sha1               = sha256|HMAC|PBKDF2
flags-sha1-hmac          = sha256|PBKDF2
flags-sha1-hmac-pbkdf2   = sha256

flags-sha256             = sha1|HMAC|PBKDF2
flags-sha256-hmac        = sha1|PBKDF2
flags-sha256-hmac-pbkdf2 = sha1


compile-all: $(setups)

$(setups):
	$(call TOGGLE,$(flags-$@),$@.js)
	$(call COMPILE,$@.js,$@.min.js)
	@rm $@.js

